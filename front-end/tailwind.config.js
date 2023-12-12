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
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        darkTheme: {
          "primary": "#566FB3",
          "secondary": "#A1B1DD",
          "accent": "#8B65A0",
          "neutral": "#A0AEC0",
          "base-100": "#03060A",
          "error": "#E53E3E",
          "success": "#48BB78",
          "warning": "#ED8936",
          "info": "#4299E1",
          "text": "#DCE4F3",

        },
        lightTheme: {
          "primary": "#7A96C2",
          "secondary": "#C1CFEA",
          "accent": "#A88FB8",
          "neutral": "#7B8794",
          "base-100": "#F7FAFC",
          "error": "#FC8181",
          "success": "#68D391",
          "warning": "#F6AD55",
          "info": "#63B3ED",
          "text": "#2D3748",
        },
      },
    ],
  },
}

