/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'sx': '400px',
        'ms': '510px',
      },
    },
  },
  variants: {},
  plugins: [],
};
