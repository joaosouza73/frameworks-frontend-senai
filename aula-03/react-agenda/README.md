# Ritmo — React

Versão React da agenda acadêmica da Aula 03. A interface é dividida em componentes e usa estado local para incluir, filtrar, concluir e excluir atividades.

## Executar

Requer Node.js e npm.

```bash
npm install
npm run dev
```

Para validar o pacote de produção, execute `npm run build`.

## Dados

As atividades ficam no `localStorage` deste navegador, na chave `ritmo-agenda-react-v1`. Elas não são enviadas para uma API nem sincronizadas entre dispositivos.
