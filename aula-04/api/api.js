import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ?.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins?.length ? allowedOrigins : true }))
app.use(express.json())

app.get('/', (_request, response) => {
  response.json({ mensagem: 'API de data e hora', endpoint: '/api/data-hora' })
})

app.get('/api/data-hora', (_request, response) => {
  const agora = new Date()
  response.json({
    dataHora: agora.toISOString(),
    fusoHorario: 'UTC',
    timestamp: agora.getTime(),
  })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`API disponível na porta ${port}`)
})
