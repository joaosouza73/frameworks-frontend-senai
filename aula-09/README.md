# Aula 09 — Caderno Aberto

Aplicação React para descobrir e compartilhar pequenas ideias. A biblioteca consulta publicações em uma API, abre cada texto em uma rota própria e oferece um formulário controlado para demonstrar o envio de dados.

## Funcionalidades

- Lista publicações consultadas na API e informa quando está carregando ou ocorre um erro.
- Busca publicações pelo título e pelo conteúdo.
- Abre uma publicação e seus comentários em uma rota com parâmetro.
- Valida título e texto antes de enviar uma nova publicação.
- Envia os campos pelo método POST e apresenta a resposta recebida.
- Inclui página Sobre com a explicação do fluxo e da API.
- Navega entre páginas sem recarregar o documento.
- Adapta a interface a telas menores e permite navegação por teclado.

## Conceitos da aula demonstrados

| Conceito | Onde aparece |
|---|---|
| `useState` | Busca, dados carregados, estados de requisição e campos do formulário. |
| Formulários controlados | `value` e `onChange` mantêm título e texto sincronizados com o estado. |
| `onSubmit` e `preventDefault()` | O React valida e envia o formulário sem recarregar a página. |
| Validação | Mensagens são associadas aos campos com erro antes do envio. |
| `useEffect` | Busca publicações e comentários e atualiza o título da aba conforme a rota. |
| Limpeza de efeitos | `AbortController` cancela a requisição quando a tela é desmontada ou a rota muda. |
| Consumo de API | `fetch`, verificação de `response.ok`, leitura de JSON e tratamento de falhas. |
| POST | O formulário envia título, texto e `userId` no corpo JSON. |
| React Router | Biblioteca, detalhe de publicação, formulário, página Sobre e rota não encontrada. |
| `useParams` | A página de leitura obtém `postId` da URL para consultar o artigo. |
| Renderização condicional | Carregamento, erro, resultado, busca vazia, validação e confirmação. |

## Requisitos

- Node.js compatível com a versão do Vite declarada em `package.json`.
- npm.
- Acesso à internet para consultar o JSONPlaceholder.

## Executar localmente

No terminal, entre na pasta da atividade, instale as dependências e inicie o servidor de desenvolvimento:

```bash
cd aula-09
npm install
npm run dev
```

O Vite mostra no terminal o endereço local para abrir no navegador.

## Comandos disponíveis

```bash
npm run dev      # inicia o servidor local
npm run build    # gera a versão de produção em dist/
npm run preview  # serve localmente a versão de produção
npm run lint     # verifica o código com ESLint
```

## Rotas

| Caminho | Conteúdo |
|---|---|
| `/` | Biblioteca e busca de publicações |
| `/publicacoes/:postId` | Artigo e comentários |
| `/nova-publicacao` | Formulário de envio |
| `/sobre` | Descrição do projeto e da API |
| Demais caminhos | Página não encontrada |

## API e envio de dados

O padrão é usar o [JSONPlaceholder](https://jsonplaceholder.typicode.com/), uma API pública de demonstração.

| Operação | Requisição |
|---|---|
| Listar publicações | `GET /posts?_limit=12` |
| Consultar publicação | `GET /posts/:postId` |
| Consultar comentários | `GET /posts/:postId/comments` |
| Enviar publicação | `POST /posts` |

O POST retorna uma resposta simulada e **não persiste a publicação no servidor**. A interface informa essa limitação antes do envio. Use somente conteúdo de demonstração e não envie dados pessoais.

Para apontar a aplicação a outra API compatível, crie um arquivo `.env` nesta pasta e defina `VITE_API_BASE_URL`. O arquivo [.env.example](./.env.example) mostra o valor padrão. Variáveis com prefixo `VITE_` são expostas ao navegador; não coloque chaves secretas nelas.

## Estrutura do projeto

```text
aula-09/
├── src/
│   ├── components/   # layout compartilhado e estados da interface
│   ├── pages/        # biblioteca, artigo, formulário, sobre e 404
│   ├── services/     # chamadas HTTP da aplicação
│   ├── styles/       # estilos base, componentes e responsividade
│   ├── App.jsx       # rotas da aplicação
│   └── main.jsx      # inicialização do React
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Tecnologias

React, Vite, React Router, JavaScript, CSS e Fetch API.

## Referências

- [React Router](https://reactrouter.com/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
