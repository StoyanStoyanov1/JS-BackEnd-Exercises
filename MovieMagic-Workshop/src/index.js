const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('Home page')
})

app.listen(5500, () => console.log('Service is listening on port 5500...'));