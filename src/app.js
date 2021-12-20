const app = require('express')();
const consign = require('consign');
const db = require('./db/connection.js');
app.db = db;

consign({ cwd: process.cwd() + '/src', verbose: false })
  .include('./config/middlewares.js')
  .then('./env/env.config.js')
  .then('./config/passport.js')
  .then('./errors')
  .then('./services')
  .then('./controller')
  .then('./routes')
  .into(app);

module.exports = app;
