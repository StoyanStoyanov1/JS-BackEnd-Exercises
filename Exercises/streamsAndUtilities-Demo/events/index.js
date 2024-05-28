const events = require('events');

const eventEmitter = new events.EventEmitter();

eventEmitter.on('request', (eventData) => {
	console.log('on request', eventData);
});

eventEmitter.emit('request', 'Request emitted');

