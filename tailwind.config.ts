import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FBFAF6",
        foreground: "#003399",
        text: "#7a7a7a",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        body: ['22px', { lineHeight: '32px' }],
        heading: ['28px', { lineHeight: '39px' }],
      },
    },
  },
  plugins: [],
};
export default config;
