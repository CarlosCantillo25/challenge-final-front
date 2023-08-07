/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
      './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
      extend: {
        screens: {
          'sx': '400px',
          'ms': '510px',
        },
      }
  },
  plugins: []
}
