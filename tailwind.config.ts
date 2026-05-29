import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          50: "#e8edf5",
          100: "#c5d0e6",
          200: "#9eb0d4",
          300: "#778fc2",
          400: "#5a77b4",
          500: "#3d5fa6",
          600: "#2d4d8e",
          700: "#1e3a6e",
          800: "#132850",
          900: "#0a1628",
          950: "#060d1a",
        },
        gold: {
          50: "#fdf9ec",
          100: "#faf0c9",
          200: "#f5e18a",
          300: "#f0cf4b",
          400: "#e8bc25",
          500: "#c9a227",
          600: "#a07d1a",
          700: "#7a5c12",
          800: "#56400d",
          900: "#342708",
        },
        cream: {
          50: "#fdfcf8",
          100: "#faf6ec",
          200: "#f5eed8",
          300: "#ede0bb",
          400: "#e3ce97",
          500: "#d4b56e",
        },
      },
      backgroundImage: {
        "batik-pattern":
          "radial-gradient(ellipse at 20% 50%, rgba(201,162,39,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(30,58,110,0.3) 0%, transparent 50%)",
      },
      boxShadow: {
        gold: "0 0 30px rgba(201, 162, 39, 0.3)",
        "gold-sm": "0 0 15px rgba(201, 162, 39, 0.2)",
        card: "0 25px 50px rgba(6, 13, 26, 0.6)",
        "card-sm": "0 10px 30px rgba(6, 13, 26, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
