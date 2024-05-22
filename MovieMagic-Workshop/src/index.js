const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const routes = require('./routes');

const app = express();
const port = 5500;

configHandlebars(app);
configExpress(app);

app.use(routes)

app.listen(port, () => console.log(`Service is listening on port ${port}...`));