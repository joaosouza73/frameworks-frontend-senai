# Aula 02 — Jogo da Velha

Jogo para duas pessoas desenvolvido com React e Vite. Os jogadores alternam entre X e O no mesmo tabuleiro; a aplicação acompanha as vitórias e identifica empate.

## Funcionalidades

- Tabuleiro 3 × 3 para partidas entre duas pessoas.
- Alternância automática entre X e O.
- Identificação de vitória e empate.
- Placar de vitórias durante a sessão.
- Ações para iniciar outra partida ou zerar o placar.
- Interface adaptável a telas menores.
- Mensagens do jogo anunciadas por tecnologia assistiva.

## Conceitos de React utilizados

- `useState` controla o tabuleiro, jogador atual, resultado e placar.
- Componentes React descrevem e atualizam as partes da interface.
- Eventos `onClick` recebem as jogadas e os pedidos de reinício.
- `map()` renderiza as nove casas do tabuleiro com `key` estável por posição.
- Renderização condicional apresenta o marcador, o próximo jogador, vitória ou empate.

## Executar localmente

Requisitos: Node.js compatível com a versão do Vite do projeto e npm.

```bash
npm install
npm run dev
```

O Vite informa o endereço local para abrir no navegador.

## Outros comandos

```bash
npm run build
npm run preview
npm run lint
```

## Estrutura

```text
react/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Aplicação publicada

[Abrir o Jogo da Velha](https://jogo-da-velha-react-one.vercel.app/)
