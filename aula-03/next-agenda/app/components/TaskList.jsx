'use client'

function TaskItem({ task, onToggle, onDelete }) {
  const dueLabel = task.dueDate
    ? new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }).format(new Date(`${task.dueDate}T12:00:00`))
    : 'Sem prazo'

  return (
    <li className={`task-item${task.done ? ' is-done' : ''}`}>
      <button className="check-button" type="button" aria-label={task.done ? `Reabrir: ${task.title}` : `Concluir: ${task.title}`} aria-pressed={task.done} onClick={() => onToggle(task.id)}>{task.done && <span aria-hidden="true">✓</span>}</button>
      <div className="task-copy"><strong>{task.title}</strong><span>{task.subject || 'Sem disciplina'} <i aria-hidden="true">·</i> {dueLabel}</span></div>
      <button className="delete-button" type="button" aria-label={`Excluir: ${task.title}`} onClick={() => onDelete(task.id)}>Excluir</button>
    </li>
  )
}

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <div className="empty-state"><span aria-hidden="true">✳</span><strong>Nenhuma atividade por aqui</strong><p>Adicione uma tarefa ou escolha outro filtro.</p></div>
  return <ul className="task-list">{tasks.map((task) => <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />)}</ul>
}
