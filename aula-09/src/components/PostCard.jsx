import { Link } from 'react-router-dom'

function formatPostId(id) {
  return String(id).startsWith('demo-') ? 'RASCUNHO' : `ARTIGO ${String(id).padStart(2, '0')}`
}

export default function PostCard({ post, index = 0 }) {
  return (
    <article className={`post-card post-tone-${index % 4}`}>
      <div className="post-card-meta">
        <span>{formatPostId(post.id)}</span>
        <span className="post-card-dot" aria-hidden="true">✳</span>
      </div>
      <p className="post-category">Caderno de ideias <span>·</span> Leitura</p>
      <h3><Link to={`/publicacoes/${post.id}`}>{post.title}</Link></h3>
      <p className="post-excerpt">{post.body}</p>
      <div className="post-card-bottom">
        <span>Por leitor {post.userId ?? 1}</span>
        <Link to={`/publicacoes/${post.id}`} aria-label={`Ler ${post.title}`}>Ler artigo <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  )
}
