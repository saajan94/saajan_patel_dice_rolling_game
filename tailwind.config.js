/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B283A",
        secondary: "#F5F5F5",
        accent: "#3C6997",
        neutral: "#1F1820",
        "base-100": "#474748",
        info: "#4A4E74",
        success: "#55E0F0",
        warning: "#DEB617",
        error: "#F07587",
      },
    },
  },
  plugins: [],
};
