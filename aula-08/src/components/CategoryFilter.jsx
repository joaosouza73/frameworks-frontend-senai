export default function CategoryFilter({ categories, selected, onSelect, counts }) {
  return (
    <div className="category-tabs" role="group" aria-label="Filtrar por categoria">
      {categories.map((category) => {
        const active = selected === category.id

        return (
          <button
            className={`category-tab${active ? ' is-active' : ''}`}
            type="button"
            key={category.id}
            aria-pressed={active}
            onClick={() => onSelect(category.id)}
          >
            {category.label}
            <span>{counts[category.id] ?? 0}</span>
          </button>
        )
      })}
    </div>
  )
}
