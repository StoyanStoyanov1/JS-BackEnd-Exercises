const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use(routes)

app.listen(5000, () => console.log('App is listening on http://localhost:5000'));