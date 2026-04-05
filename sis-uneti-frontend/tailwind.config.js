/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ─── Tokens exactos del prototipo CODIGO.HTML ────────────────
        primary:        '#007BFF', // Azul estándar: botones CTA y elementos activos
        'primary-dark': '#0c0939', // Títulos, texto alto contraste y sidebar fondo texto
        surface:        '#F8FAFC', // Fondo general de páginas
        'on-surface':   '#1E293B', // Texto sobre superficie
        outline:        '#E2E8F0', // Bordes de tablas, cards e inputs
        // ─── Alias heredados de la fase anterior (no eliminar aún) ───
        uneti: {
          blue:       '#1e3a8a',
          'blue-mid': '#2563eb',
          'blue-lt':  '#dbeafe',
          gold:       '#b8860b',
          'gold-lt':  '#fef9c3',
        },
      },
      fontFamily: {
        // Los nombres mapean con <link> en index.html
        headline: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans:     ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body:     ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        label:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg:      '0.75rem',
        xl:      '1rem',
        '2xl':   '1.5rem',
        full:    '9999px',
      },
    },
  },
  plugins: [],
};
