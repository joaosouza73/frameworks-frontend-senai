const endpoint = `${window.APP_CONFIG.apiBaseUrl.replace(/\/$/, '')}/api/data-hora`
const horaEl = document.querySelector('#hora')
const dataEl = document.querySelector('#data')
const conexaoEl = document.querySelector('#conexao')
const atualizarButton = document.querySelector('#atualizar')

const formatoHora = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
})
const formatoData = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
})

async function consultarHorario() {
  atualizarButton.disabled = true
  conexaoEl.textContent = 'Consultando a API...'
  conexaoEl.classList.remove('erro')

  try {
    const resposta = await fetch(endpoint, { headers: { Accept: 'application/json' } })
    if (!resposta.ok) throw new Error(`A API respondeu com status ${resposta.status}.`)
    const dados = await resposta.json()
    const instante = new Date(dados.dataHora)
    if (Number.isNaN(instante.getTime())) throw new Error('A API retornou uma data inválida.')

    horaEl.textContent = formatoHora.format(instante)
    dataEl.textContent = formatoData.format(instante)
    conexaoEl.textContent = `API conectada · ${new Date().toLocaleTimeString('pt-BR')}`
  } catch (erro) {
    conexaoEl.textContent = `Não foi possível consultar a API. ${erro.message}`
    conexaoEl.classList.add('erro')
  } finally {
    atualizarButton.disabled = false
  }
}

atualizarButton.addEventListener('click', consultarHorario)
consultarHorario()
window.setInterval(consultarHorario, 30_000)
