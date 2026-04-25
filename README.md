# weather-mvp

MVP de previsão do tempo com **Vue 3**, **Vite**, **TypeScript**, **Tailwind CSS**, **Pinia** e **axios**, usando a API [OpenWeatherMap](https://openweathermap.org/api).

## Pré-requisitos

- Node.js 18+ (recomendado LTS)

## Configuração

1. Instale dependências: `npm install`
2. Copie `.env.example` para `.env` e defina `VITE_OPENWEATHER_API_KEY` com sua chave.

## Scripts


| Comando                 | Descrição                                 |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento               |
| `npm run build`         | Build de produção                         |
| `npm run preview`       | Preview do build                          |
| `npm run lint`          | ESLint em `src/`                          |
| `npm run test`          | Executa suíte de testes com Vitest        |
| `npm run test:watch`    | Executa testes em modo watch              |
| `npm run test:coverage` | Executa testes com relatório de cobertura |


## Uso

1. Execute `npm run dev`
2. Na página inicial, busque por cidade, `cidade, UF, BR` ou `cidade, país`
3. Clique em um resultado da lista para ver o tempo atual naquele ponto

## Testes

O projeto possui testes automatizados com **Vitest** + **Vue Test Utils**, cobrindo:

- lógica de domínio e serviços (`tests/unit/`*);
- store Pinia (`tests/unit/weather-store.spec.ts`);
- componentes de UI e integração da Home (`tests/components/*`).

### Execução de testes

- Rodar todos os testes: `npm run test`
- Rodar em modo desenvolvimento (watch): `npm run test:watch`
- Rodar com cobertura: `npm run test:coverage`

Documentação detalhada da estratégia e escopo de cobertura: `[docs/testes/README.md](docs/testes/README.md)`.

## Documentação do projeto

- Micro-tarefas: `[docs/micro-tasks](docs/micro-tasks)` (inclui Stitch/Atmos em `05-stitch-design-system.md`, layout Home PT-BR em `06-stitch-home-layout-ptbr.md`, fundo por condição meteorológica em `07-weather-ambient-backgrounds.md`)
- Prompt de início: `[docs/prompts/prompt-start.md](docs/prompts/prompt-start.md)`
- Testes (implementação, benefícios e cobertura): `[docs/testes/README.md](docs/testes/README.md)`
- Contratos de componentes: `[docs/contracts/README.md](docs/contracts/README.md)`
- Design system (Stitch — SkyCast / Atmos): artefatos e manifest em `[docs/design-stitch/skycast-9039746379022897621](docs/design-stitch/skycast-9039746379022897621)`; tokens consumidos pelo Tailwind a partir de `atmos-design-tokens.json`
- Primitivos de UI (DS): `[docs/contracts/ds-primitives.md](docs/contracts/ds-primitives.md)`
- Link do projeto UI: [https://stitch.withgoogle.com/projects/9039746379022897621](https://stitch.withgoogle.com/projects/9039746379022897621)

## Segurança (MVP)

A chave é injetada no bundle do cliente (`VITE_*`). Para produção, avalie um **proxy/BFF** para não expor a chave no navegador (ver `docs/micro-tasks/02-api-and-store.md`).

## Limitações atuais do projeto

- Escopo de dados ainda focado em **tempo atual**; a faixa de previsão de 5 dias está como placeholder visual.
- A integração com OpenWeather é client-side e depende de quota/latência da API pública.
- Não há persistência de preferências do usuário (cidade favorita, unidade, idioma) entre sessões.
- Navegação superior/inferior segue o layout Stitch, mas sem fluxo completo de rotas funcionais para todas as áreas.
- Cobertura de testes está focada em unidade e componentes principais; faltam testes E2E e validação visual automatizada.

## Próximos passos recomendados

- Implementar endpoint de **previsão 5 dias** e conectar a seção `WeatherForecastStrip` com dados reais.
- Adicionar **proxy/BFF** para proteger a chave da API e centralizar tratamento de erros/rate limit.
- Evoluir UX com preferências do usuário (salvar cidade, unidade C/F e histórico recente).
- Completar roteamento das seções de navegação (Início, Previsão, Radar) e suas telas.
- Incluir pipeline de qualidade com testes E2E e regressão visual para garantir fidelidade ao Stitch.

---

### Escopo sugerido para este MVP

Use escopo quando ajudar a filtrar histórico, por exemplo: `feat(weather): adiciona lista de resultados`, `docs(weather-mvp): atualiza README`, `chore(weather-mvp): ajusta eslint`.

### Regras práticas

- Descrição em **imperativo** (“adiciona”, “corrige”), não passado (“adicionado”).
- Um commit por intenção lógica; evite misturar `feat` e `docs` grandes no mesmo commit quando puder separar.
- **Breaking change:** indique no rodapé `BREAKING CHANGE:` ou use `!` após o tipo, conforme a especificação.

---

## Como a IA ajudou a criar e executar o projeto

Referência de processo: `[docs/prompts/prompt-start.md](docs/prompts/prompt-start.md)` (papel, objetivo, stack, microtarefas, contratos, revisão humana).


| Área                    | Contribuição típica da IA                                                                                                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Planejamento**        | Decomposição em microtarefas rastreáveis e incrementais, incluindo design system Stitch (`05`), layout Home PT-BR (`06`), ambient backgrounds (`07`) e suíte de testes com Vitest/VTU (`08`). |
| **Stack e base**        | Setup e evolução com Vue 3 + Vite + TypeScript + Tailwind + Pinia + axios, mantendo padrões de estrutura e contratos entre camadas.                                                           |
| **Domínio e API**       | Definição/ajuste de tipos (`GeoLocation`, `CurrentWeatherView`) e mapeamentos de OpenWeather para UI (tempo atual, visibilidade e nebulosidade), com mensagens de erro amigáveis.             |
| **Estado**              | Orquestração da `useWeatherStore` para busca, seleção de local, loading/erro e atualização de blocos da Home de forma consistente.                                                            |
| **UI e acessibilidade** | Componentização da Home no padrão Stitch (shell, hero, bento, métricas secundárias, forecast placeholder), uso de tokens Atmos e atributos de acessibilidade (`aria-`*, `sr-only`).           |
| **Documentação**        | Atualização contínua de contratos (`docs/contracts/`*), prompts e microtarefas, incluindo registro de Human Gates e decisões aplicadas no MVP.                                                |
| **Qualidade**           | Apoio à validação com `lint`, `build` e testes automatizados (`test`, `test:watch`, `test:coverage`), mantendo rastreabilidade técnica no README e em `docs/`.                                |


A execução seguiu o espírito do prompt de início: **etapas**, **prioridades**, **resultados esperados** em Markdown e **contratos** entre partes da aplicação.

---

## Onde a decisão humana foi necessária

Alguns pontos ficam **fora da automação segura** ou exigem **validação de produto/negócio**; a IA documenta opções, mas quem decide é a pessoa.


| Tema                                    | Por que precisa de humano                                                                                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Chave da API no cliente (Vite)**      | `VITE_`* expõe a chave no bundle do navegador. Aceitável para curso/MVP; em produção pública costuma exigir **BFF/proxy** — decisão de arquitetura e risco.   |
| **Plano gratuito e termos OpenWeather** | Cotas, uso comercial e limites dependem da conta e do contrato; não cabe à IA “aprovar” escala de tráfego.                                                    |
| **Escopo de endpoints**                 | MVP usa **tempo atual**; previsão de 5 dias permanece como placeholder visual até aprovação de escopo para novo endpoint/store.                               |
| **Métrica UV vs métrica disponível**    | O layout Stitch prevê UV; no MVP foi adotada nebulosidade (`clouds`) por disponibilidade imediata de dados, evitando ampliar escopo de API sem validação.     |
| **Idioma e UX**                         | Confirmação de **pt-BR** na UI e `lang=pt_br` na API; textos de produto e tom.                                                                                |
| **Formato de busca**                    | Convenção `Cidade, UF, BR` e fluxo de seleção por lista de resultados; regras de priorização e deduplicação ainda dependem de decisão de produto.             |
| **Top/Bottom navigation**               | As barras superior/inferior seguem o Stitch como casca visual; transformar em rotas funcionais exige definição de navegação e backlog das telas.              |
| **Imagem de fundo da Home**             | Definir política final de asset (host externo, arquivo versionado em `public/` ou gradiente-only) envolve licenciamento, performance e estratégia de release. |
| **Revisão de prompts e plano**          | Critérios do `prompt-start.md` pedem **revisão humana** em decisões importantes (stack, segurança, escopo).                                                   |


Detalhamento adicional: seções **Human Gate** em `docs/micro-tasks/02-api-and-store.md` e `docs/micro-tasks/03-ui-components.md`.

---

## Registro de atividades (README do app)

- Incluir **Conventional Commits**, **papel da IA** e **decisões humanas** neste README (fonte principal para governança do MVP).
- Corrigir links da documentação para a pasta `docs/` dentro de `weather-mvp`.
- **US / rastreio:** solicitação em chat para que o README atualizado seja o `weather-mvp/README.md` (em vez de concentrar só em `docs/contracts/README.md`).
- Integração **Stitch / Atmos** (SkyCast): artefatos em `docs/design-stitch/`, tokens no Tailwind, primitivos `DsGlassCard` / `DsButton`, UI de tempo migrada; micro-tarefas `05-stitch-design-system.md` e prompt `docs/prompts/prompt-2026-04-24-stitch-design-system.md`.
- **US (chat):** cidade padrão **Aracaju, Sergipe, BR** na store e busca ao abrir a Home; geocoding usa sempre o **primeiro** resultado (sem lista “Resultados”); `LocationResultsList` removido; docs `02`–`04`, `contracts` e este README alinhados.

