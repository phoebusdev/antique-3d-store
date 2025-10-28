import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, EB_Garamond } from 'next/font/google'
import './globals.css'
import Header from '@/app/_components/Header'
import Footer from '@/app/_components/Footer'

// T019: Root layout with semantic typography system
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Antique 3D Store | Historical Furniture Models',
  description: 'Museum-quality 3D models of historical antique furniture. Digital downloads and CNC-ready files for authentic reproductions.',
  keywords: ['3D models', 'antique furniture', 'historical reproductions', 'CNC fabrication', 'digital downloads'],
  openGraph: {
    title: 'Antique 3D Store',
    description: 'Museum-quality 3D models of historical antique furniture',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
