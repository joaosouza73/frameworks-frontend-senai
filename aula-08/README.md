# React em prática

Aplicação de estudo em React com um catálogo interativo dos principais conceitos vistos na Aula 08. Cada tema tem uma explicação, um exemplo de código e uma proposta curta para praticar.

## Funcionalidades

- Busca por título, descrição, categoria e conteúdo.
- Filtros por tema, com a quantidade de conceitos em cada categoria.
- Cartões reutilizáveis com detalhes, exemplo de código e atividade prática.
- Marcação de temas estudados com progresso salvo no armazenamento local do navegador.
- Contador interativo para observar a atualização da interface a partir do estado.
- Mensagem contextual quando a busca ou os filtros não encontram resultados.
- Layout adaptável a celular e desktop, com navegação por teclado e controles rotulados.

## Conceitos de React utilizados

| Conceito | Onde aparece |
|---|---|
| JSX | Estrutura declarativa da interface nos componentes. |
| Componentes | Cabeçalho, filtros, busca, cartões, detalhes, progresso e laboratório separados em arquivos. |
| Props | Dados e funções enviados do componente `App` para os componentes filhos. |
| DOM e Virtual DOM | O laboratório altera o estado do contador e apresenta a atualização coordenada pelo React. |
| Listas e `key` | Categorias e conceitos são apresentados com `map()` e identificadores estáveis. |
| `filter()` e `map()` | Busca e categorias selecionam conceitos antes de gerar os cartões. |
| Renderização condicional | Detalhes do tema selecionado e mensagem para uma busca sem resultados. |
| Estado | Busca, filtro, tema selecionado, contador e progresso de estudo. |

## Executar localmente

Requisitos: Node.js e npm.

```bash
npm install
npm run dev
```

O terminal informa o endereço local para abrir no navegador.

## Outros comandos

```bash
npm run build
npm run preview
npm run lint
```

## Estrutura

```text
aula-08/
├── index.html
├── package.json
├── src/
│   ├── components/
│   ├── data/concepts.js
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
└── vite.config.js
```

O projeto faz parte das atividades da disciplina de Frameworks Front-end e apresenta os conceitos em uma interface que pode ser explorada e modificada durante os estudos.
