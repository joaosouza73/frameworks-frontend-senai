import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createPost } from '../services/postsApi.js'

const initialForm = { title: '', body: '' }

function validate(form) {
  const errors = {}
  if (form.title.trim().length < 5) errors.title = 'Use pelo menos 5 caracteres no título.'
  if (form.body.trim().length < 12) errors.body = 'Escreva pelo menos 12 caracteres na sua ideia.'
  return errors
}

export default function NewPostPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [createdPost, setCreatedPost] = useState(null)

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    if (status !== 'idle' && status !== 'submitting') {
      setStatus('idle')
      setCreatedPost(null)
      setMessage('')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'submitting') return
    const validationErrors = validate(form)
    setErrors(validationErrors)
    setMessage('')

    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle')
      return
    }

    setStatus('submitting')

    try {
      const result = await createPost({
        title: form.title.trim(),
        body: form.body.trim(),
        userId: 1,
      })
      setCreatedPost(result)
      setStatus('success')
      setMessage(`A API respondeu com o identificador ${result.id}.`)
      setForm(initialForm)
    } catch (requestError) {
      setStatus('error')
      setMessage(requestError.message || 'Não foi possível enviar agora. Tente novamente.')
    }
  }

  return (
    <section className="form-page" aria-labelledby="form-title">
      <Link className="back-link" to="/">← Voltar à biblioteca</Link>

      <div className="form-page-heading">
        <span className="eyebrow">Caderno de ideias · Nova publicação</span>
        <h1 id="form-title">Toda ideia merece<br /><em>um bom começo.</em></h1>
        <p>Escreva um título e desenvolva a ideia em algumas linhas.</p>
      </div>

      <div className="demo-notice">
        <span aria-hidden="true">i</span>
        <p>Esta é uma atividade de demonstração. A API confirma o envio, mas não guarda a publicação no servidor.</p>
      </div>

      <form className="publication-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <div className="field-heading"><label htmlFor="title">Título</label><span>{form.title.length}/90</span></div>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={updateField}
            disabled={status === 'submitting'}
            maxLength={90}
            placeholder="Qual é a ideia?"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'title-error' : 'title-hint'}
            required
          />
          {errors.title ? <p className="field-error" id="title-error">{errors.title}</p> : <p className="field-hint" id="title-hint">Escolha um título claro e convidativo.</p>}
        </div>

        <div className="form-field">
          <div className="field-heading"><label htmlFor="body">Sua ideia</label><span>{form.body.length}/600</span></div>
          <textarea
            id="body"
            name="body"
            value={form.body}
            onChange={updateField}
            disabled={status === 'submitting'}
            maxLength={600}
            rows={7}
            placeholder="Comece pelo que despertou sua curiosidade..."
            aria-invalid={Boolean(errors.body)}
            aria-describedby={errors.body ? 'body-error' : 'body-hint'}
            required
          />
          {errors.body ? <p className="field-error" id="body-error">{errors.body}</p> : <p className="field-hint" id="body-hint">Uma observação, um aprendizado ou uma pergunta já são um ótimo início.</p>}
        </div>

        {message && (
          <div className={`submit-message message-${status}`} role={status === 'error' ? 'alert' : 'status'} aria-live="polite">
            <span aria-hidden="true">{status === 'success' ? '✓' : '!'}</span>
            <div><strong>{status === 'success' ? 'Ideia enviada para a API' : status === 'error' ? 'O envio não foi concluído' : ''}</strong><p>{message}</p></div>
          </div>
        )}

        <div className="form-actions">
          <button className="button button-dark" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Enviando...' : 'Enviar publicação'} <span aria-hidden="true">↗</span>
          </button>
          <span>Os campos são enviados para a API de demonstração.</span>
        </div>
      </form>

      {status === 'success' && createdPost && (
        <div className="response-preview">
          <span className="eyebrow">Resposta recebida</span>
          <p><strong>{createdPost.title}</strong></p>
          <p>{createdPost.body}</p>
          <Link to="/">Voltar para as leituras <span aria-hidden="true">↗</span></Link>
        </div>
      )}
    </section>
  )
}
