# Micro-tarefas — P2: UI, composição e contratos

**Rastreio:** Plano MVP previsão do tempo.

## Checklist de execução

- [x] **MT-P2-1:** Componente `WeatherSearchBar` — busca acessível (`role="search"`, label associado ao input).
- [x] **MT-P2-2:** ~~`LocationResultsList`~~ (histórico: lista clicável) — removido na **MT-P2-6**; 1º resultado da geocoding é aplicado na store, sem UI de lista.
- [x] **MT-P2-3:** Componente `WeatherCurrentCard` — recebe `CurrentWeatherView`; ícone via URL oficial OpenWeather.
- [x] **MT-P2-4:** `HomeView` orquestra barra de busca, blocos de tempo atual e estados (`loading`, erro, vazio).
- [x] **MT-P2-5:** Documentação de contratos em `docs/contracts/README.md` (tabela resumo).
- [x] **MT-P2-6 (US — cidade padrão + 1º resultado):** Removida lista de resultados da Home; busca ao montar (`onMounted`) com padrão Aracaju; hint no `WeatherSearchBar` alinhado ao padrão; mensagem de vazio usa `noGeocodeMatch` (componente `LocationResultsList` removido do fluxo).

## Human Gate — UX / idioma

- **Idioma da UI:** textos da interface em **pt-BR**; descrição meteorológica via `lang=pt_br` na API.
- **Formato de estado:** documentado em contratos — sugerido `Cidade, UF, BR` quando aplicável.
- **Paginação:** não há paginação; `limit` fixo na geocoding (8). Ajuste por decisão de produto se necessário.

## Critérios de aceite da etapa P2

Fluxo completo: digitar termo → buscar → primeiro resultado da geocoding aplicado automaticamente → ver blocos de tempo atual (Stitch) com Tailwind aplicado.
