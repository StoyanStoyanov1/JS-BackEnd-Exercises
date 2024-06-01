const path = require('path');

const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const mongoose = require('mongoose');
const {authMiddleware} = require('./middleware/authMiddleware');


app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(authMiddleware);

app.engine('hbs', handlebars.engine({
	extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.use(routes);

mongoose.connect('mongodb://localhost:27017/magmaHaven');

mongoose.connection.on('connected', () => console.log('DB is connected'));
mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));
mongoose.connection.on('error', (err) => console.log(err));

app.listen(3000, () => console.log('Server is running on port http://localhost:3000'));
