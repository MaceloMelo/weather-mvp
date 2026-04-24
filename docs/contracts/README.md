# Contratos de componentes — MVP tempo

**US / escopo:** busca de local + exibição do tempo atual (OpenWeatherMap).  
**Local do código:** `weather-mvp/src/components/weather/`, `weather-mvp/src/views/HomeView.vue`, `weather-mvp/src/stores/weather.ts`.

## WeatherSearchBar

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `modelValue` | `string` | Texto do campo de busca (v-model). |
| Prop | `disabled` | `boolean` (opcional) | Desabilita input e botão (ex.: durante loading). |
| Emit | `update:modelValue` | `string` | Atualização do texto digitado. |
| Emit | `search` | `void` | Formulário enviado (`submit`); o pai dispara a busca na store. |

## LocationResultsList

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `items` | `GeoLocation[]` | Resultados da geocoding. |
| Emit | `select` | `GeoLocation` | Usuário escolhe um local da lista. |

**Tipo `GeoLocation`:** `name`, `lat`, `lon`, `country`, `state?` — ver `weather-mvp/src/types/weather.ts`.

## WeatherCurrentCard

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `weather` | `CurrentWeatherView` | Dados já mapeados para exibição. |

**Tipo `CurrentWeatherView`:** ver `weather-mvp/src/types/weather.ts`.

## Store `useWeatherStore`

| Estado / ação | Descrição |
|---------------|-----------|
| `searchQuery` | Texto da busca (sincronizado com `WeatherSearchBar`). |
| `results` | Última lista retornada pela geocoding. |
| `selected` | Local escolhido (opcional, espelho da seleção). |
| `current` | Tempo atual mapeado para `CurrentWeatherView` ou `null`. |
| `loading` | `true` durante requisições. |
| `error` | Mensagem amigável ou `null`. |
| `searchByQuery()` | Usa `searchQuery` para preencher `results`. |
| `selectLocation(loc)` | Busca tempo atual para `lat`/`lon` de `loc`. |

## Formato sugerido de busca (query `q`)

- `Cidade`
- `Cidade,BR`
- `Cidade,UF,BR` (ex.: `Florianópolis,SC,BR`)

Comportamento final depende da API OpenWeather Geocoding; ambiguidade retorna múltiplas linhas na lista.

---

## Governança do repositório (commits, IA, decisões humanas)

**Conventional Commits**, resumo de **como a IA colaborou** no MVP e **onde a decisão humana foi necessária** estão documentados no README principal do app: [`../../README.md`](../../README.md) (raiz de `weather-mvp/`).
