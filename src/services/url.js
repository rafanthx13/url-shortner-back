module.exports = (app) => {
  const { ValidateError, DuplicateError, NotFoundError } = app.errors.messages;
  const { verifyDTO, exist, notExists, verifyUpdateDTO } = app.errors.functions;

  const table = 'url_links'

  // let url_dto = ["actual_url", "go_to_url",
  // "user_id"]
  let url_dto = ["actual_url", "go_to_url"]

  const getAll = () => {
    return app.db(table).select();
  };

  // Testar se voltar vazio [] o que faz, e
  const getByUserId =  async (user_id) => {
    return app.db(table).where({user_id});
  };

  const save = async (url) => {
    let [isValid, msg] = verifyDTO(url, url_dto);
    if (!isValid) throw new ValidateError(msg);

    const UrlInBD = await app.db(table).where({ actual_url: url.actual_url }).first();
    if (exist(UrlInBD))
      throw new DuplicateError(
        `Url '${url.actual_url}' already exists in the database.`
      );

    return app
      .db(table)
      .insert(url)
      .then((id) => {
        return { url_id: id[0], ...url };
      });
  };

  // Tem que verificar se o usuário que vai deletar/update é o usauário dessa row
  // Por enquanto deixa sem
  const update = async (id, url) => {
    delete url.url_id;
    let [isValid, msg] = verifyUpdateDTO(url, url_dto);
    if (!isValid) throw new ValidateError(msg);

    let urlInBD = await app.db(table).where({ actual_url: url.actual_url }).first();
    if (exist(urlInBD) && urlInBD.url_id != id)
      throw new DuplicateError(
        `url '${url.actual_url}' already exists in the database`
      );

    return app
      .db(table)
      .where({ url_id: id })
      .update(url)
      .then((wasUpdated) => {
        if (!wasUpdated) throw new NotFoundError(`url Not Found`);
        else return { url_id: id, ...url };
      });
  };

  const remove = (id) => {
    return app
      .db(table)
      .where({ url_id: id })
      .del()
      .then((wasDeleted) => {
        if (!wasDeleted) throw new NotFoundError(`URL Not Found`);
        return wasDeleted;
      });
  };

  return { getAll, getByUserId, save, update, remove };
};
