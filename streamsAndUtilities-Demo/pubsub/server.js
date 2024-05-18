const http = require('http');
const messageBroker = require('./messageBroker');

const logger = require('./logger')
const reportingService = require('./reportingService');

const server = http.createServer((req, res) => {
	messageBroker.publish('request', `URL: ${req.url}; Method: ${req.method}`);

	if(req.url === '/register') {
		messageBroker.publish('user-register', {username: 'Stenly'});
	}

	logger(`URL: ${req.url}; METHOD: ${req.method}`);
	reportingService(`URL: ${req.url}; METHOD: ${req.method}`);

	res.end();
});

server.listen(5000);
console.log('Server started on port 5000...');