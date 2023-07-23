/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Boing', 'Noto', '"Noto Sans JP"', '"Noto Sans KR"', '"Noto Sans SC"', '"Open Sans"', 'sans-serif'],
        'my-font': ['Poppins', 'sans-serif'],
        'logo': ['Jost', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        'myprimary': '#fbbd0d',
        'myprimary1': '#ffc000',
        'mysecondary': '#2B3647',
        'my-third': '#91969D',
        'my-white': '#FFFFFF',
        'my-card': '#fcfaf2',
      },
    },
  },
  plugins: [require("daisyui")],
}

