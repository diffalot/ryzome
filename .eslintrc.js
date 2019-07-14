module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
      project: "./tsconfig.json"
  },
  extends: ["standard-with-typescript", "plugin:react/recommended"],

  plugins: ['react']
}
