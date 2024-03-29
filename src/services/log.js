module.exports = (app) => {
  const { ValidateError } = app.errors.messages;
  const { verifyDTO } = app.errors.functions;

  const table = 'log_access_url'
  const log_dto = ["url_id"]

  const getAll = () => {
    return app.db(table).select();
  };

  const getByUrlId =  async (url_id) => {
    return app.db(table).where({url_id});
  };

  const getCount =  async (url_id) => {
    return app.db(table).count('url_id as count').where({url_id});
  };

  const save = async (log) => {
    let [isValid, msg] = verifyDTO(log, log_dto);
    if (!isValid) throw new ValidateError(msg);

    console.log(log.url_id)
    await app.db('url_links').increment('count').where('url_id', log.url_id)

    return app
      .db(table)
      .insert(log)
      .then((id) => {
        return { url_id: id[0], ...log };
      });
  };

  return { getAll, getByUrlId, getCount, save };

};


