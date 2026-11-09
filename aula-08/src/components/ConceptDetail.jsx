export default function ConceptDetail({ concept, onClose }) {
  if (!concept) return null

  return (
    <aside className={`concept-detail accent-${concept.accent}`} aria-labelledby="detail-title">
      <div className="detail-heading">
        <div>
          <span className="eyebrow">Por dentro do tema · {concept.categoryLabel}</span>
          <h3 id="detail-title">{concept.title}</h3>
        </div>
        <button className="icon-button" type="button" onClick={onClose} aria-label="Fechar detalhes">
          ×
        </button>
      </div>

      <p className="detail-explanation">{concept.explanation}</p>

      <div className="detail-columns">
        <section className="code-example" aria-label="Exemplo de código">
          <div className="code-topline"><span /> <span /> <span /><small>exemplo.jsx</small></div>
          <pre><code>{concept.snippet}</code></pre>
        </section>

        <div className="practice-card">
          <span className="eyebrow">Agora é com você</span>
          <p>{concept.practice}</p>
          <div className="key-takeaway"><span aria-hidden="true">✳</span>{concept.takeaway}</div>
        </div>
      </div>
    </aside>
  )
}
