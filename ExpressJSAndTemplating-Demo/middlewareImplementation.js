const middlewares = [];

function use(middleware) {
	middlewares.push(middleware);
}

function execute(req, res, callback) {
	let index = 0;

	const next = () => {
		if (index >= middlewares.length) {
			return callback(req, res);
		}

		middlewares[index++](req, res, next)
	}

	next();
}

module.exports = {
	use,
	execute,
}