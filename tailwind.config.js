module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito"],
      },
      colors: {
        background: "#55C1FF",
        primary: "#102E4A",
        detail: "#A682FF",
      },
      screens: {
        lg: "1080px",
      },
    },
  },
  plugins: [],
};
