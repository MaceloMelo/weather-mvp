# Micro-tarefas — P1: API OpenWeatherMap, tipos e Pinia

**Rastreio:** Plano MVP previsão do tempo.  
**US implícita:** Usuário informa local (cidade / estado / país) e vê dados vindos da API.

## Endpoints utilizados

| Uso | Endpoint | Observação |
|-----|----------|------------|
| Busca de locais | `GET https://api.openweathermap.org/geo/1.0/direct` | Parâmetros `q`, `limit`, `appid` |
| Tempo atual | `GET https://api.openweathermap.org/data/2.5/weather` | Parâmetros `lat`, `lon`, `appid`, `units=metric`, `lang=pt_br` |

## Variável de ambiente

- `VITE_OPENWEATHER_API_KEY` — definida em `.env` (não versionado). Ver `weather-mvp/.env.example`.

## Checklist de execução

- [x] **MT-P1-1:** Tipos `GeoLocation` e `CurrentWeatherView` em `weather-mvp/src/types/weather.ts`.
- [x] **MT-P1-2:** Serviço `weather-mvp/src/services/openweather.ts` com `searchLocations` e `getCurrentWeather`, tratamento de erro (`parseOpenWeatherError`).
- [x] **MT-P1-3:** Store Pinia `useWeatherStore` em `weather-mvp/src/stores/weather.ts` (`searchQuery` com padrão Aracaju, Sergipe, BR; `noGeocodeMatch`; `selected`; `current`; `loading`; `error`; `searchByQuery` aplica o 1º resultado da geocoding; `selectLocation`).
- [x] **MT-P1-4:** `.env.example` + orientação de segurança neste documento.

## Human Gate — decisão humana recomendada

1. **Exposição da chave no cliente:** Com Vite, `VITE_*` vai para o bundle do navegador. Para curso/MVP costuma ser aceitável; para produção pública, preferir **BFF/proxy** que injeta a chave no servidor.
2. **Limites do plano gratuito** OpenWeather: validar cotas e termos antes de escalar tráfego.
3. **Escopo de endpoints:** MVP usa apenas **tempo atual**; previsão horária/diária (ex. 5 dias) fica fora até nova decisão.

## Critérios de aceite da etapa P1

- Chamadas à API funcionam com `.env` válido.
- Geocoding + card de tempo atual consistentes com os tipos definidos (primeiro resultado da busca vira o local ativo).
- Mensagens de erro compreensíveis para 401, rede e timeout.
