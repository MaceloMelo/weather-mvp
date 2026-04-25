import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import defaultTheme from 'tailwindcss/defaultTheme'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const tokensPath = path.join(
  __dirname,
  'docs/design-stitch/skycast-9039746379022897621/atmos-design-tokens.json',
)
const atmosTokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'))

function snakeToCamel(key) {
  return key.replace(/_([a-z])/g, (_, ch) => ch.toUpperCase())
}

const atmosColors = Object.fromEntries(
  Object.entries(atmosTokens.namedColors).map(([k, v]) => [snakeToCamel(k), v]),
)

const { spacing: atmosSpace, rounded: atmosRounded } = atmosTokens

const atmosSpacing = Object.fromEntries(
  Object.entries(atmosSpace).map(([k, v]) => [`atmos-${k.replace(/_/g, '-')}`, v]),
)

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        atmos: atmosColors,
      },
      fontFamily: {
        sans: ['Inter', ...(defaultTheme.fontFamily.sans || [])],
      },
      fontSize: {
        'atmos-display-temp': [
          'clamp(2.75rem, 14vw, 6rem)',
          { lineHeight: '1.05', letterSpacing: '-0.04em', fontWeight: '600' },
        ],
        'atmos-headline-lg': [
          '32px',
          { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        'atmos-headline-md': ['24px', { lineHeight: '32px', fontWeight: '500' }],
        'atmos-body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'atmos-body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'atmos-label-caps': [
          '12px',
          { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '700' },
        ],
      },
      spacing: atmosSpacing,
      borderRadius: {
        'atmos-sm': atmosRounded.sm,
        atmos: atmosRounded.DEFAULT,
        'atmos-md': atmosRounded.md,
        'atmos-lg': atmosRounded.lg,
        'atmos-xl': atmosRounded.xl,
        'atmos-full': atmosRounded.full,
      },
      backgroundImage: {
        /** Padrão — alinhado à tela Stitch `2dd4d51cebd54826b2e87eefa48dd081` (gradiente escuro + brilho ciano). */
        'atmos-shell':
          'radial-gradient(120% 80% at 50% 0%, rgb(56 189 248 / 0.14) 0%, transparent 55%), linear-gradient(180deg, rgb(6 14 32) 0%, rgb(11 19 38) 45%, rgb(23 31 51) 100%)',
        /** Sol — referência Stitch `a801c5c10420495db951b40f9880e321` (topo mais luminoso, acento quente). */
        'atmos-shell-sunny':
          'radial-gradient(100% 70% at 50% -10%, rgb(142 213 255 / 0.38) 0%, transparent 52%), radial-gradient(85% 55% at 85% 15%, rgb(252 185 115 / 0.14) 0%, transparent 48%), linear-gradient(180deg, rgb(8 28 48) 0%, rgb(12 42 68) 42%, rgb(18 48 78) 100%)',
        /** Nublado — referência Stitch `77efa311e8ad40e7b8f55d30cf2ab2ff` (céu acinzentado, menos saturação). */
        'atmos-shell-cloudy':
          'radial-gradient(120% 85% at 50% 5%, rgb(189 200 209 / 0.14) 0%, transparent 58%), linear-gradient(180deg, rgb(10 14 24) 0%, rgb(18 22 36) 48%, rgb(32 40 56) 100%)',
        /** Chuva — referência Stitch `a7785b4d87084791b47daeffb8a54eb0` (mais escuro, brilho frio lateral). */
        'atmos-shell-rainy':
          'radial-gradient(95% 55% at 25% 0%, rgb(56 130 180 / 0.22) 0%, transparent 55%), linear-gradient(180deg, rgb(5 10 22) 0%, rgb(8 14 28) 52%, rgb(14 22 40) 100%)',
      },
    },
  },
  plugins: [],
}
