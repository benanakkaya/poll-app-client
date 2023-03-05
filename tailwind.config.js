/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily:{
        asap: ["Asap","sans-serif"]
      },
      colors:{
        primary:"#fdba74",
        secondary: "#f3f4f6",
        dark:"#231303"
      },
      container:{
        center:true
      }
    },
  },
  plugins: [],
}