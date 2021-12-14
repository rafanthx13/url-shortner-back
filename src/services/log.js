module.exports = (app) => {

		const { ValidateError, 
			NotFoundError } = app.errors.messages;
		const { verifyDTO, exist, notExists,
			verifyUpdateDTO } = app.errors.functions;

		// {"log_id":3,"product":"Ovo","price":"3,00",
		// "shop":"loja-test","city":"Uberlândia","date":"13/02/2020"}
		let log_dto = ['product', 'price', 'shop', 'city', 'date']

		const getAllFormatedLogs = () => {
			return app.db.raw(`SELECT log_id, product, 
    REPLACE( REPLACE( REPLACE( FORMAT(price, 2), ',', '$'), '.', ','), '$', '.') as price,
    shop, city, date FROM log`);
		};

		const search = (product, city) => {
			if(notExists(product) || notExists(city))
				throw new ValidateError('Product or City Not Exists')

			return app.db('log').where({ product: product, city : city }).select()
		};

		const save = (log) => {
			let [isValid, msg] = verifyDTO(log, log_dto)
			if(!isValid)
				throw new ValidateError(msg)

			return app.db('log').insert(log).then( id => {
				return { log_id: id[0], ...log }
			});
		};

		const update = (id, log) => {
			delete log.log_id;
			let [isValid, msg] = verifyUpdateDTO(log, log_dto)
			if(!isValid)
				throw new ValidateError(msg)

			return app.db('log').where({ log_id: id }).update(log)
			.then( wasUpdated => {
				if(!wasUpdated)
					throw new NotFoundError(`Log Not Found`)
				else
					return { log_id: id, ...log }
			});
		};

		const remove = (id) => {
			return app.db('log').where({ log_id: id }).del()
				.then( wasDeleted => {
					if(!wasDeleted)
						throw new NotFoundError(`Log Not Found`)
					return wasDeleted
				})
		};

		return { getAllFormatedLogs, search,
		 save, update, remove };
}