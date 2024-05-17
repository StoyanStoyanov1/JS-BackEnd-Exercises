const fs = require('fs');

const writeStream = fs.createWriteStream('./data/input.txt', {encoding: 'utf-8'});

for (let i = 0; i < 1000; i++) {
	writeStream.write(Math.random() + '\n');
}

writeStream.end();

