module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["standard-with-typescript", "plugin:@typescript-eslint/recommended"],
  overrides: [
  ],
  plugins: [
    "@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  ignorePatterns: [".eslintrc.js"],
  parser: "@typescript-eslint/parser",

  rules: {
    "@typescript-eslint/no-empty-interface": 0,
    quotes: [
      "error",
      "double",
      {
        allowTemplateLiterals: true
      }
    ],
    semi: ["error", "always"],
    "@typescript-eslint/semi": ["error", "always"],
    "max-len": [
      "error",
      { code: 140 }
    ],
    "@typescript-eslint/quotes": [
      "error",
      "double",
      {
        allowTemplateLiterals: true
      }
    ],
    "@typescript-eslint/strict-boolean-expressions": [0],
    "no-useless-escape": 0,
    "prefer-regex-literals": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-misused-promises": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
  }
};
