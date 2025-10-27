import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getModelById } from '@/app/_lib/models'
import ModelDetailClient from '@/app/_components/ModelDetailClient'

// T036: Model detail page with dynamic routing
interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const model = getModelById(params.id)

  if (!model) {
    return {
      title: 'Model Not Found',
    }
  }

  return {
    title: `${model.name} | Antique 3D Store`,
    description: `${model.era} - ${model.provenance.substring(0, 150)}...`,
    openGraph: {
      title: model.name,
      description: model.provenance,
      images: model.thumbnailUrl ? [model.thumbnailUrl] : [],
    },
  }
}

export default function ModelDetailPage({ params }: Props) {
  const model = getModelById(params.id)

  if (!model || !model.published) {
    notFound()
  }

  return <ModelDetailClient model={model} />
}
