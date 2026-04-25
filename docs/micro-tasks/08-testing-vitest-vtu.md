# Micro-tarefas — Testes web com Vitest + Vue Test Utils

**US / rastreio:** **US-TEST-001** — Como equipe, queremos suíte de testes unitários e de componentes para garantir qualidade funcional, estabilidade de UI e redução de regressões.

## Human Gates — revisão humana obrigatória

1. **HG-01 (Arquitetura de cobertura):** definir cobertura mínima exigida no CI (`global` vs `por diretório`).
2. **HG-02 (Contrato público de componentes):** aprovar previamente qualquer alteração de `props`, `emits` ou slots para melhorar testabilidade.
3. **HG-03 (Design system):** validar com responsável de UI/Design qualquer ajuste visual/estrutural em componentes DS.

## Checklist de execução

- [x] **MT-TEST-01:** Configurar Vitest + Vue Test Utils + cobertura (`vitest.config.ts`, `tests/setup.ts`, scripts em `package.json`, smoke test).
  - **Critério de aceite:** `npm run test` executa sem erro com suíte inicial.
- [x] **MT-TEST-02:** Criar padrão de utilitários/mocks (`tests/utils/*`) e fixtures (`tests/fixtures/*`) para reduzir duplicação.
  - **Critério de aceite:** helpers reutilizados por testes unitários e de componentes.
- [x] **MT-TEST-03:** Cobrir lógica pura e serviço OpenWeather com cenários green/red (`tests/unit/weather-ambient.spec.ts`, `tests/unit/openweather.spec.ts`).
  - **Critério de aceite:** regras de ambientação, parsing de erros, mapeamentos e chamadas HTTP validados.
- [x] **MT-TEST-04:** Cobrir store Pinia `weather` com cenários de sucesso, vazio, sem match e erro (`tests/unit/weather-store.spec.ts`).
  - **Critério de aceite:** contrato de estado preservado (`loading`, `error`, `selected`, `current`, `noGeocodeMatch`).
- [x] **MT-TEST-05:** Cobrir componentes `ds/*`, `weather/*` e `HomeView` com montagem/interação/contratos (`tests/components/*.spec.ts`).
  - **Critério de aceite:** props, emits, render condicional e interações principais validados.
- [x] **MT-TEST-06:** Documentar micro-tarefa em `docs/micro-tasks` (este arquivo) com checklist + rastreabilidade US.
  - **Critério de aceite:** documentação completa e auditável.
- [x] **MT-TEST-07:** Rodar quality gate final (`npm run lint`, `npm run test`, `npm run test:coverage`) e registrar riscos pendentes.
  - **Critério de aceite:** zero erros novos e riscos/documentação consolidados.
- [x] **MT-TEST-08:** Documentar visão consolidada de testes em `docs/testes` e atualizar `README.md` com seção de testes e comandos.
  - **Critério de aceite:** documentação funcional disponível e README apontando execução/escopo de testes.

## Registro de atividades

- [x] 2026-04-25: Instalação de `vitest`, `@vue/test-utils`, `@vitest/coverage-v8`, `jsdom`; criação de scripts de teste/cobertura.
- [x] 2026-04-25: Criação de base de testes (`vitest.config.ts`, `tests/setup.ts`, `tests/smoke.spec.ts`).
- [x] 2026-04-25: Criação de utilitários reutilizáveis (`tests/utils/pinia.ts`, `tests/utils/mount.ts`, `tests/utils/openweather-mocks.ts`) e fixtures (`tests/fixtures/weather.ts`).
- [x] 2026-04-25: Implementação de testes unitários para domínio/serviços/store (cenários green e red).
- [x] 2026-04-25: Implementação de testes de componentes DS, Weather e integração da `HomeView`.
- [x] 2026-04-25: Quality gate final executado (`lint`, `test`, `test:coverage`) com sucesso: 36 testes passando e cobertura geral de linhas em 92.85%.
- [x] 2026-04-25: Resumo do prompt da entrega registrado em `docs/prompts/prompt-2026-04-25-testing-vitest-vtu.md`.
- [x] 2026-04-25: Criada documentação central de testes em `docs/testes/README.md` e README do projeto atualizado com seção de testes e comandos de execução.

## Riscos e pendências mapeadas

- **Risco residual (cobertura de ramos):** `src/services/openweather.ts` ainda possui ramos não cobertos (principalmente variações de erro menos frequentes).
- **Risco residual (fluxo visual real):** integração visual completa de `HomeView` usa stubs nos componentes filhos; para validar visual real fim-a-fim, recomenda-se E2E complementar.

## Resultado esperado

Base de testes automatizados pronta para evolução contínua, com cobertura de cenários positivos/negativos, contratos de componentes preservados e documentação rastreável à US-TEST-001.
