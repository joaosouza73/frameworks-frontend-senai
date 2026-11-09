import { Link } from 'react-router-dom'

const topics = [
  {
    number: '01',
    title: 'Estado e formulários',
    text: 'Campos controlados guardam título e texto no estado React. O envio valida as informações e evita o recarregamento da página.',
  },
  {
    number: '02',
    title: 'Efeitos e APIs',
    text: 'useEffect busca publicações e comentários, trata carregamento e erro e cancela requisições quando a tela deixa de ser usada.',
  },
  {
    number: '03',
    title: 'Rotas e navegação',
    text: 'A biblioteca, os detalhes e o formulário têm caminhos próprios. A tela de leitura usa o parâmetro da URL para buscar o artigo.',
  },
]

export default function AboutPage() {
  return (
    <article className="about-page">
      <header className="about-heading">
        <span className="eyebrow">Sobre o projeto</span>
        <h1>Uma ideia simples.<br /><em>Várias peças em movimento.</em></h1>
        <p>O Caderno Aberto transforma conceitos de React em uma experiência de leitura com busca de dados, navegação e envio de uma nova publicação.</p>
      </header>

      <div className="about-illustration" aria-hidden="true">
        <div className="about-line line-one" /><div className="about-line line-two" />
        <span className="about-token token-state">useState <b>↗</b></span>
        <span className="about-token token-effect">useEffect <b>↗</b></span>
        <span className="about-token token-route">/publicacoes/:id <b>↗</b></span>
        <span className="about-center">ca.</span>
        <span className="about-orbit" />
      </div>

      <section className="about-topics" aria-labelledby="topics-title">
        <div className="section-heading">
          <div><span className="eyebrow">Por trás das páginas</span><h2 id="topics-title">React em uso<span>.</span></h2></div>
          <p>Cada parte demonstra um recurso em um contexto real de interface.</p>
        </div>
        <div className="topic-list">
          {topics.map((topic) => (
            <article className="topic-row" key={topic.number}>
              <span className="topic-number">{topic.number}</span>
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
              <span className="topic-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <aside className="api-note">
        <span className="api-note-icon" aria-hidden="true">i</span>
        <div><strong>Sobre a API de demonstração</strong><p>As publicações e os comentários vêm do JSONPlaceholder. O POST responde como se o item tivesse sido criado, mas não grava os dados permanentemente. Não envie informações pessoais.</p></div>
        <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noreferrer">Conhecer a API <span aria-hidden="true">↗</span></a>
      </aside>

      <div className="about-cta"><p>Pronto para continuar a leitura?</p><Link className="button button-dark" to="/">Explorar publicações <span aria-hidden="true">↗</span></Link></div>
    </article>
  )
}
