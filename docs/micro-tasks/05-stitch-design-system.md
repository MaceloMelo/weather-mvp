# Micro-tarefas — Design System Stitch (Atmos) no MVP tempo

**US / rastreio:** Implementar o design system **Atmos** do projeto Stitch *SkyCast Vue Dashboard* (`9039746379022897621`) no app **weather-mvp** (Vue 3 + Tailwind + Pinia + OpenWeather), preservando contratos dos componentes de tempo.

**Fonte de tokens:** `list_design_systems` + `get_project.designTheme`; artefatos locais em `docs/design-stitch/skycast-9039746379022897621/`.

## Checklist de execução

- [x] **MT-DS-01:** Resolver IDs Stitch — `get_project`, `list_screens`, `list_design_systems`; documentar que o DS é `DESIGN_SYSTEM_INSTANCE` (`assets/a33859fc5d9c4980bf6c8b72d8478dfc`), não linha em `list_screens`.
  - **Critério de aceite:** `stitch-resolution.json` descreve `assetName`, `canvasInstanceId` e telas de referência.
- [x] **MT-DS-02:** `get_screen` para tela de referência (`7a73087057444c87914a36c206cec98c` — Home) + metadados registrados no manifest.
  - **Critério de aceite:** URLs e títulos refletidos em `manifest.md`.
- [x] **MT-DS-03:** `curl -L` para PNG(s) e HTML de referência na pasta `docs/design-stitch/skycast-9039746379022897621/`.
  - **Critério de aceite:** arquivos `screen-home-7a730.png`, `screen-home-ptbr.png`, `screen-home-ptbr.html` presentes.
- [x] **MT-DS-04:** Export `atmos-design-tokens.json` + `tailwind.config.js` lendo o JSON (cores camelCase, spacing `atmos-*`, radius `atmos-*`, tipografia `atmos-*`, `bg-atmos-shell`).
  - **Critério de aceite:** `npm run build` e `npm run lint` sem erros.
- [x] **MT-DS-05:** Primitivos `DsGlassCard`, `DsButton` em `src/components/ds/` + utilitários `.atmos-glass-panel`, `.atmos-search-input` em `src/style.css`.
  - **Critério de aceite:** componentes usados pela UI de tempo sem quebrar props/emits existentes.
- [x] **MT-DS-06:** Migrar `WeatherSearchBar`, `LocationResultsList`, `WeatherCurrentCard`, `HomeView`, `App.vue` para tokens Atmos / glass.
  - **Critério de aceite:** contratos em `docs/contracts/README.md` (weather) inalterados; fonte Inter carregada em `index.html`.
- [x] **MT-DS-07:** Documentar primitivos DS em `docs/contracts/ds-primitives.md` e link no `docs/contracts/README.md`.
  - **Critério de aceite:** tabelas props alinhadas ao código.
- [x] **MT-DS-08:** Resumo do prompt em `docs/prompts/prompt-2026-04-24-stitch-design-system.md` + README atualizado com links Stitch/DS.

## Human Gates (registro)

- **ID da tela “Design System” no enunciado** era stub `asset-stub-*`; resolução oficial via `screenInstances` + asset `a33859fc5d9c4980bf6c8b72d8478dfc`.
- **Fidelidade 1:1:** MVP adota tokens + glassmorphism do Atmos; telas completas do dashboard SkyCast ficam fora de escopo desta US.
- **Fontes:** Inter via Google Fonts (CDN); produção pode exigir self-host — decisão de produto/performance.

## Resultado esperado

UI do MVP alinhada visualmente ao DS Atmos (dark, vidro, gradiente de fundo, botão primário em gradiente, busca em pill), com governança e artefatos Stitch versionados em `docs/`.
