module.exports = (app) => {

		const { ValidateError, DuplicateError,
			NotFoundError } = app.errors.messages;
		const { verifyDTO, exist, notExists,
			verifyUpdateDTO } = app.errors.functions;

		// {"product_id":1,"name":"Leite","type":"Alimento"}
		let product_dto = ['name', 'type']

		const getAll = () => {
			return app.db('product').select()
		};

		const getAllProductsOnlyName = () => {
			return app.db('product').select('name').orderBy('name', 'asc')
		};

		const save = async (product) => {
			let [isValid, msg] = verifyDTO(product, product_dto)
			if(!isValid)
				throw new ValidateError(msg)

			const productInBD = await app.db('product').where({ name: product.name }).first()
			if(exist(productInBD))
				throw new DuplicateError(`Product '${product.name}' already exists in the database`);

			return app.db('product').insert(product).then( id => {
				return { product_id: id[0], ...product }
			});
		};

		const update = async (id, product) => {
			delete product.product_id;
			let [isValid, msg] = verifyUpdateDTO(product, product_dto)
			if(!isValid)
				throw new ValidateError(msg)

			let productInBD = await app.db('product').where({ name: product.name}).first()
			if(exist(productInBD) && productInBD.product_id != id)
				throw new DuplicateError(`Product '${product.name}' already exists in the database`)

			return app.db('product').where({ product_id: id }).update(product)
				.then( wasUpdated => {
					if(!wasUpdated)
						throw new NotFoundError(`Product Not Found`)
					else
						return { product_id: id, ...product }
			});
		};

		const remove = (id) => {
			return app.db('product').where({ product_id: id }).del()
				.then( wasDeleted => {
					if(!wasDeleted)
						throw new NotFoundError(`Product Not Found`)
					return wasDeleted
			});
		};

		return { getAll, getAllProductsOnlyName,
		 save, update, remove };
}

