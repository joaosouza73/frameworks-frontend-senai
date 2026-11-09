export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <label className="search-field">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="search-icon">
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4.2 4.2" />
      </svg>
      <span className="sr-only">Buscar conceitos</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Busque por um tema..."
        autoComplete="off"
      />
      <span className="search-count" aria-live="polite">{resultCount} temas</span>
    </label>
  )
}
