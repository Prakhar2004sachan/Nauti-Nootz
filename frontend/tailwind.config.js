/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#f9fafc",
          200: "#e6e9ed",
          600: "#95989c",
        },
        purple: {
          200: "#e0e7ff",
          500: "#9492db",
          600: "#5046e5",
        },
      },
    },
  },
  plugins: [],
};
