# API de notas

API REST de notas para a atividade da Aula 05. O serviço usa Express e armazena os registros em `data/notes.json`.

## Requisitos

Node.js 18 ou superior.

## Executar localmente

```sh
npm install
npm run dev
```

Por padrão, o servidor escuta em `http://localhost:3000`. A variável `PORT` é usada automaticamente no Render. `ALLOWED_ORIGINS` aceita uma lista de origens do front-end separadas por vírgula; em desenvolvimento, a API reflete a origem da requisição.

Consulte [a documentação da atividade](../README.md) e importe [a coleção Postman](../postman/notas-api.postman_collection.json).
