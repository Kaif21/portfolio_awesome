import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette — "Deep Cyber Charcoal" theme
        base: {
          DEFAULT: '#0A0D14', // Background — Deep Cyber Charcoal
          deep: '#060810', // Recessed wells, code blocks
        },
        surface: {
          DEFAULT: '#141923', // Cards / Surfaces — Dark Slate Panel
          raised: '#1A2130', // Elevated / nested surfaces
        },
        accent: {
          DEFAULT: '#FF5A1F', // Primary — Neon Tangerine
          soft: '#FF8A5B', // Secondary — Soft Cyber Coral
          dim: '#C24318', // Borders / pressed states
        },
        ice: '#F8FAFC', // Primary Text — Pure Ice White
        muted: '#94A3B8', // Muted Text — Slate Gray
        subtle: '#7C8BA1', // Secondary muted (AA ≥ 4.5:1 on base)
        success: '#2FBF71',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bebas Neue', 'sans-serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', '"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'blink': 'blink 1.1s steps(2, start) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      // Crisp elevation — replaces all neon glow shadows
      boxShadow: {
        'elev-1': '0 2px 10px rgba(0, 0, 0, 0.28)',
        'elev-2': '0 8px 24px rgba(0, 0, 0, 0.38)',
        'elev-3': '0 16px 40px rgba(0, 0, 0, 0.48)',
        'inset-hairline': 'inset 0 1px 0 rgba(248, 250, 252, 0.06)',
      },
      backgroundImage: {
        'grid-base':
          'linear-gradient(rgba(148, 163, 184, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.055) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
export default config
