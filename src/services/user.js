const bcrypt = require("bcrypt");

module.exports = (app) => {
  const { ValidateError } = app.errors.messages;
  const { verifyDTO, exist } = app.errors.functions;

  // ["id", "user_name", "email", "password", "user_type" ]
  let user_dto = ["user_name", "email", "password", "user_type"];

  function getPasswordHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  const save = async (user) => {
    let [isValid, msg] = verifyDTO(user, user_dto);
    if (!isValid) throw new ValidateError(msg);

    const userInBD = await app
      .db("user")
      .where({ user_name: user.user_name })
      .first();
    if (exist(userInBD)) throw new ValidateError(`Invalid Data`);

    return app
      .db("user")
      .insert({ ...user, password: getPasswordHash(user.password) })
      .then((id) => {
        return { user_id: id[0], ...user };
      });
  };

  return { save };
};
