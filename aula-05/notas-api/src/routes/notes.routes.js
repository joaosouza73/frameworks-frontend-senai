import { Router } from 'express'
import {
  createNote,
  findNote,
  listNotes,
  removeNote,
  updateNote,
} from '../storage/notes.repository.js'

const router = Router()
const MAX_TITLE_LENGTH = 120
const MAX_TEXT_LENGTH = 5000

function validateNote(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { erro: 'Envie um objeto JSON com os campos titulo e texto.' }
  }

  const errors = {}
  const titulo = typeof payload.titulo === 'string' ? payload.titulo.trim() : ''
  const texto = typeof payload.texto === 'string' ? payload.texto.trim() : ''

  if (!titulo) errors.titulo = 'Informe um título.'
  else if (titulo.length > MAX_TITLE_LENGTH) errors.titulo = `Use até ${MAX_TITLE_LENGTH} caracteres.`

  if (!texto) errors.texto = 'Informe o texto da nota.'
  else if (texto.length > MAX_TEXT_LENGTH) errors.texto = `Use até ${MAX_TEXT_LENGTH} caracteres.`

  if (Object.keys(errors).length) return { erro: 'Confira os campos enviados.', campos: errors }
  return { titulo, texto }
}

router.get('/', async (_request, response) => {
  response.json(await listNotes())
})

router.post('/', async (request, response) => {
  const fields = validateNote(request.body)
  if (fields.erro) return response.status(400).json(fields)

  const note = await createNote(fields)
  return response.status(201).json(note)
})

router.get('/:id', async (request, response) => {
  const note = await findNote(request.params.id)
  if (!note) return response.status(404).json({ erro: 'Nota não encontrada.' })
  return response.json(note)
})

router.put('/:id', async (request, response) => {
  const fields = validateNote(request.body)
  if (fields.erro) return response.status(400).json(fields)

  const note = await updateNote(request.params.id, fields)
  if (!note) return response.status(404).json({ erro: 'Nota não encontrada.' })
  return response.json(note)
})

router.delete('/:id', async (request, response) => {
  const removed = await removeNote(request.params.id)
  if (!removed) return response.status(404).json({ erro: 'Nota não encontrada.' })
  return response.status(204).end()
})

export default router
