/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Palette from the SWP sample — mist, ink, lime
        paper: { DEFAULT: '#F2F3EF', deep: '#E9EBE4' },
        surface: { DEFAULT: '#FFFFFF', raised: '#F8F9F5' },
        ink: { DEFAULT: '#101110', soft: '#2B2C2A', muted: '#6C7068', faint: '#8C9280' },
        accent: { DEFAULT: '#C8F14D', soft: '#B2DF33', dim: '#9FC72E' },
        hairline: '#E3E5DE',
        success: '#3FA34D',
      },
      fontFamily: {
        display: ['"Libre Baskerville"', 'Georgia', 'serif'],
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '72rem' },
      boxShadow: {
        card: '0 1px 2px rgba(16, 17, 16, 0.04)',
        'card-hover': '0 6px 24px rgba(16, 17, 16, 0.08)',
      },
    },
  },
  plugins: [],
}
