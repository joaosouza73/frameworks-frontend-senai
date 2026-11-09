export default function ConceptCard({ concept, learned, onOpen, onToggleLearned }) {
  return (
    <article className={`concept-card accent-${concept.accent}${learned ? ' is-learned' : ''}`}>
      <div className="card-topline">
        <span className="concept-symbol" aria-hidden="true">{concept.symbol}</span>
        <span className="card-duration">{concept.duration} min de leitura</span>
      </div>

      <div className="card-meta">
        <span className="topic-label">{concept.categoryLabel}</span>
        <span className="level-label">{concept.level}</span>
      </div>

      <h3>{concept.title}</h3>
      <p className="card-summary">{concept.summary}</p>

      <div className="card-actions">
        <button className="card-open" type="button" onClick={() => onOpen(concept.id)}>
          Explorar tema <span aria-hidden="true">↗</span>
        </button>
        <button
          className="learned-toggle"
          type="button"
          aria-pressed={learned}
          onClick={() => onToggleLearned(concept.id)}
        >
          <span className="learned-check" aria-hidden="true">{learned ? '✓' : '+'}</span>
          <span>{learned ? 'Estudado' : 'Marcar como estudado'}</span>
        </button>
      </div>
    </article>
  )
}
