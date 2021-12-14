module.exports = (app) => {
  const { ValidateError, DuplicateError, NotFoundError } = app.errors.messages;
  const { verifyDTO, exist, notExists, verifyUpdateDTO } = app.errors.functions;

  // {"shop_id":1,"name":"loja-test","cep":"38408-194",
  // "number":508,"street":"Izaura Augusta Pereira",
  // "neighbor":"Santa Mônica","city":"Uberlândia"}
  let shop_dto = ["name", "cep", "number", "street", "neighbor", "city"];

  const getAll = () => {
    return app.db("shop").select();
  };

  const getOnlyShop = () => {
    return app.db("shop").select("name").orderBy("name", "asc");
  };

  const getShopByCity = (city) => {
    if (notExists(city)) throw new ValidateError("City is invalid data");

    return app.db("shop").where({ city }).select("name").orderBy("name", "asc");
  };

  const save = async (shop) => {
    let [isValid, msg] = verifyDTO(shop, shop_dto);
    if (!isValid) throw new ValidateError(msg);

    const shopInBD = await app.db("shop").where({ name: shop.name }).first();
    if (exist(shopInBD))
      throw new DuplicateError(
        `Shop '${shop.name}' already exists in the database.`
      );

    return app
      .db("shop")
      .insert(shop)
      .then((id) => {
        return { shop_id: id[0], ...shop };
      });
  };

  const update = async (id, shop) => {
    delete shop.shop_id;
    let [isValid, msg] = verifyUpdateDTO(shop, shop_dto);
    if (!isValid) throw new ValidateError(msg);

    let shopInBD = await app.db("shop").where({ name: shop.name }).first();
    if (exist(shopInBD) && shopInBD.shop_id != id)
      throw new DuplicateError(
        `Shop '${shop.name}' already exists in the database`
      );

    return app
      .db("shop")
      .where({ shop_id: id })
      .update(shop)
      .then((wasUpdated) => {
        if (!wasUpdated) throw new NotFoundError(`Shop Not Found`);
        else return { shop_id: id, ...shop };
      });
  };

  const remove = (id) => {
    return app
      .db("shop")
      .where({ shop_id: id })
      .del()
      .then((wasDeleted) => {
        if (!wasDeleted) throw new NotFoundError(`Shop Not Found`);
        return wasDeleted;
      });
  };

  return { getAll, getOnlyShop, getShopByCity, save, update, remove };
};
