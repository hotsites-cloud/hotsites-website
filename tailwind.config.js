/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        page: 'var(--color-page)',
        brand: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          strong: 'var(--color-text-strong)',
          foreground: 'var(--color-on-emphasis)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
        },
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
