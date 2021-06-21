module.exports = {
  root: true,
  plugins: ['react', 'prettier'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb/base'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 0,
    // 'import/no-default-export': 'error',
    'react/jsx-props-no-spreading': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'dot-notation': 'off',
    'arrow-body-style': 'off',
    'react/require-default-props': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
};
