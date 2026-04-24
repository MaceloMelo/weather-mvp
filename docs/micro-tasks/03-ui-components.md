# Micro-tarefas — P2: UI, composição e contratos

**Rastreio:** Plano MVP previsão do tempo.

## Checklist de execução

- [x] **MT-P2-1:** Componente `WeatherSearchBar` — busca acessível (`role="search"`, label associado ao input).
- [x] **MT-P2-2:** Componente `LocationResultsList` — lista clicável; emite `select` com `GeoLocation`.
- [x] **MT-P2-3:** Componente `WeatherCurrentCard` — recebe `CurrentWeatherView`; ícone via URL oficial OpenWeather.
- [x] **MT-P2-4:** `HomeView` orquestra barra de busca, lista, card e estados (`loading`, erro, vazio).
- [x] **MT-P2-5:** Documentação de contratos em `docs/contracts/README.md` (tabela resumo).

## Human Gate — UX / idioma

- **Idioma da UI:** textos da interface em **pt-BR**; descrição meteorológica via `lang=pt_br` na API.
- **Formato de estado:** documentado em contratos — sugerido `Cidade, UF, BR` quando aplicável.
- **Paginação:** não há paginação; `limit` fixo na geocoding (8). Ajuste por decisão de produto se necessário.

## Critérios de aceite da etapa P2

Fluxo completo: digitar termo → buscar → ver lista → selecionar → ver card de tempo atual com Tailwind aplicado.
