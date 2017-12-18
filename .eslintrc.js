module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
    'jest': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'jest'
  ],
  'rules': {
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'react/jsx-indent': [
      'error',
      2
    ],
    'react/jsx-indent-props': [
      'error',
      2
    ],
    'react/jsx-closing-bracket-location': [
      'error',
      'tag-aligned'
    ],
    'react/sort-comp': [1],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ]
  }
};
