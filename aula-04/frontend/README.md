# Interface de data e hora — Aula 04

Página estática que consulta `GET /api/data-hora` da API Express e atualiza o horário a cada 30 segundos.

Antes de abrir a página, ajuste `apiBaseUrl` em `config.js`. Localmente o valor padrão é `http://localhost:3000`; em produção, use a URL da API publicada.

Para desenvolvimento local, com a API ligada em outro terminal:

```sh
python -m http.server 5173
```


