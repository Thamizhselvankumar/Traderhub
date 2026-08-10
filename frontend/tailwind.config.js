/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff0f0',
          100: '#ffd6d6',
          200: '#ffadad',
          400: '#ff5c5c',
          600: '#E31E24',
          700: '#c01a1f',
          800: '#9b1518',
          900: '#7a1013',
        },
        gold: '#FFD700',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      }
    }
  },
  plugins: []
}
