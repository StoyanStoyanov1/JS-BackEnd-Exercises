const fs = require('fs/promises');

fs.readdir('.', 'utf-8')
	.then(res => console.log(res));

