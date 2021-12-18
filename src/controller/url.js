const express = require('express');

module.exports = (app) => {

  const router = express.Router();

  router.get('/', (req, res, next) => {
    app.services.url.getAll()
      .then(result => res.status(200).json(result))
      .catch(err => next(err) );
  });

  router.get('/:id', (req, res, next) => {
    app.services.url.getByUserId(req.params.id, req.body)
      .then(result => res.status(200).json(result))
      .catch(err => next(err) );
  });

  router.get('/short/:shortUrl', (req, res, next) => {
    app.services.url.getShortUrl(req.params.shortUrl)
      .then(result => res.status(200).json(result))
      .catch(err => next(err) );
  });

  router.post('/', (req, res, next) => {
    console.log('hre');
    app.services.url.save(req.body)
      .then(result => res.status(201).json(result))
      .catch(err => next(err) );
  });

  router.put('/:id', (req, res, next) => {
    app.services.url.update(req.params.id, req.body)
      .then(result => res.status(200).json(result))
      .catch(err => next(err) );
  });

  router.delete('/:id', (req, res, next) => {
    app.services.url.remove(req.params.id)
      .then(result => res.status(204).json({result}))
      .catch(err => next(err) );
  });

  return router;

}