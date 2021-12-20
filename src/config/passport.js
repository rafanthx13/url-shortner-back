const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

const { API_SECRET } = require('../env/env.config.js')

module.exports = (app) => {

	const params = {
    secretOrKey: API_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  // Get some user data from bcrypt-token and load full data here
  const strategy = new Strategy(params, (payload, done) => {
    app.db('user').where({ user_id: payload.user_id })
      .select(['user_id', 'user_name', 'email', 'user_type']).first()
      .then(user => done(null, user ? { ...user } : false) ) // get data from 'req.user'
      .catch(err => done(err, false) )
  });

  passport.use(strategy);

  return {
    authenticate: () =>
      passport.authenticate('jwt', { session: false }),
  };

}
