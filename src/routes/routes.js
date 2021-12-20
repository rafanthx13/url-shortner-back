const passport = require('passport')

module.exports = (app) => {

    // is required to passport works
    app.use(passport.initialize())

    app.get('/', (req, res) => {
        res.status(200).send('URL Shortner Server');
    });

    app.use('/log', app.controller.log);

    app.use('/url', app.controller.url);

    app.use('/user', app.controller.user);

    app.post('/login', app.services.auth.signin)

    app.get('/auth', app.services.auth.authenticate)

}
