# Aula 05 — Criando APIs para o front-end

## Entrega

Aplicação de notas com operações CRUD. O back-end Express expõe uma API REST, persiste as notas em JSON e aceita chamadas do front-end React. A pasta `postman/` contém uma coleção importável com as requisições e os códigos de resposta descritos.

## Estrutura

```text
aula-05/
├── notas-api/
│   ├── data/notes.json
│   ├── src/routes/notes.routes.js
│   ├── src/storage/notes.repository.js
│   └── server.js
├── notas-frontend/
│   └── src/
│       ├── api.js
│       ├── App.jsx
│       ├── main.jsx
│       └── style.css
└── postman/notas-api.postman_collection.json
```

O servidor, as rotas, a persistência e a interface ficam em arquivos separados para deixar cada parte mais simples de compreender e alterar.

## Executar localmente

Requer Node.js 18 ou superior.

**Terminal 1 — API:**

```powershell
cd aula-05/notas-api
npm install
npm run dev
```

A API fica disponível em `http://localhost:3000`.

**Terminal 2 — front-end:**

```powershell
cd aula-05/notas-frontend
npm install
$env:VITE_API_URL = "http://localhost:3000"
npm run dev
```

Abra o endereço local mostrado pelo Vite. Sem `VITE_API_URL`, o front-end usa `http://localhost:3000`.

## Rotas da API

A URL base local é `http://localhost:3000`.

| Método e endpoint | Descrição | Respostas |
|---|---|---|
| `GET /api/notes` | Lista as notas, mais recentes primeiro. | `200 OK` — array JSON, inclusive `[]` quando vazio. |
| `POST /api/notes` | Cria uma nota. Requer `titulo` e `texto`. | `201 Created` — nota criada; `400 Bad Request` — dados inválidos. |
| `GET /api/notes/:id` | Consulta uma nota pelo UUID. | `200 OK` — nota encontrada; `404 Not Found` — ID desconhecido. |
| `PUT /api/notes/:id` | Atualiza título e texto da nota. Requer os dois campos. | `200 OK` — nota atualizada; `400 Bad Request` — dados inválidos; `404 Not Found` — ID desconhecido. |
| `DELETE /api/notes/:id` | Remove a nota pelo UUID. | `204 No Content` — removida; `404 Not Found` — ID desconhecido. |

Exemplo de corpo para `POST` e `PUT`:

```json
{
  "titulo": "Ideia para o projeto",
  "texto": "Anotar os próximos passos e organizar as referências."
}
```

O título aceita até 120 caracteres; o texto, até 5.000. Cada registro inclui `id`, `criadoEm` e `atualizadoEm`, em ISO 8601. O servidor limita o corpo HTTP a 12 KB.

## Coleção Postman

Importe [`postman/notas-api.postman_collection.json`](./postman/notas-api.postman_collection.json) em **Import > File**. A variável `base_url` vem preenchida para uso local. Para usar uma API publicada, altere-a para a URL do serviço. Execute **Criar nota**, copie o `id` da resposta para `noteId` e use esse valor nas requisições de detalhe, atualização e exclusão. A coleção descreve as respostas esperadas e os erros por operação.

## Publicação

As duas pastas são projetos distintos dentro deste repositório; cada plataforma pode apontar para a pasta correspondente.

**Render — API:** crie um Web Service usando este repositório e defina Root Directory como `aula-05/notas-api`. Use `npm install` no Build Command e `npm start` no Start Command. Configure `ALLOWED_ORIGINS` com a origem HTTPS do front-end Vercel depois de criar o domínio. O servidor já usa a variável `PORT` fornecida pelo ambiente.

**Vercel — front-end:** importe o mesmo repositório como outro projeto e defina Root Directory como `aula-05/notas-frontend`. Use `npm run build` como Build Command, `dist` como Output Directory e defina `VITE_API_URL` com a URL base do serviço Render. Publique o front-end depois de ajustar a configuração da API; então atualize `ALLOWED_ORIGINS` no Render com a URL Vercel final.

O arquivo JSON atende à atividade local e a uma demonstração simples. Em hospedagem, confirme que o armazenamento de arquivos do serviço é persistente antes de usar a aplicação com dados que precisam sobreviver a reinicializações. Se houver um volume persistente, `NOTES_FILE` pode apontar para o caminho montado. A API não tem login ou separação de notas por usuário; use somente conteúdo de demonstração enquanto não houver autenticação e autorização.

## Questões para refletir

**Quais são os riscos de segurança e como reduzi-los?** A API aceita operações de escrita sem autenticação e não separa dados por pessoa. Qualquer cliente que alcance o endpoint pode ler, alterar ou apagar todas as notas. CORS restringe quais páginas de navegador podem ler respostas; não autentica chamadas e não impede o uso de outros clientes HTTP. Para produção, implemente autenticação e autorização por usuário, valide o conteúdo no servidor, use HTTPS, limite tentativas, monitore erros e evite guardar dados pessoais sem necessidade. React escapa texto ao renderizar, mas a validação do servidor continua necessária.

**JSON é uma boa opção para produção?** É simples, legível, não exige serviço de banco e funciona para um exercício local de pequeno volume. Conforme a aplicação cresce, faltam consultas eficientes, transações e controles adequados para concorrência e recuperação. Um banco de dados é mais apropriado para acesso multiusuário e operação persistente.

**O que muda com 10.000 notas?** Cada leitura carrega e interpreta o arquivo inteiro; cada escrita percorre e grava o conjunto completo. O uso de memória, o tempo de resposta e o volume de I/O crescem com os registros. A fila de gravação organiza escritas dentro de um processo, mas não sincroniza várias instâncias do servidor. Uma base de dados com índices e transações é uma evolução adequada.

**Por que não concentrar tudo em `server.js`?** Misturar transporte HTTP, validação, regra de negócio e arquivos dificulta encontrar falhas e evoluir partes sem afetar as demais. Aqui `server.js` configura servidor e middlewares, `src/routes/notes.routes.js` trata HTTP e valida entradas, e `src/storage/notes.repository.js` concentra o acesso ao JSON. O cliente HTTP fica em `notas-frontend/src/api.js` e os estados da interface ficam em `App.jsx`.

## Links e registro

O repositório da disciplina está em [frameworks-frontend-senai](https://github.com/joaosouza73/frameworks-frontend-senai). Depois de importar a coleção, use **Share** no Postman para gerar um link de compartilhamento. Os links do Render e da Vercel e as capturas da API, da interface e dos painéis devem ser adicionados depois que os serviços forem criados e publicados nas contas de hospedagem.
