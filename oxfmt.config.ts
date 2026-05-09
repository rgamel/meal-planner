import { defineConfig } from 'oxfmt';

export default defineConfig({
    $schema: './node_modules/oxfmt/configuration_schema.json',
    printWidth: 120,
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    sortTailwindcss: {
        config: './tailwind.config.js',
    },
    sortPackageJson: true,
    sortImports: {
        groups: [
            'type-import',
            ['value-builtin', 'value-external'],
            'type-internal',
            'value-internal',
            ['type-parent', 'type-sibling', 'type-index'],
            ['value-parent', 'value-sibling', 'value-index'],
            'unknown',
        ],
    },
    removeUnusedImports: true,
    ignorePatterns: [],
});
