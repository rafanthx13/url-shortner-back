# Documentação de como rodar o projeto

## BackEnd em Node e configurar Banco de dados

### Acesso ao banco de dados

+ O primeiro passo é configurar o acesso ao banco de dados. 
+ Para este projeto foi usado o 'mysql'. 
+ A biblioteca do node para acessar o banco  foi o `knex`.
+ Para mudar o banco acesse `src/db/knexfile.js` e mude `client`

````js
// knexfile.js
module.exports = {

	main: {
		client: 'mysql',
		connection: {
			host : DB_HOST,
			port: DB_PORT,
			database: DB_NAME,
			user: DB_USER,
			password: DB_PASS
		},
		pool: {
			min: 2,
			max: 10
		},
		seeds: {
			  directory: './src/db/seeds'
		  },
		migrations: {
			  directory: './src/db/migrations',
			},

	}

};
````

### Environment

As variáveis de ambiente usadas são aquelas que estão no arquivo `src/env_development.env`

O arquivo `env_template.env` contém o  template de como deve ser esse arquivo

````env
# env_template.env
# LOCAL MAIN ENV

API_SECRET=
PORT=

# DATA_BASE

DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
````

Para este projeto foi usada os seguintes dados ( faltando DB_USER e DB_PASS que deve ser de acordo com seu próprio banco de dados)

````
# env_development.env
# DEVELOPMENT ENV

API_SECRET=REZERO
PORT=3000

# DATA_BASE

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=
DB_PASS=
DB_NAME=url_shortner

````

### Dump Banco de Dados

A estrutura do banco de dados está definido em `src/db/db-structure.sql` 

+ Esse arquivo cria o schema `url_shortner` e suas respectivas tabelas usadas no projeto

Execute esse script sql no mysql.

### Executar Back End

Para executar o back-end é necessário

+ Condição número 1: Mysql está em execução
+ Condição 2: ter `node` e `npm` instalados

**Instalar dependências do node**

```sh
npm i
```

**Executar**

```sh
npm run start
```

deve aparecer a mensagem a seguir

```
App Listening on Port: 3000.
```

Onde 300 é o número da porta escolhido no `env_development.env`

## FrontEnd em Vue

**Instalar dependências**

```sh
npm install
```

**Executar Aplicação**
```sh
npm run serve
```



## Melhorias

**Back End**
+ Migrations e Seeds com Knex 
+ Testes da API com Jest
+ Documentar API com `swagger`
+ Realizar mais testes sobre a API

**FrontEnd**
+ Melhorar e Otimizar o redirect (deixar mais rápido e melhorar a tela de loading
+ Responsividade
+ Loading na espera de consultas assíncronas
+ Teste E2E com Cypress



