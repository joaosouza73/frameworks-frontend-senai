export default function StudyProgress({ learnedCount, total }) {
  const percentage = total === 0 ? 0 : Math.round((learnedCount / total) * 100)

  return (
    <section className="progress-card" aria-label="Progresso da trilha">
      <div className="progress-copy">
        <div>
          <span className="eyebrow">Seu progresso</span>
          <p><strong>{learnedCount}</strong> de {total} temas estudados</p>
        </div>
        <span className="progress-percent">{percentage}%</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Temas estudados"
        aria-valuemin="0"
        aria-valuemax={total}
        aria-valuenow={learnedCount}
      >
        <span style={{ width: `${percentage}%` }} />
      </div>
    </section>
  )
}
