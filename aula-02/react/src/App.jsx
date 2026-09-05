import { useState } from 'react'
import './App.css'

function App() {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null))
  const [jogadorAtual, setJogadorAtual] = useState('X')
  const [vencedor, setVencedor] = useState(null)
  const [empate, setEmpate] = useState(false)
  const [vitorias, setVitorias] = useState({ X: 0, O: 0 })

  const combinacoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  function verificarVencedor(novoTabuleiro) {
    for (const [a, b, c] of combinacoesVitoria) {
      if (
        novoTabuleiro[a] &&
        novoTabuleiro[a] === novoTabuleiro[b] &&
        novoTabuleiro[a] === novoTabuleiro[c]
      ) {
        return novoTabuleiro[a]
      }
    }

    return null
  }

  function jogar(index) {
    if (tabuleiro[index] || vencedor || empate) {
      return
    }

    const novoTabuleiro = [...tabuleiro]
    novoTabuleiro[index] = jogadorAtual

    const resultado = verificarVencedor(novoTabuleiro)

    setTabuleiro(novoTabuleiro)

    if (resultado) {
      setVencedor(resultado)
      setVitorias((placar) => ({
        ...placar,
        [resultado]: placar[resultado] + 1,
      }))
      return
    }

    if (novoTabuleiro.every((celula) => celula !== null)) {
      setEmpate(true)
      return
    }

    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X')
  }

  function reiniciarPartida() {
    setTabuleiro(Array(9).fill(null))
    setJogadorAtual('X')
    setVencedor(null)
    setEmpate(false)
  }

  function reiniciarPlacar() {
    setVitorias({ X: 0, O: 0 })
    reiniciarPartida()
  }

  function mensagemStatus() {
    if (vencedor) {
      return `Jogador ${vencedor} venceu!`
    }

    if (empate) {
      return 'Empate!'
    }

    return `Vez do jogador ${jogadorAtual}`
  }

  return (
    <main className="app">
      <div className="container">
        <header className="cabecalho">
          <p className="subtitulo">REACT</p>
          <h1>Jogo da Velha</h1>
          <p className="descricao">
            Um jogo desenvolvido com React, usando componentes, estados e eventos.
          </p>
        </header>

        <section className="placar">
          <div className="jogador">
            <span>Jogador X</span>
            <strong>{vitorias.X}</strong>
          </div>

          <div className="status">
            <span>{mensagemStatus()}</span>
          </div>

          <div className="jogador">
            <span>Jogador O</span>
            <strong>{vitorias.O}</strong>
          </div>
        </section>

        <section className="tabuleiro" aria-label="Tabuleiro do Jogo da Velha">
          {tabuleiro.map((celula, index) => (
            <button
              key={index}
              className={`celula ${celula ? `celula-${celula.toLowerCase()}` : ''}`}
              onClick={() => jogar(index)}
              aria-label={`Casa ${index + 1}`}
            >
              {celula}
            </button>
          ))}
        </section>

        <section className="acoes">
          <button className="botao botao-principal" onClick={reiniciarPartida}>
            Nova partida
          </button>

          <button className="botao botao-secundario" onClick={reiniciarPlacar}>
            Zerar placar
          </button>
        </section>

        <footer className="rodape">
          <p>Projeto desenvolvido para a Aula 02 — Frameworks Front-end</p>
        </footer>
      </div>
    </main>
  )
}

export default App