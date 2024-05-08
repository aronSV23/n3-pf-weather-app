/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'SoftDarkBlue': '#1E213A',
        'DarkBlue': '#100E1D',
      },
      fontFamily: {
        'Raleway': ['Raleway', 'sans-serif']
      },
      screens:{
        'tablet': '960px'
      },
      backgroundImage:{
        'cloudBackgound' : 'url(src/assets/Cloud-background.png)'
      }
    },
  },
  plugins: [],
}