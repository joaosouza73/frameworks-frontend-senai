# Front-end de notas

Interface em React que consome a API Express da atividade.

## Requisitos

Node.js 20.19+ ou 22.12+ (Vite 8).

## Executar localmente

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

A configuração inicial aponta para `http://localhost:3000`. Para usar outra API, altere `VITE_API_URL` no `.env.local`. Variáveis `VITE_` são incluídas no código enviado ao navegador; não coloque segredos nelas.

## Gerar a versão de publicação

```sh
npm run build
npm run preview
```

Os arquivos gerados ficam em `dist/`.
