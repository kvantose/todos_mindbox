const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      'gray100': colors.gray[100],
      'gray200': colors.gray[200],
      'gray300': '#ffffff1a',
      'gray400': '#242424',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
