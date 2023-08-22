/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-background': "url('./images/GreenWave2.jpg')"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [], 
  },
}
