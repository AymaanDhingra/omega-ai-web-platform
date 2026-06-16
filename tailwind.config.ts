import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17201d",
        field: "#eef3ef",
        panel: "#fbfdfb",
        line: "#d8e3dc",
        teal: "#0f766e",
        mint: "#2f9e72",
        amber: "#b7791f",
        ember: "#b42318",
        grape: "#6d5dd3"
      },
      boxShadow: {
        panel: "0 12px 34px rgba(28, 43, 35, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
