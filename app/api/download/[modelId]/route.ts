import { NextRequest, NextResponse } from 'next/server'
import { getModelById } from '@/app/_lib/models'
import { verifyDownloadToken, isTokenExpired } from '@/app/_lib/jwt'
import { readFile } from 'fs/promises'
import { join } from 'path'

// T059: Download endpoint with JWT verification
export async function GET(
  request: NextRequest,
  { params }: { params: { modelId: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Download token is required' },
        { status: 401 }
      )
    }

    // Verify JWT token
    let payload
    try {
      payload = verifyDownloadToken(token)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired download token' },
        { status: 401 }
      )
    }

    // Check if token is expired
    if (isTokenExpired(payload)) {
      return NextResponse.json(
        { error: 'Download token has expired. Please contact support.' },
        { status: 401 }
      )
    }

    // Check if download limit reached
    if (payload.downloadCount >= 10) {
      return NextResponse.json(
        { error: 'Download limit reached (10/10). Please contact support.' },
        { status: 403 }
      )
    }

    // Verify modelId matches token
    if (payload.modelId !== params.modelId) {
      return NextResponse.json(
        { error: 'Model ID mismatch' },
        { status: 400 }
      )
    }

    // Get model
    const model = getModelById(params.modelId)
    if (!model) {
      return NextResponse.json(
        { error: 'Model not found' },
        { status: 404 }
      )
    }

    // Read file from public directory
    const filePath = join(process.cwd(), 'public', model.fileUrl)
    const fileBuffer = await readFile(filePath)

    // TODO: Increment download count in database
    // await db.updateDownloadCount(payload.purchaseId, payload.downloadCount + 1)

    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'model/gltf-binary',
        'Content-Disposition': `attachment; filename="${model.id}.glb"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Download-Count': (payload.downloadCount + 1).toString(),
        'X-Download-Limit': '10',
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    )
  }
}
