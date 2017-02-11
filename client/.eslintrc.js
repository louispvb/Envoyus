module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'mocha': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:import/errors',
        'airbnb-base',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended'
    ],
    'parserOptions': {
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'plugins': [
        'react',
        'import',
        'jsx-a11y'
    ],
    'globals': {
        'deepEqual': true,
        'describe': true,
        'document': true,
        'it': true,
        'expect': true,
        'module': true,
        'test': true,
        'window': true,
        'sinon': true,
        'console': true,
        'require': true
    },
    'rules': {
        'import/first': 2,
        'import/newline-after-import': 2,
        'import/no-duplicates': 2,
        'import/no-unresolved': 1,
        'import/order': 2,
        'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }]: 1,
        'semi': ['warn', 'always'],
        'space-before-function-paren': 1,
        'no-var': 1,
        'prefer-default-export': 0,
        'no-unused-vars': 1,
        'quotes': [2, 'single'],
        'comma-dangle': ['error', 'never']
    }
};
