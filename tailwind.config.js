/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eafbf4",
          100: "#cdf7e8",
          400: "#1ed7a5",
          500: "#07c78f",
          700: "#0e8765",
          900: "#12332f"
        },
        navy: {
          800: "#0b2628",
          900: "#061a1c"
        },
        surface: "#f8fafc"
      },
      boxShadow: {
        soft: "0 12px 28px -16px rgba(5, 15, 36, 0.28)"
      }
    }
  },
  darkMode: "class",
  plugins: []
};
