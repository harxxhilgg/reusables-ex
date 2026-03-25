/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist'],
        medium: ['GeistMedium'],
        semibold: ['GeistSemiBold'],
        bold: ['GeistBold'],
      },
    },
  },
};
