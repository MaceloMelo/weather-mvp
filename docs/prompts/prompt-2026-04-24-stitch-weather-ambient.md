# Resumo do prompt — Fundo ambiente Stitch por condição meteorológica

**Data:** 2026-04-24  
**Papel solicitado:** Engenheiro de software front end sênior.

## Objetivo

Implementar o layout indicado pelo **Google Stitch**, com a tela respondendo ao **tempo retornado pela pesquisa**, correspondente aos layouts por `node-id`:

- **Padrão:** `2dd4d51cebd54826b2e87eefa48dd081`
- **Chuvoso:** `a7785b4d87084791b47daeffb8a54eb0`
- **Sol:** `a801c5c10420495db951b40f9880e321`
- **Nublado:** `77efa311e8ad40e7b8f55d30cf2ab2ff`

**Regra de escopo:** o **layout permanece o mesmo**; altera-se **somente o background** conforme o tempo retornado.

## Instruções de governança (síntese)

- Criar e manter **micro-tarefas** em `docs/micro-tasks/`.
- Registrar **resumo do prompt** em `docs/prompts/`.
- Atualizar **README** do projeto quando necessário.
- Preservar **contratos** entre componentes; usar o **design system** (Atmos / tokens).
- **Revisão humana** para decisões importantes (mapeamento de condições, paridade com Stitch, assets).

## Execução realizada

1. Mapeamento **OpenWeather** (`weather[0].id` + ícone dia/noite) → `AmbientWeatherKind`.
2. Novos gradientes **`bg-atmos-shell-*`** no Tailwind, coerentes com a paleta Atmos.
3. **`DsAmbientBackground`**: prop `variant`; **`HomeView`** consome `current.ambientKind`.
4. Documentação: [`../micro-tasks/07-weather-ambient-backgrounds.md`](../micro-tasks/07-weather-ambient-backgrounds.md).

## Links

- Contratos: [`../contracts/README.md`](../contracts/README.md), [`../contracts/ds-primitives.md`](../contracts/ds-primitives.md)
- Layout Home PT-BR (shell): [`../micro-tasks/06-stitch-home-layout-ptbr.md`](../micro-tasks/06-stitch-home-layout-ptbr.md)
