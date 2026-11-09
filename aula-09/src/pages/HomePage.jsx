import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorState from '../components/ErrorState.jsx'
import LoadingState from '../components/LoadingState.jsx'
import PostCard from '../components/PostCard.jsx'
import { getPosts } from '../services/postsApi.js'

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    getPosts({ signal: controller.signal })
      .then((data) => {
        setPosts(data)
        setStatus('success')
      })
      .catch((requestError) => {
        if (controller.signal.aborted) return
        setError(requestError.message)
        setStatus('error')
      })

    return () => controller.abort()
  }, [reloadKey])

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')
    if (!normalizedQuery) return posts
    return posts.filter((post) => `${post.title} ${post.body}`.toLocaleLowerCase('pt-BR').includes(normalizedQuery))
  }, [posts, query])

  function handleSearch(event) {
    event.preventDefault()
  }

  function retryLoading() {
    setStatus('loading')
    setError('')
    setReloadKey((key) => key + 1)
  }

  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <span className="eyebrow light-eyebrow"><span /> UM ESPAÇO PARA BOAS IDEIAS</span>
          <h1 id="home-title">Ideias em movimento.<br /><em>Leituras que ficam.</em></h1>
          <p>Uma coleção aberta de histórias, descobertas e pensamentos para ler no seu tempo.</p>
          <a className="hero-link" href="#publicacoes">Explorar publicações <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-stamp" aria-hidden="true">
          <div className="stamp-orbit" />
          <div className="stamp-paper"><span>LEIA</span><strong>com<br />calma.</strong><i>ideias abertas</i></div>
          <span className="stamp-star">✳</span>
          <span className="stamp-index">Nº 01 / 2026</span>
        </div>
        <div className="hero-footnote"><span>PUBLICAÇÕES DA COMUNIDADE</span><span>BUSCAR · DESCOBRIR · COMPARTILHAR</span></div>
      </section>

      <section id="publicacoes" className="publications-section" aria-labelledby="publications-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Da comunidade</span>
            <h2 id="publications-title">Uma pausa para ler<span>.</span></h2>
          </div>
          <p>Textos recentes para abrir uma ideia nova no seu dia.</p>
        </div>

        <div className="feed-toolbar">
          <div className={`api-status api-${status}`} role="status" aria-live="polite">
            <span className="status-dot" />
            {status === 'loading' ? 'Conectando à biblioteca' : status === 'error' ? 'Conexão indisponível' : 'Biblioteca atualizada'}
          </div>
          <form className="search-form" onSubmit={handleSearch} role="search">
            <label htmlFor="post-search" className="sr-only">Buscar publicações</label>
            <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
            <input
              id="post-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar uma ideia..."
              autoComplete="off"
            />
            <button type="submit" aria-label="Buscar">↵</button>
          </form>
        </div>

        {status === 'loading' && <LoadingState label="Buscando publicações na API..." />}
        {status === 'error' && <ErrorState message={error} onRetry={retryLoading} />}
        {status === 'success' && filteredPosts.length > 0 && (
          <div className="post-grid">
            {filteredPosts.map((post, index) => <PostCard key={post.id} post={post} index={index} />)}
          </div>
        )}
        {status === 'success' && filteredPosts.length === 0 && (
          <div className="empty-feed" role="status">
            <span aria-hidden="true">⌕</span>
            <div><h3>Nenhuma publicação encontrada</h3><p>Tente buscar por outro termo.</p></div>
            <button type="button" onClick={() => setQuery('')}>Limpar busca</button>
          </div>
        )}
      </section>

      <section className="write-banner" aria-label="Contribua com uma publicação">
        <div className="write-mark" aria-hidden="true">✳</div>
        <div><span className="eyebrow">Toda ideia começa em algum lugar</span><h2>Tem algo para compartilhar?</h2></div>
        <Link className="button button-light" to="/nova-publicacao">Criar publicação <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  )
}
