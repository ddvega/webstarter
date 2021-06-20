module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['airbnb-base'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'always',
    'import/no-default-export': 'error',
    // 'react/jsx-props-no-spreading': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'dot-notation': 'off',
    'arrow-body-style': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
};
