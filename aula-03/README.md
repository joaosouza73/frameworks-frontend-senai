# Aula 03 — Projetos com Frameworks Front-end

## Tema: organização de atividades acadêmicas

O **Ritmo** reúne tarefas de diferentes disciplinas em uma agenda simples. As quatro versões foram desenvolvidas para apresentar a mesma ideia e permitir comparar a estrutura e as ferramentas de cada tecnologia.

## Entregas

| Projeto | Pasta | Tecnologia | Organização da interface |
|---|---|---|---|
| 01 | [`react-agenda`](./react-agenda/) | React e Vite | Componentes funcionais, props, hooks e estado local. |
| 02 | [`vue-agenda`](./vue-agenda/) | Vue e Vite | Single-File Components, Composition API, `ref`, `computed` e eventos. |
| 03 | [`angular-agenda`](./angular-agenda/) | Angular | Componentes standalone, templates, `@Input`, `@Output` e signals. |
| 04 | [`next-agenda`](./next-agenda/) | Next.js e React | App Router, layout, metadados e componentes cliente. |
| 05 | [`projeto-05-copia`](./projeto-05-copia/) | React e Vite | Cópia de uma aplicação pública de tarefas, com fonte e licença preservadas. |

## Funcionalidades das quatro versões Ritmo

- Criar atividade com título, disciplina e prazo opcional.
- Marcar atividade como concluída e reabri-la.
- Excluir atividade.
- Filtrar todas, em andamento ou concluídas.
- Ver a quantidade de atividades abertas e concluídas.
- Manter os dados no armazenamento local do navegador.
- Layout adaptável para telas menores e controles com rótulos acessíveis.

Cada implementação usa uma chave de armazenamento própria, para que uma versão não altere os dados de outra.

## Executar cada versão

Instale [Node.js](https://nodejs.org/) e npm. Em cada pasta de aplicação, execute:

```bash
npm install
npm run dev
```

Para gerar a versão de produção, use `npm run build`. No Angular, o comando de desenvolvimento é `npm start`; o build usa `npm run build`.

Pastas e portas padrão:

| Projeto | Diretório | Endereço local padrão |
|---|---|---|
| React | `react-agenda` | `http://localhost:5173` |
| Vue | `vue-agenda` | `http://localhost:5173` |
| Angular | `angular-agenda` | `http://localhost:4200` |
| Next.js | `next-agenda` | `http://localhost:3000` |

Se mais de um servidor estiver ativo ao mesmo tempo, a ferramenta escolhe outra porta quando a padrão está ocupada.

## Comparação breve

| Tecnologia | Estrutura usada | Observação durante o desenvolvimento |
|---|---|---|
| React | Biblioteca de interface e Vite para o ambiente do projeto. | Estado e efeitos são explícitos nos componentes; a composição com componentes menores fica a cargo da aplicação. |
| Vue | Framework progressivo e Vite, com arquivos `.vue`. | Template, lógica e eventos ficam reunidos em Single-File Components; `computed` deriva filtros e contadores. |
| Angular | Framework com CLI, TypeScript e componentes standalone. | Templates, tipagem, injeção de dependências e ferramentas oficiais formam uma estrutura mais integrada. |
| Next.js | Framework React com App Router. | Organiza rotas e layout no sistema de arquivos e pode renderizar no servidor; esta agenda usa componentes cliente para interagir com `localStorage`. |

As quatro aplicações mantêm o mesmo fluxo, mas cada uma usa os padrões próprios da tecnologia correspondente.

## Projeto 05 — cópia pública

A pasta `projeto-05-copia` contém uma cópia do [react-todo-app de katarighe](https://github.com/katarighe/react-todo-app). O README original e a licença MIT estão mantidos junto aos arquivos do projeto. A origem e as instruções para executar a cópia estão em [`ORIGEM.md`](./projeto-05-copia/ORIGEM.md).

## Publicação e histórico

O repositório da disciplina mantém as cinco entregas nesta pasta da Aula 03. O enunciado também pede que cada projeto tenha seu próprio repositório GitHub; depois de criar esses repositórios, registre aqui os links correspondentes. A cópia pública mantém a atribuição e os termos da licença do projeto original.
