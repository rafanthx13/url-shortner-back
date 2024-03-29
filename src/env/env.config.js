let environment = process.NODE_ENV || 'development'

if(environment == 'development'){
  let dotenv = require('dotenv').config({path: './src/env/env_' + 'development' + '.env'});
}

module.exports = {
  API_SECRET:   process.env.API_SECRET,
  PORT: 		process.env.PORT,
  DB_HOST: 		process.env.DB_HOST,
  DB_PORT: 		process.env.DB_PORT,
  DB_NAME: 		process.env.DB_NAME,
  DB_USER: 		process.env.DB_USER,
  DB_PASS: 		process.env.DB_PASS,
};
