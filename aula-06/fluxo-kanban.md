# Fluxo de trabalho e Kanban

## Colunas do quadro

O [Project da Aula 06](https://github.com/users/joaosouza73/projects/2) acompanha as issues nestas etapas:

| Coluna | Quando usar |
|---|---|
| **Backlog** | Item conhecido, ainda sem compromisso para a Sprint atual. |
| **Ready** | Item priorizado, compreendido e selecionado para execução. |
| **In progress** | Alguém iniciou o trabalho na branch da issue. Limite sugerido: 3 cartões. |
| **In review** | Pull request aberto e aguardando revisão. Limite sugerido: 5 cartões. |
| **Done** | Critérios atendidos, revisão concluída e mudança integrada. |

Se uma coluna de trabalho atingir o limite, a equipe ajuda a concluir ou revisar itens existentes antes de iniciar outros. Impedimentos devem ser registrados na issue e comunicados no encontro diário.

## Branches

- `main` contém somente incrementos integrados e apresentáveis.
- Cada issue é desenvolvida em branch própria, criada a partir da `main` atualizada.
- Padrão: `feature/numero-resumo`, `fix/numero-resumo` ou `docs/numero-resumo`.
- Exemplo: `feature/4-cadastro-atividades`.
- Commits devem descrever a mudança realizada; alterações diferentes devem ficar em commits separados quando isso facilitar a revisão.

## Pull requests e integração

1. Abrir pull request para `main` e relacionar a issue com `Closes #numero` quando o trabalho estiver completo.
2. Resumir o que mudou e como a pessoa revisora pode conferir.
3. Pedir revisão de outro integrante e responder aos apontamentos.
4. Integrar somente depois da revisão e da conferência dos critérios de aceite.
5. Apagar a branch após a integração quando não houver motivo para mantê-la.

O grupo deve evitar duas pessoas alterando o mesmo trecho ao mesmo tempo sem combinar. Dependências entre tarefas devem ser anotadas na issue.
