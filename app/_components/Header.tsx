import Link from 'next/link'

// T021: Header component with navigation
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-display font-semibold tracking-tight hover:text-primary transition-colors">
              Antique 3D
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-display text-muted hover:text-foreground transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/about"
                className="text-sm font-display text-muted hover:text-foreground transition-colors"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
