# Ritmo — Angular

Versão Angular da agenda acadêmica da Aula 03. O app usa componentes standalone, TypeScript, signals para estado e eventos `@Input`/`@Output` entre os componentes.

## Executar

Requer Node.js e npm.

```bash
npm install
npm start
```

Para validar o pacote de produção, execute `npm run build`.

## Dados

As atividades ficam no `localStorage` deste navegador, na chave `ritmo-agenda-angular-v1`. Elas não são enviadas para uma API nem sincronizadas entre dispositivos.
