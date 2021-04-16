/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      ...defaultTheme.colors,
      purple: colors.purple,
      indigo: colors.violet,
      cyan: colors.cyan,
      gray: colors.warmGray
    },
    screens: {
      xs: '400px',
      ...defaultTheme.screens
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {}
}
