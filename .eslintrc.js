module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "@nuxtjs",
    "plugin:nuxt/recommended",
    "eslint:recommended",
    "prettier/vue",
    "plugin:prettier/recommended",
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    semi: [2, "always"],
    quotes: [0, "single", "avoid-escape"],
    "comma-dangle": ["error", "always-multiline"],
    "vue/html-self-closing": [
      "error",
      {
        html: { normal: "never", void: "always" },
      },
    ],
  },
};
