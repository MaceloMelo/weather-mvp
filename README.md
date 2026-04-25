# weather-mvp

MVP de previsao do tempo com **Vue 3**, **Vite**, **TypeScript**, **Tailwind CSS**, **Pinia** e **axios**, consumindo a API [OpenWeatherMap](https://openweathermap.org/api).

## Visao geral

O foco atual do produto e entregar uma Home de clima clara e responsiva, com:
- busca de local por texto (`cidade`, `cidade, UF, BR` ou `cidade, pais`);
- carregamento automatico do **primeiro resultado** retornado pela geocoding;
- exibicao de clima atual (hero + metricas);
- secao de previsao de 5 dias como placeholder visual.

## Navegacao inferior (contexto do produto)

A navegacao inferior segue o design Stitch com tres areas de produto:
- `Inicio`: panorama do clima atual no local selecionado (estado atual do MVP).
- `Previsao`: tendencia de clima por periodo (melhoria planejada).
- `Radar`: visualizacao espacial de chuva/nuvens/vento em mapa (melhoria planejada).

Hoje esses itens estao em estrutura de layout e serao evoluidos com rotas e telas dedicadas.

## Comecando rapido

### Pre-requisitos

- Node.js 18+ (recomendado LTS)

### Configuracao

1. Instale dependencias: `npm install`
2. Copie `.env.example` para `.env`
3. Defina `VITE_OPENWEATHER_API_KEY` com sua chave

### Executar localmente

1. Rode `npm run dev`
2. Abra a aplicacao no navegador
3. Busque um local para atualizar os cards de clima atual

## Scripts

| Comando | Descricao |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de producao |
| `npm run preview` | Preview do build |
| `npm run lint` | ESLint em `src/` |
| `npm run test` | Suite de testes (Vitest) |
| `npm run test:watch` | Testes em modo watch |
| `npm run test:coverage` | Testes com cobertura |

## Testes

Cobrimos principalmente:
- dominio e servicos (`tests/unit/*`);
- store (`tests/unit/weather-store.spec.ts`);
- componentes e integracao da Home (`tests/components/*`).

Comandos:
- `npm run test`
- `npm run test:watch`
- `npm run test:coverage`

Detalhes da estrategia: `[docs/testes/README.md](docs/testes/README.md)`.

## Estado atual do MVP

### Limitacoes

- Escopo de dados focado em **tempo atual**.
- `WeatherForecastStrip` ainda sem dados reais.
- Integracao OpenWeather client-side (quota/latencia da API publica).
- Sem persistencia de preferencias (cidade, unidade, idioma).
- Sem E2E e regressao visual automatizada.

### Seguranca

`VITE_*` expoe chave no bundle cliente. Para producao, considerar **proxy/BFF** para protecao da chave.

## Proximos passos recomendados

- Integrar endpoint de **previsao 5 dias** ao `WeatherForecastStrip`.
- Evoluir navegacao inferior com rotas e telas funcionais para `Inicio`, `Previsao` e `Radar`.
- Adicionar **proxy/BFF** para proteger chave e centralizar tratamento de erro/rate limit.
- Evoluir UX com preferencias de usuario (cidade favorita, unidade C/F, historico).
- Adicionar pipeline E2E e regressao visual.

## Documentacao

- Micro-tarefas: `[docs/micro-tasks](docs/micro-tasks)`
- Contratos: `[docs/contracts/README.md](docs/contracts/README.md)`
- Primitivos DS: `[docs/contracts/ds-primitives.md](docs/contracts/ds-primitives.md)`
- Testes: `[docs/testes/README.md](docs/testes/README.md)`
- Prompt base: `[docs/prompts/prompt-start.md](docs/prompts/prompt-start.md)`
- Design Stitch (SkyCast/Atmos): `[docs/design-stitch/skycast-9039746379022897621](docs/design-stitch/skycast-9039746379022897621)`
- Projeto UI: [https://stitch.withgoogle.com/projects/9039746379022897621](https://stitch.withgoogle.com/projects/9039746379022897621)

## Governanca e decisoes

- O trabalho foi conduzido por micro-tarefas documentadas em `docs/micro-tasks`.
- Decisoes de produto/arquitetura (Human Gates) ficam registradas nesses artefatos.
- Convencao de commits sugerida: mensagens claras em imperativo, por intencao logica.

## Registro de atividades do README

- Estrutura do README reorganizada para melhorar clareza de onboarding, status do MVP e roadmap.
- Navegacao inferior (`Inicio`, `Previsao`, `Radar`) documentada como evolucao funcional no contexto meteorologico.

