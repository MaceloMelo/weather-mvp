# Resumo do prompt — Testes web com Vue + Pinia (Vitest/VTU)

**Data:** 2026-04-25  
**Papel solicitado:** Especialista sênior em testes web com Vue.js e Pinia.

## Objetivo

Implementar uma base completa de testes com:

- testes unitários (lógica/composables/store),
- testes de componentes (montagem e interação),
- uso de **Vitest** + **Vue Test Utils**.

## Instruções recebidas (síntese)

- Adicionar biblioteca de testes: **Vitest** com **Vue Test Utils**.
- Criar **micro-tarefas** para execução.
- Documentar micro-tarefas em `docs/` (Markdown).
- Garantir contratos entre componentes, preservando qualidade de execução, código e UI.
- Exigir **revisão humana** para decisões importantes.
- Identificar componentização como estrutura arquitetural.
- Usar o design system existente para qualquer ajuste de UI.
- Cobrir cenários **green** e **red**.

## Execução realizada

1. Setup de teste com scripts `test`, `test:watch`, `test:coverage`, `vitest.config.ts` e `tests/setup.ts`.
2. Criação de utilitários e fixtures reutilizáveis (`tests/utils/*`, `tests/fixtures/*`).
3. Testes unitários de domínio e serviço (`weatherAmbient`, `openweather`) com cenários positivos e negativos.
4. Testes unitários da store Pinia `weather` cobrindo fluxos de sucesso, vazio e erro.
5. Testes de componentes `ds/*`, `weather/*` e integração da `HomeView`.
6. Quality gate final executado com lint + testes + cobertura.

## Referências rápidas

- Micro-tarefas: [`../micro-tasks/08-testing-vitest-vtu.md`](../micro-tasks/08-testing-vitest-vtu.md)
- Prompt base inicial do projeto: [`./prompt-start.md`](./prompt-start.md)
