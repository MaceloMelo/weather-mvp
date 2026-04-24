# Artefatos Stitch — SkyCast Vue Dashboard

**Projeto:** `9039746379022897621`  
**Design system (Stitch):** Atmos — `assets/a33859fc5d9c4980bf6c8b72d8478dfc`  
**Captura em:** 2026-04-24

## Arquivos locais

| Arquivo | Origem |
|--------|--------|
| `atmos-design-tokens.json` | Export estruturado de `namedColors`, `spacing`, `rounded`, `typography` (API Stitch). |
| `stitch-resolution.json` | Mapeamento de IDs, nota sobre `DESIGN_SYSTEM_INSTANCE` vs `list_screens`. |
| `screen-home-7a730.png` | Screenshot `get_screen` — tela `7a73087057444c87914a36c206cec98c` (“Previsão do Tempo - Home”). |
| `screen-home-ptbr.png` | Screenshot — tela `2dd4d51cebd54826b2e87eefa48dd081` (“Previsão do Tempo - Home (PT-BR)”). |
| `screen-home-ptbr.html` | HTML exportado da mesma tela PT-BR (`curl -L`). |

## Download

Os URLs Google/FIFE podem expirar; para recapturar, use o MCP Stitch (`get_project`, `list_screens`, `get_screen`) e `curl -L` com as novas `downloadUrl`.

## Design System “tela” no Stitch

O stub `asset-stub-assets-…` do enunciado corresponde à instância de canvas `assets-a33859fc5d9c4980bf6c8b72d8478dfc-1777001364450` em `get_project.screenInstances` (`type: DESIGN_SYSTEM_INSTANCE`). Não há linha dedicada “Design System” em `list_screens`; a fonte normativa de tokens é `list_design_systems` + `designTheme` do projeto.
