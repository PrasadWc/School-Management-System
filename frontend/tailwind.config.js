const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        72: "18rem",
        80: "20rem",
        96: "24rem",
        // Add more custom spacing values as needed
      },
      maxWidth: {
        customwidth: "1800px",
      },
    },
  },
  plugins: [],
});
