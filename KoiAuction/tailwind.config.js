/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#bf292d',
        brown: '#E1DED6'
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
