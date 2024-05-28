const express = require('express');
const handlebars = require('express-handlebars');

const routes = require('./routes');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));


app.engine('hbs', handlebars.engine({
	extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use(routes);

app.use(routes)

app.listen(5000, () => console.log('App is listening on http://localhost:5000'));