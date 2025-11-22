import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

const config = {
    files: ['**/*.ts'],
    rules: {
        ...tseslint.configs.recommended.rules
    },
    plugins: {
        '@typescript-eslint': tseslint
    },
    languageOptions: { parser: tsparser }
}
export default [config]
