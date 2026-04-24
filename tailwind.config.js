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
        'atmos-shell':
          'radial-gradient(120% 80% at 50% 0%, rgb(56 189 248 / 0.14) 0%, transparent 55%), linear-gradient(180deg, rgb(6 14 32) 0%, rgb(11 19 38) 45%, rgb(23 31 51) 100%)',
      },
    },
  },
  plugins: [],
}
