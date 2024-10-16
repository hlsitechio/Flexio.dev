/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neuro-base': 'var(--color-bg-light)',
        'neuro-base-dark': 'var(--color-bg-dark)',
        'neuro-highlight': '#ffffff',
        'neuro-shadow': '#a3b1c6',
        'neuro-highlight-dark': '#2a2f34',
        'neuro-shadow-dark': '#0f1316',
      },
      boxShadow: {
        'neuro': '6px 6px 12px #b8b9be, -6px -6px 12px #ffffff',
        'neuro-inset': 'inset 6px 6px 12px #b8b9be, inset -6px -6px 12px #ffffff',
        'neuro-dark': '6px 6px 12px #15191d, -6px -6px 12px #1f252b',
        'neuro-inset-dark': 'inset 6px 6px 12px #15191d, inset -6px -6px 12px #1f252b',
      },
    },
  },
  plugins: [],
};