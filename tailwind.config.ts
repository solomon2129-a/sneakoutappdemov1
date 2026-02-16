const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Only grey scale
        dark: {
          bg: "#1a1a1a",
          surface: "#2a2a2a",
          border: "#3a3a3a",
        },
        light: {
          bg: "#f5f5f5",
          surface: "#ffffff",
          border: "#e0e0e0",
        },
      },
    },
  },
  plugins: [],
};

export default config;
