const middlewareChain = require('./middlewareImplementation');

middlewareChain.use((req, res, next) => {
	req.user = 'Stenly';
	console.log('First middleware');
	next();
});

middlewareChain.use((req, res, next) => {
	req.age = 30;
	console.log('Second middleware');
	next();
});

middlewareChain.use((req, res, next) => {
	req.isAuthenticated = true;
	console.log('Third middleware')
});

middlewareChain.execute({}, {}, (req, res) => {
	console.log('Middleware CHAIN finnish!');
	console.log(req);
});