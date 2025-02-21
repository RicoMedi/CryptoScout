import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/pagination.js",
  ],

  theme: {
    extend: {
      colors: {
        blueprint: "#131a33", // Midnight blue
        background: "e0e1dd", 
        accent: "#131a33", // Midnight blue
        primary: "#ffd700", // Gold
        secondary: "#4db5ff", // Electric blue
        text: "#e0e0e0", // Soft white
      },
      borderColor: {
        DEFAULT: "#131a33", // Midnight blue
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
