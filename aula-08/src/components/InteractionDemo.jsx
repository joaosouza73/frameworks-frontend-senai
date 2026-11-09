import { useState } from 'react'

const MAX_CLICKS = 10

export default function InteractionDemo() {
  const [clicks, setClicks] = useState(0)
  const progress = Math.min((clicks / MAX_CLICKS) * 100, 100)

  return (
    <section className="lab-card" aria-labelledby="lab-title">
      <div className="lab-copy">
        <span className="eyebrow">Mini laboratório · estado em ação</span>
        <h3 id="lab-title">A interface acompanha os dados.</h3>
        <p>
          Cada clique atualiza o estado. O React renderiza a nova descrição e coordena a
          atualização do DOM — sem alterar elementos manualmente.
        </p>
        <div className="lab-actions">
          <button
            className="primary-button"
            type="button"
            onClick={() => setClicks((current) => Math.min(current + 1, MAX_CLICKS))}
            disabled={clicks === MAX_CLICKS}
          >
            Atualizar contador <span aria-hidden="true">↗</span>
          </button>
          <button className="reset-button" type="button" onClick={() => setClicks(0)} disabled={clicks === 0}>
            Recomeçar
          </button>
        </div>
      </div>

      <div className="counter-display" aria-live="polite" aria-atomic="true">
        <div className="counter-orbit orbit-one" />
        <div className="counter-orbit orbit-two" />
        <span className="counter-caption">ESTADO ATUAL</span>
        <strong>{String(clicks).padStart(2, '0')}</strong>
        <span className="counter-label">{clicks === 1 ? 'atualização' : 'atualizações'}</span>
        <div className="counter-track"><span style={{ width: `${progress}%` }} /></div>
      </div>
    </section>
  )
}
