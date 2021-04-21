```bash

# Instalar dependências
$ yarn install

# Criar diretório .husky
$ npx install

# Configurar git-commit-msg-linter
$ npx husky add .husky/commit-msg ".git/hooks/commit-msg \$1"

# Configurar lint-staged
$ npx husky add .husky/pre-commit "npx lint-staged"
```
