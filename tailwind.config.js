/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
 const defaultTheme = require("tailwindcss/defaultTheme");

 module.exports = {
   theme: {
    screens: {
      'xs': '400px',
      ...defaultTheme.screens,
    },
     extend: {
       fontFamily: {
         sans: ["Inter", ...defaultTheme.fontFamily.sans]
       }
     }
   },
   variants: {},
 };
 