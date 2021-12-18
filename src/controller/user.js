const express = require('express');

module.exports = (app) => {

	const router = express.Router();

  router.post('/', (req, res, next) => {
    app.services.user.save(req.body)
      .then(result => res.status(201).json(result))
      .catch(err => next(err) );
  });

	return router;

}
