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
        arabic: ["var(--font-arabic)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      colors: {
        primaryDark: "#201F24",
        primaryLight: "#F8F5F0",
        primaryLightGrey: "#B4B3B8",
        primaryDarkGrey: "#625F70",
        secondaryBrown: "#F1CDAB",
        secondaryTeal: "#81C9D7",
        secondaryGreen: "#277C77",
      },
    },
  },
  plugins: [],
};
export default config;
