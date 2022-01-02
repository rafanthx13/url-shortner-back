const { DB_HOST, DB_PORT, DB_USER, DB_PASS,
	DB_NAME } = require("../env/env.config.js");

console.log('DB_USER', DB_USER)
console.log('DB_PASS', DB_PASS)

// module.exports = app = {
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
