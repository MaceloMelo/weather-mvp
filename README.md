# weather-mvp

MVP de previsão do tempo com **Vue 3**, **Vite**, **TypeScript**, **Tailwind CSS**, **Pinia** e **axios**, usando a API [OpenWeatherMap](https://openweathermap.org/api).

## Pré-requisitos

- Node.js 18+ (recomendado LTS)

## Configuração

1. Instale dependências: `npm install`
2. Copie `.env.example` para `.env` e defina `VITE_OPENWEATHER_API_KEY` com sua chave.

## Scripts

| Comando | Descrição |
|--------|------------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | ESLint em `src/` |

## Uso

1. Execute `npm run dev`
2. Na página inicial, busque por cidade, `cidade, UF, BR` ou `cidade, país`
3. Clique em um resultado da lista para ver o tempo atual naquele ponto

## Documentação do projeto

- Micro-tarefas: [`docs/micro-tasks`](docs/micro-tasks) (inclui Stitch/Atmos em `05-stitch-design-system.md`, layout Home PT-BR em `06-stitch-home-layout-ptbr.md`, fundo por condição meteorológica em `07-weather-ambient-backgrounds.md`)
- Prompt de início: [`docs/prompts/prompt-start.md`](docs/prompts/prompt-start.md)
- Contratos de componentes: [`docs/contracts/README.md`](docs/contracts/README.md)
- Design system (Stitch — SkyCast / Atmos): artefatos e manifest em [`docs/design-stitch/skycast-9039746379022897621`](docs/design-stitch/skycast-9039746379022897621); tokens consumidos pelo Tailwind a partir de `atmos-design-tokens.json`
- Primitivos de UI (DS): [`docs/contracts/ds-primitives.md`](docs/contracts/ds-primitives.md)

## Segurança (MVP)

A chave é injetada no bundle do cliente (`VITE_*`). Para produção, avalie um **proxy/BFF** para não expor a chave no navegador (ver `docs/micro-tasks/02-api-and-store.md`).

---

## Commits — Conventional Commits

Todo commit que afeta este app deve seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>[escopo opcional]: <descrição curta no imperativo>

[corpo opcional]

[rodapé opcional: BREAKING CHANGE, refs, etc.]
```

### Tipos usuais

| Tipo | Quando usar |
|------|----------------|
| `feat` | Nova funcionalidade visível ao usuário (ex.: fluxo de busca). |
| `fix` | Correção de bug. |
| `docs` | Apenas documentação (`docs/`, README). |
| `style` | Formatação/estilo sem mudar lógica (Prettier, espaços). |
| `refactor` | Refatoração sem alterar comportamento externo. |
| `test` | Inclusão ou ajuste de testes. |
| `chore` | Tarefas de build, dependências, CI, configs. |
| `perf` | Melhoria de desempenho. |

### Escopo sugerido para este MVP

Use escopo quando ajudar a filtrar histórico, por exemplo: `feat(weather): adiciona lista de resultados`, `docs(weather-mvp): atualiza README`, `chore(weather-mvp): ajusta eslint`.

### Regras práticas

- Descrição em **imperativo** (“adiciona”, “corrige”), não passado (“adicionado”).
- Um commit por intenção lógica; evite misturar `feat` e `docs` grandes no mesmo commit quando puder separar.
- **Breaking change:** indique no rodapé `BREAKING CHANGE:` ou use `!` após o tipo, conforme a especificação.

---

## Como a IA ajudou a criar e executar o projeto

Referência de processo: [`docs/prompts/prompt-start.md`](docs/prompts/prompt-start.md) (papel, objetivo, stack, microtarefas, contratos, revisão humana).

| Área | Contribuição típica da IA |
|------|-----------------------------|
| **Planejamento** | Decomposição em fases P0–P3 e microtarefas rastreáveis (`docs/micro-tasks/01-setup-stack.md` … `04-quality-and-release.md`), com critérios de aceite. |
| **Stack e base** | Scaffold Vite + Vue 3 + TypeScript, Tailwind, Pinia, axios e cliente HTTP com timeout, conforme checklists P0. |
| **Domínio e API** | Tipos (`GeoLocation`, `CurrentWeatherView`), serviço OpenWeather (geocoding + tempo atual), tratamento de erros e variável `VITE_OPENWEATHER_API_KEY` documentada em `.env.example`. |
| **Estado** | Store Pinia `useWeatherStore` alinhada aos contratos em `docs/contracts/README.md`. |
| **UI e acessibilidade** | Componentes `WeatherSearchBar`, blocos Stitch (`WeatherHeroSection`, métricas), orquestração em `HomeView`, estados de loading/erro/vazio; primeiro resultado da geocoding aplicado automaticamente. |
| **Documentação** | Contratos em tabelas, orientações de query `q`, human gates nas microtarefas de API e UI. |
| **Qualidade** | Apoio a ESLint, scripts `lint`/`build`, README na raiz do repositório apontando para `weather-mvp` e `docs/`. |

A execução seguiu o espírito do prompt de início: **etapas**, **prioridades**, **resultados esperados** em Markdown e **contratos** entre partes da aplicação.

---

## Onde a decisão humana foi necessária

Alguns pontos ficam **fora da automação segura** ou exigem **validação de produto/negócio**; a IA documenta opções, mas quem decide é a pessoa.

| Tema | Por que precisa de humano |
|------|-----------------------------|
| **Chave da API no cliente (Vite)** | `VITE_*` expõe a chave no bundle do navegador. Aceitável para curso/MVP; em produção pública costuma exigir **BFF/proxy** — decisão de arquitetura e risco. |
| **Plano gratuito e termos OpenWeather** | Cotas, uso comercial e limites dependem da conta e do contrato; não cabe à IA “aprovar” escala de tráfego. |
| **Escopo de endpoints** | MVP limitado a **tempo atual**; incluir previsão horária/diária é mudança de escopo. |
| **Idioma e UX** | Confirmação de **pt-BR** na UI e `lang=pt_br` na API; textos de produto e tom. |
| **Formato de busca** | Convenção `Cidade, UF, BR`; ambiguidade usa o **primeiro** retorno da API (sem lista na UI) — alinhamento com expectativa do usuário final. |
| **`limit` da geocoding** | Valor fixo (ex.: 8 resultados); apenas o primeiro é usado na UI atual — paginação ou escolha explícita seria mudança de produto. |
| **Revisão de prompts e plano** | Critérios do `prompt-start.md` pedem **revisão humana** em decisões importantes (stack, segurança, escopo). |

Detalhamento adicional: seções **Human Gate** em `docs/micro-tasks/02-api-and-store.md` e `docs/micro-tasks/03-ui-components.md`.

---

## Registro de atividades (README do app)

- [x] Incluir **Conventional Commits**, **papel da IA** e **decisões humanas** neste README (fonte principal para governança do MVP).
- [x] Corrigir links da documentação para a pasta `docs/` dentro de `weather-mvp`.
- **US / rastreio:** solicitação em chat para que o README atualizado seja o `weather-mvp/README.md` (em vez de concentrar só em `docs/contracts/README.md`).
- [x] Integração **Stitch / Atmos** (SkyCast): artefatos em `docs/design-stitch/`, tokens no Tailwind, primitivos `DsGlassCard` / `DsButton`, UI de tempo migrada; micro-tarefas `05-stitch-design-system.md` e prompt `docs/prompts/prompt-2026-04-24-stitch-design-system.md`.
- [x] **US (chat):** cidade padrão **Aracaju, Sergipe, BR** na store e busca ao abrir a Home; geocoding usa sempre o **primeiro** resultado (sem lista “Resultados”); `LocationResultsList` removido; docs `02`–`04`, `contracts` e este README alinhados.
- [x] **US (chat — 2026-04-24):** fundo da Home varia com o tempo (**padrão / sol / nublado / chuva**) conforme Stitch (`node-id` documentados em `docs/micro-tasks/07-weather-ambient-backgrounds.md`); layout do conteúdo inalterado; prompt em `docs/prompts/prompt-2026-04-24-stitch-weather-ambient.md`.
