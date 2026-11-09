# Aula 04 — Consumindo APIs no front-end

## Atividade 01 — Projetos analisados

Os dez repositórios foram clonados localmente para análise. A identificação da tecnologia e das APIs abaixo foi conferida nos arquivos README de cada projeto; cada link leva ao repositório original.

| Projeto | Framework / tecnologias de interface | API consumida | Observação da análise |
|---|---|---|---|
| [weather-app](https://github.com/EstherSlabbert/weather-app) | React, Vite | Open-Meteo Forecast e geocode.maps.co | Consulta previsão e converte coordenadas em nome de localidade. O README menciona chave para geocodificação. |
| [react-weather-app](https://github.com/Adedoyin-Emmanuel/react-weather-app) | React, Bootstrap, jQuery AJAX | API de clima (provedor não especificado no README) | O README declara uso de AJAX para consultar clima; é necessário conferir a configuração da aplicação para identificar o provedor. |
| [React-Weather-App](https://github.com/fshoja/React-Weather-App) | React, Vite | Open-Meteo | Busca clima por cidade, sem chave declarada no README. |
| [weatherApp](https://github.com/localBox0/weatherApp) | React, TypeScript, Sass | OpenWeatherMap, Open-Meteo e Geo-RapidAPI | Usa geocodificação para cidade, condições atuais e previsão estendida. Algumas consultas exigem credenciais. |
| [weather-dashboard](https://github.com/emilly-ksalmeida/weather-dashboard) | React, TypeScript, Vite, shadcn/ui | Open-Meteo | Reúne previsão, qualidade do ar e mapa interativo. |
| [weather-lite](https://github.com/riseansmal/weather-lite) | Next.js 15, React, TypeScript | Open-Meteo e geocodificação | O README descreve cliente de clima e rota proxy no servidor Next.js. |
| [angular-17-crud-example](https://github.com/bezkoder/angular-17-crud-example) | Angular 17 | Web API REST de tutoriais | Demonstra operações de leitura, criação, edição, remoção e busca. O provedor pode ser configurado como backend de exemplo. |
| [iris-sample-rest-angular](https://github.com/intersystems-ib/iris-sample-rest-angular) | Angular 8, Angular Material | REST API do InterSystems IRIS | O front-end lista e edita dados de catálogo por interfaces REST que retornam JSON. |
| [SpringBoot-Angular-EmployeeManagerApp](https://github.com/radualexandrub/SpringBoot-Angular-EmployeeManagerApp) | Angular | REST API Spring Boot | O README documenta endpoints GET, POST, PUT e DELETE para funcionários. |
| [vue-movie-search-app](https://github.com/lihuicham/vue-movie-search-app) | Vue 3 | The Movie Database (TMDB) API v3 | Pesquisa filmes, exibe detalhes e carrega imagens por endpoints da API. |

### Como reproduzir a pesquisa

Os repositórios foram clonados com `git clone --depth 1` durante a análise. Para abrir um projeto, use o link da tabela e siga as instruções do respectivo README. Projetos que consultam serviços protegidos podem exigir uma chave própria; não compartilhe chaves no GitHub.

## Atividade 02 — API de data e hora

A pasta `api/` contém um servidor Express com `GET /api/data-hora`, que devolve data e hora no padrão ISO 8601, em UTC, além do timestamp. A pasta `frontend/` contém uma página que consulta esse endpoint, apresenta data e hora e atualiza a cada 30 segundos.

### Executar localmente

Em um terminal:

```powershell
cd aula-04/api
npm install
npm run dev
```

Em outro terminal, sirva os arquivos estáticos do front-end, por exemplo:

```powershell
cd aula-04/frontend
python -m http.server 5173
```

A página pode então ser aberta no http://localhost:5173. A API ficará em `http://localhost:3000`. Para validar a resposta diretamente, acesse `http://localhost:3000/api/data-hora`.

### Publicar em serviços separados

O Render e a Vercel precisam ser conectados a repositórios/projetos nas contas correspondentes. Esta cópia reúne a atividade no repositório da disciplina; ela não cria por si só os dois repositórios separados pedidos no PDF.

**API no Render:** crie um serviço Node apontando para `aula-04/api`; use `npm install` como comando de build e `npm start` como comando de início. O Render fornece a variável `PORT`. Depois do deploy, configure `ALLOWED_ORIGINS` com a URL do front-end publicado, sem barra final.

**Front-end na Vercel:** crie um projeto apontando para `aula-04/frontend` (ou importe a pasta como projeto). Atualize `config.js` para que `apiBaseUrl` seja a URL pública da API no Render, sem `/api/data-hora` no final, e publique novamente.

### Registro e evidências

O código-fonte está disponível nos arquivos `api/api.js`, `frontend/script.js` e `frontend/index.html`. Para completar o registro solicitado na aula, após os deploys, inclua capturas da resposta JSON, da tela publicada, do painel do Render e do painel da Vercel, além dos links dos dois repositórios e da aplicação. Os painéis e URLs públicos ainda dependem de criação e configuração nas contas de hospedagem.



