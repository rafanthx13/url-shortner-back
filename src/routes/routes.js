module.exports = (app) => {

    app.get('/', (req, res) => {
        res.status(200).send('URL Shortner Server');
    });

    // Usamos passport.autenticate para por em "req.user" no controller, para podemos usar para ver se a pessao tem ou nâo
    // Autorizaçâo apra executar uma request
    // É passao o id no token (SECRET), e no banco agente busca por esse usar
    //  app.config.passport.authenticate() to use passport to autenticate
	  app.use('/city', app.controller.city);

    app.use('/log', app.controller.log);

    app.use('/url', app.controller.url);

    app.use('/user', app.controller.user);

    // Especifics

    app.post('/login', app.services.auth.signin)

    // É para altorizar cada passo do usuário no front
    app.get('/auth', app.services.auth.authenticate)

}
