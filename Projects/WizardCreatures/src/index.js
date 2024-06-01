const express = require('express');
const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
	res.send(`Hello `)
} )

app.listen(2500, () => console.log('Listening on port http://localhost:2500'));