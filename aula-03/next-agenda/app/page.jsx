'use client'

import { useEffect, useMemo, useState } from 'react'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'

const STORAGE_KEY = 'ritmo-agenda-next-v1'
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

export default function HomePage() {
  const [tasks, setTasks] = useState(null)
  const [filter, setFilter] = useState('todas')

  useEffect(() => setTasks(readTasks()), [])
  useEffect(() => {
    if (tasks === null) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) } catch { /* armazenamento local é opcional */ }
  }, [tasks])

  const currentTasks = tasks ?? []
  const openCount = currentTasks.filter((task) => !task.done).length
  const completedCount = currentTasks.length - openCount
  const visibleTasks = useMemo(() => currentTasks.filter((task) => (
    filter === 'todas' || (filter === 'abertas' && !task.done) || (filter === 'concluidas' && task.done)
  )), [currentTasks, filter])

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
      <section className="panel" aria-labelledby="new-task-title"><div className="section-title"><div><p className="eyebrow">PLANEJAMENTO</p><h2 id="new-task-title">Adicionar atividade</h2></div><span className="section-number">01</span></div><TaskForm onAdd={addTask} /></section>
      <section className="task-section" aria-labelledby="task-list-title">
        <div className="task-heading"><div><p className="eyebrow">SUA ROTINA</p><h2 id="task-list-title">Lista de atividades <span>({visibleTasks.length})</span></h2></div>
          <div className="filter-tabs" role="group" aria-label="Filtrar atividades">{filters.map((item) => <button key={item.id} type="button" className={filter === item.id ? 'active' : ''} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}</div>
        </div>
        <TaskList tasks={visibleTasks} onToggle={(id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task))} onDelete={(id) => setTasks((current) => current.filter((task) => task.id !== id))} />
      </section>
      <footer className="footer"><span>Ritmo · organização acadêmica</span><span>Seus dados ficam salvos neste navegador.</span></footer>
    </main>
  )
}
