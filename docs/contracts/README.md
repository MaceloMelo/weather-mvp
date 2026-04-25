# Contratos de componentes — MVP tempo

**US / escopo:** busca de local + exibição do tempo atual (OpenWeatherMap).  
**Local do código:** `weather-mvp/src/components/weather/`, `weather-mvp/src/views/HomeView.vue`, `weather-mvp/src/stores/weather.ts`.

## WeatherSearchBar

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `modelValue` | `string` | Texto do campo de busca (v-model). |
| Prop | `disabled` | `boolean` (opcional) | Desabilita o campo durante loading. |
| Emit | `update:modelValue` | `string` | Atualização do texto digitado. |
| Emit | `search` | `void` | Envio do formulário (`submit` / Enter); o pai dispara `searchByQuery` na store. |

**UI:** campo único estilo *pill* (ícone de busca à esquerda, `placeholder` pt-BR), rótulo visível apenas para leitores de tela (`sr-only`).

**Tipo `GeoLocation`:** `name`, `lat`, `lon`, `country`, `state?` — ver `weather-mvp/src/types/weather.ts`.

## WeatherHeroSection

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `weather` | `CurrentWeatherView` | Dados para título, descrição, temperatura grande e ícone OWM. |

## WeatherMetricTile

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `icon` | `string` | Nome do glifo Material Symbols Outlined. |
| Prop | `iconTone` | `'primary' \| 'secondary' \| 'tertiary'` (opcional) | Cor de destaque do ícone (default `primary`). |
| Prop | `label` | `string` | Rótulo em caps (ex.: “Umidade”). |
| Prop | `value` | `string` | Valor formatado para exibição. |

## WeatherBentoMetrics

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `weather` | `CurrentWeatherView` | Monta três `WeatherMetricTile` (umidade, vento, nebulosidade). |

## WeatherSecondaryMetricsRow

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `weather` | `CurrentWeatherView` | Visibilidade (km/m), sensação térmica (°C), pressão (hPa). |

## WeatherForecastStrip

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| — | — | — | Componente apenas visual (*placeholder* “Em breve”); CTA “Ver detalhes” desabilitado até API de previsão. |

## WeatherCurrentCard

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `weather` | `CurrentWeatherView` | Dados já mapeados para exibição. |

**@deprecated** para a Home Stitch PT-BR: preferir `WeatherHeroSection` + `WeatherBentoMetrics` + `WeatherSecondaryMetricsRow`.

**Tipo `CurrentWeatherView`:** ver `weather-mvp/src/types/weather.ts` (inclui `visibilityM`, `cloudinessPercent`, `ambientKind` para o fundo ambiente da Home).

## Store `useWeatherStore`

| Estado / ação | Descrição |
|---------------|-----------|
| `searchQuery` | Texto da busca (sincronizado com `WeatherSearchBar`); valor inicial `Aracaju, Sergipe, BR`. |
| `noGeocodeMatch` | `true` quando a última geocoding não retornou nenhum local (mensagem “nenhum resultado”). |
| `selected` | Local utilizado na última consulta de tempo atual. |
| `current` | Tempo atual mapeado para `CurrentWeatherView` ou `null`. |
| `loading` | `true` durante requisições. |
| `error` | Mensagem amigável ou `null`. |
| `searchByQuery()` | Geocoding com `searchQuery`; se houver resultados, aplica **sempre o primeiro** e busca o tempo atual (lista não é exibida na UI). |
| `selectLocation(loc)` | Busca tempo atual para `lat`/`lon` de `loc` (uso interno / extensível). |

## Formato sugerido de busca (query `q`)

- `Cidade`
- `Cidade,BR`
- `Cidade,UF,BR` (ex.: `Florianópolis,SC,BR`)

Comportamento final depende da API OpenWeather Geocoding; em caso de ambiguidade o app usa **apenas o primeiro** resultado retornado, sem lista na interface.

---

## Primitivos Design System (Stitch / Atmos)

Contratos de `DsGlassCard`, `DsButton`, `DsAmbientBackground`, `DsTopAppBar`, `DsBottomNav`: ver [`ds-primitives.md`](ds-primitives.md).

---

## Governança do repositório (commits, IA, decisões humanas)

**Conventional Commits**, resumo de **como a IA colaborou** no MVP e **onde a decisão humana foi necessária** estão documentados no README principal do app: [`../../README.md`](../../README.md) (raiz de `weather-mvp/`).
