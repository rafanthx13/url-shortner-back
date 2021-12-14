module.exports = (app) => {

    app.get('/', (req, res) => {
        res.status(200).send('URL Shortner Server');
    });

    //  app.config.passport.authenticate() to use passport to autenticate
	app.use('/city', app.config.passport.authenticate(), app.controller.city);

    app.use('/url-links', app.controller.url_links);

    app.use('/user', app.controller.user);

    // Especifics

    app.post('/login', app.services.auth.signin)

    app.get('/auth', app.services.auth.authenticate)

}
