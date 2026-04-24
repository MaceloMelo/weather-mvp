# Micro-tarefas — P0: Fundação e stack

**Rastreio:** Plano MVP previsão do tempo (Vue 3 + Tailwind + Pinia + axios + OpenWeatherMap).  
**App:** `weather-mvp/` na raiz do repositório.

## Checklist de execução

- [x] **MT-P0-1:** Scaffold Vite com template `vue-ts` (`weather-mvp`).
  - **Critério de aceite:** `npm run dev` sobe sem erro; `package.json` com scripts `dev` / `build` / `preview`.
- [x] **MT-P0-2:** Instalar e configurar Tailwind CSS v3 (PostCSS, `tailwind.config.js` com `content`, `src/style.css` com `@tailwind`).
  - **Critério de aceite:** classes utilitárias aplicadas na UI inicial (via `HomeView` / layout).
- [x] **MT-P0-3:** Instalar Pinia e registrar com `app.use(createPinia())` em `src/main.ts`.
  - **Critério de aceite:** store `weather` importável sem erro.
- [x] **MT-P0-4:** Instalar axios e criar `src/services/http.ts` (cliente com `timeout`).
  - **Critério de aceite:** serviços usam `http` ou padrão equivalente documentado em P1.
- [x] **MT-P0-5:** Documentar esta checklist em `docs/micro-tasks/01-setup-stack.md` (este arquivo).

## Resultado esperado da etapa P0

Projeto executável localmente com a stack pedida e documentação P0 versionada em `docs/`.
