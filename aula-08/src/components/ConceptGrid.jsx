import ConceptCard from './ConceptCard.jsx'

export default function ConceptGrid({ concepts, learnedIds, onOpen, onToggleLearned, onClearFilters }) {
  if (concepts.length === 0) {
    return (
      <div className="empty-state" role="status">
        <span className="empty-icon" aria-hidden="true">⌕</span>
        <h3>Nenhum tema por aqui</h3>
        <p>Tente outra palavra ou remova os filtros para ver todos os conceitos.</p>
        <button className="text-button" type="button" onClick={onClearFilters}>
          Limpar busca e filtros
        </button>
      </div>
    )
  }

  return (
    <div className="concept-grid">
      {concepts.map((concept) => (
        <ConceptCard
          concept={concept}
          key={concept.id}
          learned={learnedIds.includes(concept.id)}
          onOpen={onOpen}
          onToggleLearned={onToggleLearned}
        />
      ))}
    </div>
  )
}
