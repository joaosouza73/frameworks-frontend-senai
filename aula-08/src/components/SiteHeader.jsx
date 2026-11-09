const links = [
  { href: '#trilha', label: 'Trilha' },
  { href: '#laboratorio', label: 'Laboratório' },
]

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="React em prática, início">
        <span className="brand-mark" aria-hidden="true">r.</span>
        <span>react<span className="brand-light">em prática</span></span>
      </a>

      <nav className="main-nav" aria-label="Navegação principal">
        {links.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>

      <a className="header-cta" href="#trilha">
        <span>Começar a trilha</span>
        <span aria-hidden="true">↗</span>
      </a>
    </header>
  )
}
