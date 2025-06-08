/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        trebuchet: ['"Trebuchet MS"', 'sans-serif'],
      },
      colors: {
        primary: 'rgba(var(--primary-color), <alpha-value>)',
        'primary-dark': 'rgba(var(--dark-primary-color), <alpha-value>)',
        secondary: 'rgba(var(--secondary-color), <alpha-value>)',
        'secondary-dark': 'rgba(var(--dark-secondary-color), <alpha-value>)',
        'secondary-light': 'rgba(var(--light-secondary-color), <alpha-value>)',
        'text-col': 'rgba(var(--text-color), <alpha-value>)',
        'text-col-light': 'rgba(var(--text-color-light), <alpha-value>)',
        'input-col' : 'rgba(var(--input-color), <alpha-value>)',
         'auth-col' : 'rgba(var(--auth-btn), <alpha-value>)',
        'border-col' : 'rgba(var(--border-col), <alpha-value>)', 
      },
    },
  },
  plugins: [],
};
