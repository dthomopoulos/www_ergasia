/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'banner-author': "url('./assets/tolkien.png')",
      },
    },
  },
  plugins: [],
};
