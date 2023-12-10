/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      colors: {
        'light-text': '#0A0A0F',
        'light-background': '#F8F9FC',
        'light-primary': '#566FB3',
        'light-secondary': '#A1B1DD',
        'light-accent': '#718CD6',
      },
      dark: {
        "dark-text": "#F0F0F5",
        "dark-background": "#030407",
        "dark-primary": "#4C65A9",
        "dark-secondary": "#22325E",
        "dark-accent": "#29448E",
      },
    },
  },
  plugins: [],
}

