import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, EB_Garamond, Space_Grotesk } from 'next/font/google'
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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-modern',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CarveNC | Architectural Stone Elements via CNC',
  description: 'Post-labor economics for architectural stone. CNC automation eliminates labor costs, making UNESCO-quality ornament economically viable at any scale.',
  keywords: ['CNC stone carving', 'architectural stone', 'automation economics', 'CNC fabrication', 'photogrammetry'],
  openGraph: {
    title: 'CarveNC',
    description: 'Architectural Stone Elements: Post-Labor Economics',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
