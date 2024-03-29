module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 'off',
    'lines-between-class-members': 'off',
    'max-len': ['error', { "code": 160 }],
    'class-methods-use-this': 'off',
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": ["error"],
    "import/prefer-default-export": "off",
  },
};
