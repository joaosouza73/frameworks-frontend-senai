import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'ritmo-agenda-react-v1'
const filters = [
  { id: 'todas', label: 'Todas' },
  { id: 'abertas', label: 'Em andamento' },
  { id: 'concluidas', label: 'Concluídas' },
]

function readTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [dueDate, setDueDate] = useState('')

  function submit(event) {
    event.preventDefault()
    if (!title.trim()) return
    onAdd({ title: title.trim(), subject: subject.trim(), dueDate })
    setTitle('')
    setSubject('')
    setDueDate('')
  }

  return (
    <form className="task-form" onSubmit={submit}>
      <label className="field field-wide">
        <span>O que precisa fazer?</span>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ex.: revisar os componentes React" maxLength={100} required />
      </label>
      <label className="field">
        <span>Disciplina</span>
        <input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Ex.: Front-end" maxLength={40} />
      </label>
      <label className="field">
        <span>Prazo</span>
        <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      </label>
      <button className="add-button" type="submit">Adicionar atividade <span aria-hidden="true">+</span></button>
    </form>
  )
}

function TaskItem({ task, onToggle, onDelete }) {
  const dueLabel = task.dueDate
    ? new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }).format(new Date(`${task.dueDate}T12:00:00`))
    : 'Sem prazo'

  return (
    <li className={`task-item${task.done ? ' is-done' : ''}`}>
      <button className="check-button" type="button" aria-label={task.done ? `Reabrir: ${task.title}` : `Concluir: ${task.title}`} aria-pressed={task.done} onClick={() => onToggle(task.id)}>
        {task.done && <span aria-hidden="true">✓</span>}
      </button>
      <div className="task-copy">
        <strong>{task.title}</strong>
        <span>{task.subject || 'Sem disciplina'} <i aria-hidden="true">·</i> {dueLabel}</span>
      </div>
      <button className="delete-button" type="button" aria-label={`Excluir: ${task.title}`} onClick={() => onDelete(task.id)}>Excluir</button>
    </li>
  )
}

export default function App() {
  const [tasks, setTasks] = useState(readTasks)
  const [filter, setFilter] = useState('todas')

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) } catch { /* armazenamento local é opcional */ }
  }, [tasks])

  const openCount = tasks.filter((task) => !task.done).length
  const completedCount = tasks.length - openCount
  const visibleTasks = useMemo(() => tasks.filter((task) => (
    filter === 'todas' || (filter === 'abertas' && !task.done) || (filter === 'concluidas' && task.done)
  )), [tasks, filter])

  function addTask(task) {
    setTasks((current) => [{ ...task, id: crypto.randomUUID(), done: false }, ...current])
  }

  return (
    <main className="page-shell">
      <header className="topbar"><a className="wordmark" href="#inicio"><span className="brand-icon">r</span> ritmo<span className="wordmark-dot">.</span></a><span className="topbar-note">Seu semestre, no seu ritmo.</span></header>
      <section className="intro" id="inicio">
        <div><p className="eyebrow">AGENDA ACADÊMICA</p><h1>Um passo de cada vez<span>.</span></h1><p className="intro-copy">Reúna entregas, aulas e ideias. O que importa hoje fica mais fácil de enxergar.</p></div>
        <div className="date-card"><span>ATIVIDADES ABERTAS</span><strong>{String(openCount).padStart(2, '0')}</strong><small>{completedCount} concluída{completedCount === 1 ? '' : 's'}</small></div>
      </section>
      <section className="panel" aria-labelledby="new-task-title">
        <div className="section-title"><div><p className="eyebrow">PLANEJAMENTO</p><h2 id="new-task-title">Adicionar atividade</h2></div><span className="section-number">01</span></div>
        <TaskForm onAdd={addTask} />
      </section>
      <section className="task-section" aria-labelledby="task-list-title">
        <div className="task-heading"><div><p className="eyebrow">SUA ROTINA</p><h2 id="task-list-title">Lista de atividades <span>({visibleTasks.length})</span></h2></div>
          <div className="filter-tabs" role="group" aria-label="Filtrar atividades">{filters.map((item) => <button key={item.id} type="button" className={filter === item.id ? 'active' : ''} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}</div>
        </div>
        {visibleTasks.length ? <ul className="task-list">{visibleTasks.map((task) => <TaskItem key={task.id} task={task} onToggle={(id) => setTasks((current) => current.map((item) => item.id === id ? { ...item, done: !item.done } : item))} onDelete={(id) => setTasks((current) => current.filter((item) => item.id !== id))} />)}</ul> : <div className="empty-state"><span aria-hidden="true">✳</span><strong>Nenhuma atividade por aqui</strong><p>Adicione uma tarefa ou escolha outro filtro.</p></div>}
      </section>
      <footer className="footer"><span>Ritmo · organização acadêmica</span><span>Seus dados ficam salvos neste navegador.</span></footer>
    </main>
  )
}
