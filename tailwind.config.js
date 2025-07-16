// tailwind.config.js
module.exports = {
  content: ["./public/**/*.html", "./public/**/*.js"],

  theme: {
    extend: {
      colors: {
        brand: "#1e40af", // brend uchun ko‘k
        accent: "#f59e0b", // aksent uchun sariq
        searchborder: "#ebf0ff",
        textWhite: "#22262a",
        usercolor: "#262626",
        headerbottom: "#fafafb",
        hovertext: "#40bfff",
      },
    },
  },
  plugins: [],
};
