module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-new': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-unresolved': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
