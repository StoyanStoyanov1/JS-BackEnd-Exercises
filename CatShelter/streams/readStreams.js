const fs = require('fs');

const readStream = fs.createReadStream('./data/data.html', { encoding: 'utf-8'});

readStream.on('data', (chunk) => {
	console.log(chunk);
})
