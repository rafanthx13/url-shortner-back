const app = require('express')();
const consign = require('consign');
const db = require('./db/connection.js');
app.db = db;

var os = require('os');
separator = os.platform().startsWith('win') ? '\\' : '/'

consign({ cwd: process.cwd() + separator + 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./env/env.config.js')
  .then('./config/passport.js')
  .then('./errors')
  .then('./services')
  .then('./controller')
  .then('./routes')
  .into(app);

module.exports = app;
