/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary': '#0F766E',
        'primary-dark': '#115E59',
        'primary-light': '#F0FDFA',
        'background': '#F8FAFC',
        'surface': '#FFFFFF',
        'heading': '#0F172A',
        'body': '#475569',
        'muted': '#64748B',
        'border': '#E2E8F0',
        'success': '#16A34A'
      }
    },
  },
  plugins: [],
}