export default function ErrorState({ message, onRetry }) {
  return (
    <div className="state-panel error-panel" role="alert">
      <span className="state-icon" aria-hidden="true">!</span>
      <div>
        <h2>Não foi possível carregar agora</h2>
        <p>{message || 'Confira sua conexão e tente novamente.'}</p>
      </div>
      {onRetry && <button className="button button-quiet" type="button" onClick={onRetry}>Tentar novamente</button>}
    </div>
  )
}
