# Micro-tarefas — Layout Home Stitch PT-BR (SkyCast)

**US / rastreio:** Reformular a tela inicial conforme o layout Stitch *Previsão do Tempo - Home (PT-BR)* — projeto `9039746379022897621`, screen `2dd4d51cebd54826b2e87eefa48dd081`. Referência: [`screen-home-ptbr.html`](../design-stitch/skycast-9039746379022897621/screen-home-ptbr.html), PNG `screen-home-ptbr.png`.

## Decisões registradas (Human Gates — implementação MVP)

| Tema | Decisão aplicada | Revisão futura |
|------|------------------|----------------|
| Previsão 5 dias | UI **placeholder** (“Em breve”) + CTA desabilitado até API de forecast. | Integrar 5 Day / One Call após aprovação de escopo. |
| Terceiro tile (UV) | Substituído por **nebulosidade** (`clouds.all` da API Current Weather). | UV se endpoint dedicado for aprovado. |
| Top / Bottom nav | **Casca visual** apenas (`aria-current` no item ativo); sem `vue-router` nesta US. | Rotas reais quando houver telas Previsão/Radar. |
| Imagem de fundo | Fundo **gradiente Atmos** + overlay; prop opcional `imageUrl` em `DsAmbientBackground` para asset em `public/` quando houver. **Atualização:** variante dinâmica por tempo (`variant` / `ambientKind`) — ver [`07-weather-ambient-backgrounds.md`](07-weather-ambient-backgrounds.md). | Self-host ou `curl` de novo asset conforme [`manifest.md`](../design-stitch/skycast-9039746379022897621/manifest.md). |

## Checklist de execução

- [x] **MT-LAYOUT-01:** Decisões dos Human Gates documentadas na tabela acima.
- [x] **MT-LAYOUT-02:** `DsAmbientBackground` + z-index e padding principal para barras fixas.
- [x] **MT-LAYOUT-03:** `DsTopAppBar` (marca, links, ações com `aria-label`).
- [x] **MT-LAYOUT-04:** `DsBottomNav` (3 itens, Início ativo, sem rotas).
- [x] **MT-LAYOUT-05:** `WeatherSearchBar` em pill central; contrato `modelValue` / `update:modelValue` / `search` / `disabled` preservado.
- [x] **MT-LAYOUT-06:** `WeatherHeroSection` (título, descrição, temperatura grande, ícone OWM).
- [x] **MT-LAYOUT-07:** `WeatherMetricTile` + `WeatherBentoMetrics` (umidade, vento, nebulosidade).
- [x] **MT-LAYOUT-08:** `WeatherSecondaryMetricsRow` (visibilidade, sensação, pressão).
- [x] **MT-LAYOUT-09:** `WeatherForecastStrip` placeholder + CTA desabilitado.
- [x] **MT-LAYOUT-10:** `HomeView.vue` recomposto (ordem Stitch, lista de resultados, estados).
- [x] **MT-LAYOUT-11:** Contratos em `docs/contracts/README.md` e `docs/contracts/ds-primitives.md`.
- [x] **MT-LAYOUT-12:** `npm run lint` e `npm run build` sem erros.
- [x] **MT-LAYOUT-13 (US — Home Stitch PT-BR):** Removidos menus de navegação do header na `HomeView`, mantendo apenas a marca no `DsTopAppBar`.

## Registro de atividades realizadas

- [x] **US referenciada:** alteração vinculada à US de layout Home Stitch PT-BR desta etapa (`9039746379022897621` / `2dd4d51cebd54826b2e87eefa48dd081`).
- [x] `tests/components/home-view.spec.ts`: adicionado teste de contrato para ausência de labels de menu no header.
- [x] `src/views/HomeView.vue`: removido slot `nav` com botões `Início`, `Previsão` e `Radar`.
- [x] Testes focados executados com sucesso (`home-view.spec.ts` e `weather-components.spec.ts`).
- [x] `README.md`: documentada evolução da navegação inferior (`Início`, `Previsão`, `Radar`) como melhoria futura e seu papel no contexto meteorológico.
- [x] `README.md`: estrutura reorganizada para melhorar clareza (visão geral, navegação inferior, setup rápido, estado atual, roadmap, documentação e governança).

## Resultado esperado

Home com shell (top/bottom), hero, grade bento, faixa secundária e faixa de previsão placeholder, tokens Atmos e componentes reutilizáveis documentados.
