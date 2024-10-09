/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#bf292d'
      },
      screens: {
        'sm-md': '900px'
      },
      fontSize: {
        xxs: '0.6rem'
      }
    }
  },
  plugins: []
}
