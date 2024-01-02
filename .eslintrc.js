module.exports = {
    root: true,
    env: {
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:tailwindcss/recommended',
        'prettier',
        'plugin:vue/vue3-recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: false,
        },
    },
    plugins: ['vue', '@typescript-eslint', 'unused-imports', 'prettier'],
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: [4],
        'vue/max-len': [
            'error',
            {
                code: 150,
                ignoreHTMLAttributeValues: true,
            },
        ],
    },
}
