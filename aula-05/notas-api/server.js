import cors from 'cors'
import express from 'express'
import notesRouter from './src/routes/notes.routes.js'

const app = express()
const port = Number(process.env.PORT) || 3000
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ?.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.disable('x-powered-by')
app.use(cors({ origin: allowedOrigins?.length ? allowedOrigins : true }))
app.use(express.json({ limit: '12kb' }))

app.get('/', (_request, response) => {
  response.json({ mensagem: 'API de notas', endpoint: '/api/notes' })
})

app.use('/api/notes', notesRouter)

app.use((request, response) => {
  response.status(404).json({ erro: `Rota não encontrada: ${request.method} ${request.path}` })
})

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({ erro: 'O corpo da requisição contém JSON inválido.' })
  }

  if (error.type === 'entity.too.large') {
    return response.status(413).json({ erro: 'O corpo da requisição excede o limite de 12 KB.' })
  }

  console.error(error)
  return response.status(500).json({ erro: 'Ocorreu um erro interno.' })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`API de notas disponível na porta ${port}`)
})
