const messageBroker = require('./messageBroker')
messageBroker.subscribe('request', log);
function log(message) {
	console.log('Logger: ' + message);
}

module.exports = log;