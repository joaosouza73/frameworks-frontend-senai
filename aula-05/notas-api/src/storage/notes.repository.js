import { randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDirectory = dirname(fileURLToPath(import.meta.url))
const storePath = process.env.NOTES_FILE
  ? resolve(process.env.NOTES_FILE)
  : resolve(currentDirectory, '../../data/notes.json')

let writeQueue = Promise.resolve()

async function ensureStore() {
  await mkdir(dirname(storePath), { recursive: true })
  try {
    await readFile(storePath, 'utf8')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    await writeFile(storePath, '[]\n', 'utf8')
  }
}

async function readStoredNotes() {
  await ensureStore()
  const contents = await readFile(storePath, 'utf8')
  const notes = JSON.parse(contents)
  if (!Array.isArray(notes)) throw new Error('O arquivo de notas precisa conter uma lista JSON.')
  return notes
}

async function saveNotes(notes) {
  const temporaryPath = `${storePath}.${randomUUID()}.tmp`
  await writeFile(temporaryPath, `${JSON.stringify(notes, null, 2)}\n`, 'utf8')
  await rename(temporaryPath, storePath)
}

function transact(change) {
  const operation = writeQueue.then(async () => {
    const notes = await readStoredNotes()
    const result = change(notes)
    if (result.persist !== false) await saveNotes(notes)
    return result.value
  })
  writeQueue = operation.catch(() => {})
  return operation
}

export async function listNotes() {
  await writeQueue
  const notes = await readStoredNotes()
  return notes.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
}

export async function findNote(id) {
  await writeQueue
  const notes = await readStoredNotes()
  return notes.find((note) => note.id === id) ?? null
}

export function createNote({ titulo, texto }) {
  return transact((notes) => {
    const now = new Date().toISOString()
    const note = {
      id: randomUUID(),
      titulo,
      texto,
      criadoEm: now,
      atualizadoEm: now,
    }
    notes.push(note)
    return { value: note }
  })
}

export function updateNote(id, { titulo, texto }) {
  return transact((notes) => {
    const note = notes.find((item) => item.id === id)
    if (!note) return { value: null, persist: false }
    note.titulo = titulo
    note.texto = texto
    note.atualizadoEm = new Date().toISOString()
    return { value: note }
  })
}

export function removeNote(id) {
  return transact((notes) => {
    const index = notes.findIndex((note) => note.id === id)
    if (index === -1) return { value: false, persist: false }
    notes.splice(index, 1)
    return { value: true }
  })
}
