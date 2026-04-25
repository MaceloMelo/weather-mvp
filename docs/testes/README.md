# Documentação de testes — weather-mvp

## Como os testes foram implementados

A estratégia de testes foi implementada em camadas, com **Vitest** + **Vue Test Utils**, para cobrir lógica de negócio, estado e UI:

1. **Fundação de testes**
   - Configuração de ambiente em `vitest.config.ts` com `jsdom`, `setupFiles` e cobertura V8.
   - Scripts no `package.json`: `test`, `test:watch`, `test:coverage`.
   - Setup global em `tests/setup.ts`.
2. **Padronização de utilitários**
   - Fixtures em `tests/fixtures/weather.ts`.
   - Helpers para Pinia/mount e mocks em `tests/utils/*`.
3. **Testes unitários**
   - Domínio e serviços: `tests/unit/weather-ambient.spec.ts` e `tests/unit/openweather.spec.ts`.
   - Store Pinia: `tests/unit/weather-store.spec.ts`.
4. **Testes de componentes**
   - Design System: `tests/components/ds-components.spec.ts`.
   - Componentes de clima: `tests/components/weather-components.spec.ts`.
   - Integração de tela: `tests/components/home-view.spec.ts`.

## Benefícios dos testes

- **Redução de regressões:** alterações em store/serviço/UI quebram em CI antes de chegar ao usuário.
- **Segurança para refatorar:** mudanças no design system e nos componentes ficam protegidas por contratos de props/emits/render.
- **Confiabilidade de regras de negócio:** cenários de sucesso e falha (green/red) garantem comportamento previsível.
- **Feedback rápido para o time:** execução local simples com `npm run test` e modo watch para desenvolvimento contínuo.
- **Evidência de qualidade:** cobertura automatizada com relatório para orientar prioridades de melhoria.

## O que os testes cobrem

### Unitário (lógica e estado)

- Mapeamento de ambiente climático (`sunny`, `cloudy`, `rainy`, `default`) por condição OpenWeather.
- Parsing de erro e mapeamento de payload da API em `openweather`.
- Fluxos da store `weather`:
  - query vazia,
  - sem resultado geocoding,
  - sucesso com seleção e clima atual,
  - erro de API,
  - transições de `loading` e contrato de estado.

### Componentes (montagem e interação)

- Contratos de componentes DS (`DsButton`, `DsGlassCard`, `DsTopAppBar`, `DsBottomNav`, `DsAmbientBackground`).
- Contratos de componentes de clima (`WeatherSearchBar`, `WeatherMetricTile`, `WeatherHeroSection`, `WeatherBentoMetrics`, `WeatherSecondaryMetricsRow`, `WeatherForecastStrip`, `WeatherCurrentCard`).
- Integração da `HomeView` para estados de loading, erro, vazio e renderização de blocos com clima carregado.

### Cobertura atual

- Testes: **36 passando**.
- Cobertura geral (última execução):
  - **Statements:** 92.43%
  - **Branches:** 81.71%
  - **Functions:** 96.29%
  - **Lines:** 92.85%

## Como executar os testes

- Rodar toda a suíte: `npm run test`
- Rodar em modo watch: `npm run test:watch`
- Gerar cobertura: `npm run test:coverage`
