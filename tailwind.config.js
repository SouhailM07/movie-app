/** @type {import(tailwindcss).Config} */ module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        safeAreaContainerColor: "rgb(30 41 59)",
        headerColor: "rgb(51 65 85)"
      }
    }
  },
  plugins: [],
};
