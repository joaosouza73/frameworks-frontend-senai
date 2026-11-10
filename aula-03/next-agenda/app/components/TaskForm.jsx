'use client'

import { useState } from 'react'

export default function TaskForm({ onAdd }) {
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
      <label className="field field-wide"><span>O que precisa fazer?</span><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ex.: revisar os componentes React" maxLength={100} required /></label>
      <label className="field"><span>Disciplina</span><input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Ex.: Front-end" maxLength={40} /></label>
      <label className="field"><span>Prazo</span><input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></label>
      <button className="add-button" type="submit">Adicionar atividade <span aria-hidden="true">+</span></button>
    </form>
  )
}
