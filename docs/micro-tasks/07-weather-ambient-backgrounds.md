# Micro-tarefas — Fundo ambiente por condição meteorológica (Stitch)

**US / rastreio:** A Home deve refletir visualmente o **tempo retornado pela API**, mantendo o **mesmo layout** da tela Stitch *Previsão do Tempo - Home (PT-BR)*; apenas a **camada de fundo (ambiente)** muda.

**Referências Stitch (projeto `9039746379022897621`):**

| Variante | `node-id` (URL Stitch) | Condição alvo |
|----------|-------------------------|----------------|
| Padrão | `2dd4d51cebd54826b2e87eefa48dd081` | Céu limpo à noite, neve, poucas nuvens (801), fallback |
| Chuvoso | `a7785b4d87084791b47daeffb8a54eb0` | Chuva, garoa, trovoada (IDs OWM 200–599) |
| Sol | `a801c5c10420495db951b40f9880e321` | Céu limpo de dia (800 + ícone `*d`) |
| Nublado | `77efa311e8ad40e7b8f55d30cf2ab2ff` | Névoa/atmosfera (700–799), nuvens 802–804 |

## Human Gate — decisão de produto / design

| Tema | Implementação MVP | Revisão humana sugerida |
|------|-------------------|-------------------------|
| Paridade pixel-perfect com Stitch | Gradientes **CSS** derivados da paleta **Atmos** (`tailwind.config.js`), não imagens exportadas por tela. | Aprovar captura de assets por `node-id` em `public/ambient/` e uso de `DsAmbientBackground.imageUrl` se exigido pelo design. |
| Neve (OWM 6xx) | Mapeada para variante **`default`** (fundo padrão). | Confirmar se neve deve ter arte própria ou compartilhar “nublado”. |
| Poucas nuvens (801) | **`default`** (entre sol e nublado). | Ajustar para `cloudy` ou `sunny` conforme guideline visual. |

## Checklist de execução

- [x] **MT-AMB-01:** Tipo `AmbientWeatherKind` + campo `ambientKind` em `CurrentWeatherView` (`src/types/weather.ts`).
- [x] **MT-AMB-02:** Função pura `ambientKindFromOwm` (`src/lib/weatherAmbient.ts`) com regras documentadas acima.
- [x] **MT-AMB-03:** `mapCurrentToView` passa a ler `weather[0].id` e preencher `ambientKind` (`src/services/openweather.ts`).
- [x] **MT-AMB-04:** Tokens de fundo no Tailwind: `bg-atmos-shell-sunny|cloudy|rainy` + `bg-atmos-shell` existente (`tailwind.config.js`).
- [x] **MT-AMB-05:** `DsAmbientBackground` — prop `variant` (`AmbientWeatherKind`) mapeada às classes de gradiente; contrato em `docs/contracts/ds-primitives.md`.
- [x] **MT-AMB-06:** `HomeView.vue` — `:variant="current?.ambientKind ?? 'default'"`.
- [x] **MT-AMB-07:** Contratos em `docs/contracts/README.md`; resumo do prompt em `docs/prompts/`; README raiz atualizado.
- [x] **MT-AMB-08:** `npm run lint` e `npm run build` sem erros.

## Registro de atividades

- [x] 2026-04-24: Implementação MVP de fundos dinâmicos por condição OWM + documentação e alinhamento aos `node-id` Stitch (gradientes Atmos como substituto de PNG até decisão de assets).

## Resultado esperado

Ao buscar um local, o usuário vê o **mesmo arranjo** de hero, métricas e navegação; o **fundo** transita entre padrão / sol / nublado / chuva conforme os dados atuais da OpenWeatherMap.
