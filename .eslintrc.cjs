module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "plugins": [
        'svelte3'
    ],
    "overrides": [
        {
            files: ['*.svelte3'],
            processor: 'svelte3/svelte3'
        }
    ],
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
    }
}
