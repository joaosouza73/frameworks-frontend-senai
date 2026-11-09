export default function LoadingState({ label = 'Carregando publicações...' }) {
  return (
    <div className="state-panel loading-panel" role="status" aria-live="polite">
      <span className="loading-mark" aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}
