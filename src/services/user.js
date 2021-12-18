const bcrypt = require("bcrypt");

module.exports = (app) => {
  const { ValidateError } = app.errors.messages;
  const { verifyDTO, exist } = app.errors.functions;

  let user_dto = ["user_name", "email", "password"];

  function getPasswordHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  const save = async (user) => {
    let [isValid, msg] = verifyDTO(user, user_dto);
    if (!isValid) throw new ValidateError(msg);

    const userNameInBD = await app
      .db("user")
      .where({ user_name: user.user_name })
      .first();
    if (exist(userNameInBD)) throw new ValidateError(`Duplicate User Name`);

    return app
      .db("user")
      .insert({ ...user, password: getPasswordHash(user.password) })
      .then((id) => {
        return { user_id: id[0]};
      });
  };

  return { save };
};
