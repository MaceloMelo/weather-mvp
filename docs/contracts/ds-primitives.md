# Contratos — primitivos Design System (Atmos / Stitch)

**US / escopo:** integração do design system **Atmos** do projeto Stitch *SkyCast Vue Dashboard* ao MVP tempo.  
**Código:** `src/components/ds/`.

## DsGlassCard

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `elevated` | `boolean` (opcional, default `false`) | Usa painel com blur/opacidade reforçados (camada “ativa”). |
| Slot | default | — | Conteúdo do cartão; padding fica a cargo do pai (ex.: `p-atmos-md`, `p-0`). |

**Markup:** raiz com `data-ds="glass-card"` para inspeção/testes.

## DsButton

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `variant` | `'primary' \| 'secondary'` (opcional, default `'primary'`) | Primário: gradiente primary → primary-container. Secundário: vidro com borda clara. |
| Prop | `type` | `'button' \| 'submit'` (opcional, default `'button'`) | Tipo nativo do `<button>`. |
| Prop | `disabled` | `boolean` (opcional) | Estado desabilitado. |
| Slot | default | — | Rótulo do botão. |

**Markup:** `data-ds="button"`.

## DsAmbientBackground

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `imageUrl` | `string` (opcional, default `''`) | Se preenchido, exibe `<img>` em tela cheia sob o gradiente Atmos (ex.: arquivo em `public/`). |
| Prop | `alt` | `string` (opcional) | Texto alternativo da imagem. |

**Markup:** `aria-hidden="true"` na raiz (decorativo); camadas: `bg-atmos-shell` fixo, imagem opcional, gradiente inferior.

## DsTopAppBar

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `brand` | `string` (opcional, default `'Atmos'`) | Texto da marca à esquerda. |
| Slot | `nav` | — | Links ou botões de navegação (exibidos em `md+`). |
| Emit | `location-click` | `void` | Clique no botão de localização. |
| Emit | `settings-click` | `void` | Clique no botão de configurações. |

**Markup:** `data-ds="top-app-bar"`; barra fixa superior com `backdrop-blur`.

## DsBottomNav

| Direção | Nome | Tipo / payload | Descrição |
|---------|------|----------------|-----------|
| Prop | `activeId` | `'home' \| 'forecast' \| 'radar'` (opcional, default `'home'`) | Item com estilo ativo e `aria-current="page"`. |
| Emit | `navigate` | `[id: 'home' \| 'forecast' \| 'radar']` | Clique em item (MVP: sem rotas; pai pode ignorar). |

**Markup:** `data-ds="bottom-nav"`; barra fixa inferior com cantos superiores arredondados.

## Tokens e Tailwind

Cores e espaçamentos **Atmos** vêm de [`docs/design-stitch/skycast-9039746379022897621/atmos-design-tokens.json`](../design-stitch/skycast-9039746379022897621/atmos-design-tokens.json) e são expostos como `colors.atmos.*`, `spacing.atmos-*`, `borderRadius.atmos-*`, `fontSize.atmos-*` em `tailwind.config.js`.

Utilitários de camada em `src/style.css` (`@layer components`): `.atmos-glass-panel`, `.atmos-glass-panel--elevated`, `.atmos-search-input`, `.no-scrollbar`.

Estilização base de ícones **Material Symbols Outlined** (fonte em `index.html`): classe `.material-symbols-outlined` em `@layer base` de `src/style.css`.
