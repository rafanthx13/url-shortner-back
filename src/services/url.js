module.exports = (app) => {

  const { ValidateError, DuplicateError, NotFoundError } = app.errors.messages;
  const { verifyDTO, exist, notExists, verifyUpdateDTO } = app.errors.functions;

  const table = 'url_links'

  function generateRandomString(string_length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 62
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < string_length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  let url_dto = ["actual_url"]

  const getAll = () => {
    return app.db(table).select();
  };

  // Testar se voltar vazio [] o que faz, e
  const getByUserId =  async (user_id) => {
    return app.db(table).where({user_id});
  };

  // getShortUrl
  const getShortUrl = async (shortUrl) => {
    let shortUrlInBD = await app.db(table).where({ go_to_url: shortUrl }).first();
    if (exist(shortUrlInBD)){
       await app.db('log_access_url').insert({ url_id: shortUrlInBD.url_id });
       console.log('o que pediur')
       console.log(shortUrlInBD)
	   return shortUrlInBD
    } else {
		throw new NotFoundError(`Short URL not found`); 
	}
  };

  const save = async (url) => {
	if(url.user_id == ''){
        delete url.user_id;
	}
    let [isValid, msg] = verifyDTO(url, url_dto);
    if (!isValid) throw new ValidateError(msg);

	console.log('foi validado')

    url.go_to_url = generateRandomString(5)
	console.log('urk_go', url);

    while(true){
      let UrlInBD = await app.db(table).where({ actual_url: url.go_to_url }).first();
      if (exist(UrlInBD)){
        url.go_to_url = generateRandomString(5)
      } else {
        break
      }
    }

	console.log('passou do while')

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

  return { getAll, getByUserId, getShortUrl, save, update, remove };
};
