module.exports = (app) => {

		const { ValidateError, DuplicateError, 
			NotFoundError } = app.errors.messages;
		const { verifyDTO, exist, 
			verifyUpdateDTO } = app.errors.functions;

		// {"city_id":1,"city":"Eunápolis","state":"Bahia","country":"Brasil"}
		let city_dto = ['city', 'state', 'country'];

		const getAll = () => {
			return app.db('city').select()
		};

		const getOnlyCity = () => {
			return app.db('city').select('city').orderBy('city', 'asc')
		};

		// to Test
		const findCityByName = (city) => {
			return app.db('city').where({ city }).select().first();
		};

		const save = async (city) => {
			let [isValid, msg] = verifyDTO(city, city_dto)
			if(!isValid)
				throw new ValidateError(msg)

			let cityInBD = await app.db('city').where({ city: city.city }).first()
			if(exist(cityInBD))
				throw new DuplicateError(`City '${city.city}' already exists in the database`)

			return app.db('city').insert(city).then( id => {
				return { city_id : id[0] , ...city }
			})
		};

		const checkExistCity = async (city_name, id) => {
			let cityInBD = await app.db('city').where({ city: city_name}).first()
			return exist(cityInBD) && cityInBD.city_id != id
		};

		const update = async (id, city) => {
			delete city.city_id
			let [isValid, msg] = verifyUpdateDTO(city, city_dto)
			if(!isValid)
				throw new ValidateError(msg)

			let cityInBD = await app.db('city').where({ city: city.city }).first()
			if(exist(cityInBD) && cityInBD.city_id != id)
				throw new DuplicateError(`City '${city.city}' already exists in the database`)

			return app.db('city').where({ city_id: id}).update(city)
				.then( wasUpdated => {
					if(!wasUpdated)
						throw new NotFoundError(`City Not Found`)
					else
						return { city_id: id, ...city }
				});
		};

		const remove = (id) => {
			return app.db('city').where({ city_id: id}).del()
				.then( wasDeleted => {
					if(!wasDeleted)
						throw new NotFoundError(`City Not Found`)
					return wasDeleted
				})
		};

		return { getAll, getOnlyCity, findCityByName,
			save, update, remove };
}

