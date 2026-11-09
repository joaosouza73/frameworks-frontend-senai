import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const pageTitles = {
  '/': 'Início',
  '/nova-publicacao': 'Nova publicação',
  '/sobre': 'Sobre o projeto',
}

export default function AppLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    const pageTitle = pageTitles[pathname] ?? (pathname.startsWith('/publicacoes/') ? 'Leitura' : 'Página não encontrada')
    document.title = `${pageTitle} · Caderno Aberto`

    return () => {
      document.title = 'Caderno Aberto — Ideias em movimento'
    }
  }, [pathname])

  return (
    <div id="topo" className="app-shell">
      <header className="site-header">
        <div className="site-width header-inner">
          <Link className="brand" to="/" aria-label="Caderno Aberto, página inicial">
            <span className="brand-symbol" aria-hidden="true">ca.</span>
            <span>Caderno<span>Aberto</span></span>
          </Link>

          <nav className="main-nav" aria-label="Navegação principal">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>Início</NavLink>
            <NavLink to="/sobre" className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}>Sobre</NavLink>
          </nav>

          <Link className="header-action" to="/nova-publicacao">
            <span>Escrever</span><span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <main className="site-width main-content"><Outlet /></main>

      <footer className="site-footer">
        <div className="site-width footer-inner">
          <Link className="footer-brand" to="/">Caderno Aberto<span> / ideias em movimento</span></Link>
          <p>Uma publicação de demonstração para aprender React.</p>
          <a href="#topo" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Voltar ao topo ↑</a>
        </div>
      </footer>
    </div>
  )
}
