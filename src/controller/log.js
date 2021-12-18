const express = require("express");

module.exports = (app) => {
  const router = express.Router();

  router.get("/", (req, res, next) => {
    app.services.log
      .getAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.get("/:id/count", (req, res, next) => {
    app.services.log
      .getCount(req.params.id)
      .then((result) => res.status(200).json(result[0]))
      .catch((err) => next(err));
  });

  // get by url_id
  router.get("/:id", (req, res, next) => {
    app.services.log
      .getByUrlId(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.post("/", (req, res, next) => {
    app.services.log
      .save(req.body)
      .then(() => res.status(201).json(req.body))
      .catch((err) => next(err));
  });

  return router;
};
