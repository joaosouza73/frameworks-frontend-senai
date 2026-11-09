# API de data e hora — Aula 04

API REST didática com Express. O endpoint `GET /api/data-hora` responde em JSON com a data e hora atuais em UTC e o timestamp Unix em milissegundos.

## Executar

```sh
npm install
npm run dev
```

O servidor usa `PORT` do ambiente ou a porta `3000` localmente. Para restringir CORS em produção, defina `ALLOWED_ORIGINS` com a URL do site consumidor. Separe múltiplas origens por vírgula.

## Rotas

- `GET /` — mensagem de apresentação e nome do endpoint.
- `GET /api/data-hora` — data/hora ISO 8601, fuso e timestamp.
