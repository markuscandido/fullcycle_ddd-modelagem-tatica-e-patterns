# Configurando o projeto

```shell
# instalar o typescript
npm i typescript --save-dev

# iniciar um projeto typescript
npx tsc --init

# tsconfig.json alterar
# "incremental": true,
# "outDir": "./dist",
# no final do arquivo, depois de (compilerOptions), incluir:
#"include": [
#    "src/**/*.ts"
#  ],

# instalar o tslint
npm i tslint --save-dev

# inicializar o tslint
npx tslint --init

# instalar test runner
npm i -D jest @types/jest ts-node --save-dev

# instalar o swc
npm i -D @swc/jest @swc/cli @swc/core

# inicializar jest
npx jest --init
```
