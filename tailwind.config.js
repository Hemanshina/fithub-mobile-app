/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],  
  theme: {
    extend: {
      colors: {
        primary:'#206320',
        secondary: '#004d26',
        light: '#fff',
        dark: "#000"
      },
    },
  },
  plugins: [],
}

