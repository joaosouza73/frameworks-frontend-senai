import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="not-found-panel">
      <span className="not-found-number">404</span>
      <span className="eyebrow">Página não encontrada</span>
      <h1>Este caminho ainda não virou uma história.</h1>
      <Link className="button button-dark" to="/">Ir para a biblioteca <span aria-hidden="true">↗</span></Link>
    </section>
  )
}
