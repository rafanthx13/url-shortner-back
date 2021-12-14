const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { API_SECRET } = require("../env/env.config.js");

module.exports = (app) => {
  const { notExists } = app.errors.functions;

  const signin = async (req, res) => {
    const user = await app
      .db("user")
      .where({ user_name: req.body.user_name })
      .select()
      .first();

    if (notExists(user))
      res
        .status(400)
        .send({ auth: false, token: null, message: "User Invalid" });

    if (bcrypt.compareSync(req.body.password, user.password)) {
      let payload = { id: user.id, password: user.password };
      let jwtOptions = { expiresIn: "24h" }; // expires in 24 hours
      let token = jwt.sign(payload, API_SECRET, jwtOptions);
      res
        .status(200)
        .send({ auth: true, token: token, user_type: user.user_type });
    } else {
      res
        .status(400)
        .send({ auth: false, token: null, message: "Fail in JWT Validation" });
    }
  };

  const authenticate = (req, res) => {
    let token = req.headers["authorization"];
    if (token.startsWith("Bearer ")) token = token.slice(7, token.length);
    if (!token)
      return res
        .status(400)
        .send({ auth: false, message: "No token provided." });
    jwt.verify(token, API_SECRET, function (err) {
      if (err)
        return res
          .status(400)
          .send({ auth: false, message: "Failed to authenticate token." });
      res.status(200).send({});
    });
  };

  return { signin, authenticate };
};
