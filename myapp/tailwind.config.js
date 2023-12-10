/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        primary: '#37412a',
        secondary: '#24b4ab',
        lightBlue: '#9fe3c1',
        pink: '#fa8072'
      }
    },
  },
  plugins: [],
}
