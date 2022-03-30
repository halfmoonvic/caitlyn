module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-idiomatic-order',
  ],
  plugins: [
    'stylelint-high-performance-animation',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
    'plugin/no-low-performance-animation-properties': true,
    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/no-unsupported-browser-features': [true, { severity: 'warning' }],
  },
};
