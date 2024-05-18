const fs = require('fs');

fs.readFile('./data.txt', {encoding: "utf-8"}, (err, text) => {
	if (err) {
		console.log('There is a problem with the filesystem');
		return;
	}

	console.log(text);
	}
)