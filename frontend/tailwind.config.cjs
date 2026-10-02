/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'agri-deep': '#0f5132',
        'agri-fresh': '#3fbf6f',
        'agri-cream': '#fff8ef',
        'agri-charcoal': '#0f1722',
        'agri-warn': '#f6c84c',
        'agri-critical': '#e02424'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
