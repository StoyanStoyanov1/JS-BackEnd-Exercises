const cats = require('./cats');
const fs = require("fs");
const http = require("http");
const querystring = require("querystring");


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
	} else if (req.url === '/styles/site.css') {
		fs.readFile(views.style, 'utf-8', (err, result) => {
			if (err) {
				res.statusCode = 404;
				return res.end();
			}

			res.writeHead(200, {'Content-Type': 'text/css'});
			res.write(result);
			res.end();
		})
	} else if (req.url === '/cats/add-cat' && req.method === 'GET') {
		fs.readFile(views.addCat, 'utf-8', (err, result) => {

			res.writeHead(200, {
				'content-type': 'text/html'
			});

			res.write(result);
			res.end();
		})
	} else if (req.url === '/cats/add-cat' && req.method === 'POST') {
		let body = '';

		req.on('data', (chunk) => {
			body += chunk;
		});

		req.on('close', () => {
			const parsedBody = querystring.parse(body);
			parsedBody.id = cats[cats.length - 1].id + 1

			cats.push(parsedBody);

			res.writeHead(302, {
				'location': '/'
			});
			res.end();
		})
	} else {
		res.writeHead(200, {
			'content-type': 'text/html'
		});

		res.write('<h1>404</h1>');
		res.end();
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



server.listen(5000)
console.log('Server is listening on port 5000...');
