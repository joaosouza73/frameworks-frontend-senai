import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState.jsx'
import LoadingState from '../components/LoadingState.jsx'
import { getComments, getPost } from '../services/postsApi.js'

export default function PostPage() {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    setPost(null)
    setComments([])
    setError('')

    Promise.all([
      getPost(postId, { signal: controller.signal }),
      getComments(postId, { signal: controller.signal }),
    ])
      .then(([postData, commentData]) => {
        if (!postData.id) {
          setStatus('not-found')
          return
        }
        setPost(postData)
        setComments(commentData)
        setStatus('success')
      })
      .catch((requestError) => {
        if (controller.signal.aborted) return
        setError(requestError.message)
        setStatus('error')
      })

    return () => controller.abort()
  }, [postId])

  if (status === 'loading') return <LoadingState label="Abrindo publicação..." />
  if (status === 'error') return <ErrorState message={error} />

  if (status === 'not-found') {
    return (
      <section className="not-found-panel">
        <span className="eyebrow">404 · página não encontrada</span>
        <h1>Esta publicação não está por aqui.</h1>
        <Link className="button button-dark" to="/">Voltar à biblioteca <span aria-hidden="true">↗</span></Link>
      </section>
    )
  }

  return (
    <article className="article-page">
      <Link className="back-link" to="/">← Voltar à biblioteca</Link>
      <header className="article-header">
        <span className="article-kicker">CADERNO DE IDEIAS <span>·</span> ARTIGO {String(post.id).padStart(2, '0')}</span>
        <h1>{post.title}</h1>
        <p className="article-byline">Por leitor {post.userId} <span>·</span> Publicação da comunidade</p>
      </header>

      <div className="article-cover" aria-hidden="true">
        <span className="cover-orbit" />
        <span className="cover-symbol">✳</span>
        <span className="cover-index">UMA IDEIA DE CADA VEZ / {String(post.id).padStart(2, '0')}</span>
      </div>

      <div className="article-body"><p>{post.body}</p></div>

      <section className="comments-section" aria-labelledby="comments-heading">
        <div className="comments-heading">
          <div><span className="eyebrow">A conversa continua</span><h2 id="comments-heading">Notas de leitura <span>({comments.length})</span></h2></div>
          <Link to="/nova-publicacao">Escrever uma ideia <span aria-hidden="true">↗</span></Link>
        </div>
        {comments.length > 0 ? (
          <div className="comment-list">
            {comments.map((comment) => (
              <article className="comment-card" key={comment.id}>
                <div className="comment-avatar" aria-hidden="true">{comment.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="comment-meta"><strong>{comment.name}</strong><span>{comment.email}</span></div>
                  <p>{comment.body}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="comment-empty">Ainda não há notas para esta publicação.</p>
        )}
      </section>
    </article>
  )
}
