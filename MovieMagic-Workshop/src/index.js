const express = require('express');
const mongoose = require('mongoose');

const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const routes = require('./routes');

const app = express();
const port = 1000;

configHandlebars(app);
configExpress(app);

app.use(routes)

mongoose.connect('mongodb://localhost:27017/magic-movies').then(() => {
	console.log('MongoDB Connected');

	app.listen(port, () => console.log('Server is running on port', port));
});