const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

const cats = [
	{
		name: 'Navcho',
		age: 8,
		breed: 'persian',
	},
	{
		name: 'Sisa',
		age: 14,
		breed: 'angora',
	},
	{
		name: 'Mishy',
		age: 6,
		breed: 'angora',
	}
]

const app = express();

app.engine('hbs', handlebars.engine({
	extname: 'hbs',
}));
app.set('view engine', 'hbs');

app.use(express.static('public'))

app.use((req, res, next) => {
	console.log('REQ URL: ' + req.url);

	next();
});

app.get('/', (req, res) => {
	res.render('home', { name: 'Home' });
});

app.get('/cats', (req, res) => {
	const filteredCats = cats.filter(cat => cat.breed === 'angora');

	res.render('cats', { cats: filteredCats });
});

app.post('/cats', (req, res) => {
	// TODO: Create new cat

	res.redirect('/cats');
});

app.get('/cats/download', (req, res) => {
	const imagePath = path.join(__dirname, 'images', 'cats.jpg');

	res.download(imagePath);

});

app.get('/cats/:catName', (req, res) => {
	const currentCatName = req.params.catName;

	res.send(`Cat individual page - ${currentCatName}`)
});

app.get('/test', (req, res) => {
	res.json({ name: 'Pesho' });
});

app.all('/dogs', (req, res) => {
	res.send('This is an application for cats!!!');
});

app.all('*', (req, res) => {
	res.status(404).send('Page not found - 404');
});

app.listen(7000, () => console.log('Server is listening on port 7000...'));

