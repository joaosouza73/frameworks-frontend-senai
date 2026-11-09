import { useEffect, useMemo, useState } from 'react'
import { notesApi } from './api.js'
import './style.css'

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

function NoteIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" rx="8" />
      <path d="M11 12h10M11 16h10M11 20h6" />
    </svg>
  )
}

function App() {
  const todayLabel = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date()).toLocaleUpperCase('pt-BR')
  const [notes, setNotes] = useState([])
  const [draft, setDraft] = useState({ titulo: '', texto: '' })
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [apiAvailable, setApiAvailable] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  async function loadNotes() {
    setIsLoading(true)
    setError('')
    try {
      setNotes(await notesApi.list())
      setApiAvailable(true)
    } catch (requestError) {
      setApiAvailable(false)
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadNotes()
  }, [])

  const visibleNotes = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('pt-BR')
    if (!query) return notes
    return notes.filter((note) =>
      `${note.titulo} ${note.texto}`.toLocaleLowerCase('pt-BR').includes(query),
    )
  }, [notes, search])

  function beginNewNote() {
    setEditingId(null)
    setDraft({ titulo: '', texto: '' })
    setError('')
    setNotice('')
  }

  function beginEdit(note) {
    setEditingId(note.id)
    setDraft({ titulo: note.titulo, texto: note.texto })
    setError('')
    setNotice('')
  }

  async function saveNote(event) {
    event.preventDefault()
    setIsSaving(true)
    setError('')
    setNotice('')
    try {
      const wasEditing = Boolean(editingId)
      if (wasEditing) {
        await notesApi.update(editingId, draft)
      } else {
        await notesApi.create(draft)
      }
      beginNewNote()
      setNotice(wasEditing ? 'Nota atualizada.' : 'Nota criada.')
      await loadNotes()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function deleteNote(note) {
    const confirmed = window.confirm(`Excluir a nota “${note.titulo}”?`)
    if (!confirmed) return
    setError('')
    setNotice('')
    try {
      await notesApi.remove(note.id)
      if (editingId === note.id) beginNewNote()
      setNotice('Nota excluída.')
      await loadNotes()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const isEditing = Boolean(editingId)

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#inicio" aria-label="Notas, início">
          <span className="brand-mark"><NoteIcon /></span>
          <span>notas<span className="brand-period">.</span></span>
        </a>

        <div className="sidebar-copy">
          <span className="eyebrow">SEU ESPAÇO CRIATIVO</span>
          <h1>Ideias boas<br />merecem espaço.</h1>
          <p>Guarde pensamentos, planos e tudo o que vale lembrar.</p>
        </div>

        <button className="new-note-button" type="button" onClick={beginNewNote}>
          <span aria-hidden="true">＋</span> Nova nota
        </button>

        <div className="sidebar-foot">
          <span className={`status-dot ${apiAvailable === false ? 'status-dot-offline' : ''}`} aria-hidden="true" />
          <span>{apiAvailable === true ? 'API conectada' : isLoading ? 'Conectando à API' : 'API indisponível'}</span>
        </div>
      </aside>

      <section className="main-content" id="inicio">
        <header className="page-heading">
          <div>
            <span className="eyebrow">{todayLabel} · UM BOM DIA PARA COMEÇAR</span>
            <h2>Suas notas</h2>
            <p>Um lugar tranquilo para organizar as ideias.</p>
          </div>
          <div className="note-count" aria-label={`${notes.length} notas no total`}>
            <strong>{String(notes.length).padStart(2, '0')}</strong>
            <span>{notes.length === 1 ? 'nota' : 'notas'}</span>
          </div>
        </header>

        {notice && <p className="notice" role="status">{notice}</p>}
        {error && <p className="error-banner" role="alert">{error}</p>}

        <div className="workspace">
          <section className="notes-section" aria-labelledby="notes-heading">
            <div className="section-heading">
              <div>
                <h3 id="notes-heading">Coleção</h3>
                <p>{visibleNotes.length} {visibleNotes.length === 1 ? 'registro' : 'registros'}</p>
              </div>
              <label className="search-box">
                <span className="sr-only">Buscar notas</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>
                <input
                  type="search"
                  placeholder="Buscar"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
            </div>

            {isLoading ? (
              <div className="empty-state"><span className="loader" />Carregando suas notas...</div>
            ) : apiAvailable === false ? (
              <div className="empty-state">
                <strong>Não foi possível carregar as notas</strong>
                <span>Verifique se o servidor está disponível e tente novamente.</span>
                <button className="retry-button" type="button" onClick={loadNotes}>Tentar novamente</button>
              </div>
            ) : visibleNotes.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon" aria-hidden="true">✳</span>
                <strong>{search ? 'Nenhum resultado por aqui' : 'Sua coleção começa agora'}</strong>
                <span>{search ? 'Experimente outro termo.' : 'Crie sua primeira nota para guardar uma ideia.'}</span>
              </div>
            ) : (
              <div className="notes-grid">
                {visibleNotes.map((note, index) => (
                  <article className={`note-card note-card-${index % 4}`} key={note.id}>
                    <button className="note-content" type="button" onClick={() => beginEdit(note)}>
                      <span className="note-date">{formatDate(note.atualizadoEm)}</span>
                      <strong>{note.titulo}</strong>
                      <span className="note-excerpt">{note.texto}</span>
                    </button>
                    <div className="note-actions">
                      <button type="button" onClick={() => beginEdit(note)} aria-label={`Editar ${note.titulo}`}>Editar</button>
                      <button type="button" onClick={() => deleteNote(note)} aria-label={`Excluir ${note.titulo}`}>Excluir</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="editor-card" aria-labelledby="editor-heading">
            <div className="editor-heading">
              <span className="editor-icon" aria-hidden="true">✎</span>
              <div>
                <span className="eyebrow">RASCUNHO</span>
                <h3 id="editor-heading">{isEditing ? 'Editar nota' : 'Uma nova ideia'}</h3>
              </div>
            </div>
            <form onSubmit={saveNote}>
              <label className="field-label" htmlFor="note-title">Título</label>
              <input
                id="note-title"
                className="title-input"
                type="text"
                maxLength={120}
                placeholder="Dê um nome à sua nota"
                value={draft.titulo}
                onChange={(event) => setDraft({ ...draft, titulo: event.target.value })}
                required
              />
              <label className="field-label body-label" htmlFor="note-body">Anotação</label>
              <textarea
                id="note-body"
                maxLength={5000}
                placeholder="Escreva aqui o que não quer esquecer..."
                value={draft.texto}
                onChange={(event) => setDraft({ ...draft, texto: event.target.value })}
                required
              />
              <div className="editor-footer">
                <span>{draft.texto.length} / 5000</span>
                <div>
                  {isEditing && <button className="cancel-button" type="button" onClick={beginNewNote}>Cancelar</button>}
                  <button className="save-button" type="submit" disabled={isSaving}>
                    {isSaving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Guardar nota'}
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </form>
            <p className="privacy-note">Suas notas ficam armazenadas na API desta atividade.</p>
          </section>
        </div>
      </section>
    </main>
  )
}

export default App

