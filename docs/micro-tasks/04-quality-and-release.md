# Micro-tarefas — P3: Qualidade e encerramento do MVP

**Rastreio:** Plano MVP previsão do tempo.

## Checklist de execução

- [x] **MT-P3-1:** Estados de UI: `loading`, mensagem de erro (`role="alert"`), “nenhum resultado” quando a geocoding não retorna locais (`noGeocodeMatch`).
- [x] **MT-P3-2:** ESLint (flat config) + script `npm run lint` em `weather-mvp`.
- [x] **MT-P3-3:** README na raiz do repositório (`projeto-curso/README.md`) apontando para `weather-mvp` e para `docs/`.
- [x] **MT-P3-4:** README do app (`weather-mvp/README.md`) com scripts e aviso de segurança da chave.

## Critérios de aceite da etapa P3

- `npm run build` conclui sem erros de TypeScript.
- `npm run lint` passa em `src/`.
- Documentação de micro-tarefas P0–P4 completa em `docs/micro-tasks/`.

## Referência à US / objetivo do MVP

**Objetivo:** página web para pesquisar por cidade, estado ou país; o primeiro resultado da geocoding define o local ativo; exibir o tempo atual nesse local — stack Vue 3, Tailwind, Pinia e axios, conforme plano aprovado.
