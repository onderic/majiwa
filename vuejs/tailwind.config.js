// tailwind.config.js
module.exports = {
  content: [
    './node_modules/preline/preline.js',
  ],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
  ],
}