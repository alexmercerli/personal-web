import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F5F0",
        ink: "#1D2B36",
        muted: "#667586",
        industrial: "#6E9DB4",
        amberSoft: "#D9965F"
      },
      boxShadow: {
        studio: "0 24px 70px rgba(50, 65, 78, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
