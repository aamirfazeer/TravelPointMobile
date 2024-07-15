/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF', 
        secondary: {
          DEFAULT: '#446482',
          100: '#446482',
          200: '#2f4648',
          300: '#EFF2FB'
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "EFF2FB"
        },

      },
      fontFamily: {
        pthin:["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight","sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        jlight: ["Junge-Light"],
        Ibold: ["Inter-Bold"],
        Ilight: ["Inter-Light"],
        IRegular: ["Inter-Regular"],
      },
    },
  },
  plugins: [],
}

