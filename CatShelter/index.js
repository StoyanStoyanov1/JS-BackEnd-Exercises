const cats = require('./data/cats')
const http = require('http');
const homeTemplate = require('./views/home')
const siteCss = require('./views/site.css')

const server = http.createServer((req, res) => {
	if (req.url === '/') {

		res.writeHead(200, {
			'content-type': 'text/html'
		});

		res.write(homeTemplate(cats));
		res.end();
	} else if (req.url === '/styles/site.css') {
		res.writeHead(200, {
			'content-type': 'text/css'
		});

		res.write(siteCss);
		res.end();
	}

});

server.listen(5000);
console.log('Server started');
