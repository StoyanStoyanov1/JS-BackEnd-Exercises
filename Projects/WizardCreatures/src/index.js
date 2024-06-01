const path = require("path");

const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

const routes = require('./routes')

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.engine('hbs', handlebars.engine({
	extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.use(routes);

app.listen(2500, () => console.log('Listening on port http://localhost:2500'));