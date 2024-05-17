const fs = require('fs');
const { EOL } = require('os');

const readStream = fs.createReadStream('./data/input.txt', {encoding: 'utf-8', highWaterMark: 100});
const wirteSteam = fs.createWriteStream('./data/copy.txt', {encoding: 'utf-8'});

readStream.on('data', (chunk) => {
	wirteSteam.write('--- new chung ---' + EOL)
	wirteSteam.write(chunk);
	wirteSteam.write(EOL);
});

readStream.on('close', () => {
	wirteSteam.end();
})