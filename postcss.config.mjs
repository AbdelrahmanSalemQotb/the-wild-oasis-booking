/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: ["last 4 versions", "> 1%", "IE 10"],
    },
  },
};

export default config;
