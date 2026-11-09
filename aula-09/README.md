# Caderno Aberto

Aplicação React para descobrir e compartilhar pequenas ideias. A biblioteca consulta publicações em uma API, abre cada texto em uma rota própria e oferece um formulário controlado para demonstrar o envio de dados.

## Funcionalidades

- Listagem de publicações carregadas da API com estados de carregamento e erro.
- Busca controlada por título e conteúdo.
- Detalhes de cada publicação por parâmetro na URL.
- Leitura dos comentários associados ao artigo.
- Formulário controlado com validação de título e texto.
- Envio de publicação via POST com confirmação da resposta.
- Página Sobre com a explicação dos fluxos e da API.
- Navegação entre páginas sem recarregar o documento.
- Layout adaptável a telas menores e componentes acessíveis por teclado.

## Conceitos de React da Aula 09

| Conceito | Aplicação no projeto |
|---|---|
| `useState` | Busca, publicações, estado de carregamento/erro e valores do formulário. |
| Formulários controlados | Título e texto usam `value` e `onChange`; o envio usa `onSubmit` e `preventDefault()`. |
| Validação | O formulário verifica os campos antes de chamar a API e associa mensagens aos controles. |
| `useEffect` | Carrega publicações e comentários e sincroniza o título da aba com a rota. |
| Limpeza de efeitos | `AbortController` interrompe requisições quando a rota muda ou a tela é desmontada. |
| Consumo de API | `fetch`, verificação de `response.ok`, leitura de JSON e tratamento de falhas de rede. |
| POST | O formulário envia título, texto e identificador de demonstração no corpo JSON. |
| React Router | Rotas para biblioteca, detalhe (`/publicacoes/:postId`), nova publicação e sobre. |
| `useParams` | O detalhe lê `postId` da URL e consulta o artigo e seus comentários. |
| Renderização condicional | Carregamento, erro, lista, busca vazia, validação e confirmação. |

## Executar localmente

Requisitos: Node.js compatível com Vite e npm.

```bash
npm install
npm run dev
```

O Vite informa no terminal o endereço local da aplicação.

## Comandos disponíveis

```bash
npm run build
npm run preview
npm run lint
```

## API e configuração

O projeto usa [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para buscar publicações e comentários e demonstrar o envio de uma publicação. A API simula a criação no POST, mas não persiste o novo conteúdo; por isso a interface avisa sobre esse comportamento. Não envie informações pessoais.

Para usar outro serviço compatível, defina `VITE_API_BASE_URL` no arquivo `.env` com a URL base da API. Consulte [.env.example](./.env.example). Não coloque chaves secretas em variáveis `VITE_`: elas ficam disponíveis no navegador.

## Rotas

| Caminho | Página |
|---|---|
| `/` | Biblioteca de publicações |
| `/publicacoes/:postId` | Artigo e comentários |
| `/nova-publicacao` | Formulário de envio |
| `/sobre` | Explicação do projeto |

## Tecnologias

- React
- Vite
- React Router
- JavaScript
- CSS
- Fetch API
