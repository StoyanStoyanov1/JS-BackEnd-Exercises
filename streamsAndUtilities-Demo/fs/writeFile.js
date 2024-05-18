const fs = require('fs');

fs.writeFile('./created.txt', 'Hello World', {encoding: "utf-8"}, (err) => {
	if (err) {
		return;
	}

	console.log('File is created')
})