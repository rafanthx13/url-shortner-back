const express = require('express');

module.exports = (app) => {

  const router = express.Router();

  router.get('/', app.config.passport.authenticate(), (req, res, next) => {
    if(req.user){
      // get from app: token load in passport
      app.services.url.getByUserId(req.user.user_id)
      .then(result => res.status(200).json(result))
      .catch(err => next(err) );
    } else {
      // get from anonymous
      app.services.url.getAll()
      .then(result => res.status(200).json(result))
      .catch(err => next(err) );
    }
  });

  router.get('/top-urls', (req, res, next) => {
    app.services.url.getTopUrls()
      .then(result => res.status(200).json(result))
      .catch(err => next(err) );
  });

  router.get('/short/:shortUrl', (req, res, next) => {
    app.services.url.getShortUrl(req.params.shortUrl)
      .then(result => res.status(200).json(result))
      .catch(err => next(err) );
  });

  router.post('/', app.config.passport.authenticate(), (req, res, next) => {
    let user_id = ''
    if(req.user)
      user_id = req.user.user_id
    app.services.url.save(req.body, user_id)
      .then(result => res.status(201).json(result))
      .catch(err => next(err) );
  });

  router.delete('/:id', app.config.passport.authenticate(), (req, res, next) => {
    app.services.url.remove(req.params.id, req.user.user_id)
      .then(result => res.status(204).json({result}))
      .catch(err => next(err) );
  });

  return router;

}
