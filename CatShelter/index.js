const cats = require('./cats');
const fs = require("fs");
const http = require("http");


const views = {
	home: './views/home.html',
	style: './views/site.css',
	addCat: './views/add-cat.html',
	cat: './views/partials/cat.html'
}

const server = http.createServer((req, res) => {
	if (req.url === '/') {
		render(views.cat, cats, (err, catResult) => {
			if (err) {
				res.statusCode = 404;
				return res.end();
			}

			render(views.home, [{cats: catResult}], (err, result) => {
				res.writeHead(200, {'Content-Type': 'text/html'});

				res.write(result);
				res.end();
			});
		});
	}


});


function render(view, dataArr, callback) {
	fs.readFile(view, "utf8", (err, result) => {
		if (err) {
			return callback(err);
		}

		const htmlResult = dataArr.map(data => {
			return Object.keys(data).reduce((acc, key) => {
				const pattern = new RegExp(`{{${key}}}`, 'g');

				return acc.replace(pattern, data[key]);
			}, result);
		}).join('\n')

		callback(null, htmlResult);
	})
}



server.listen(5500)
console.log('Server is listening on port 5500...');
