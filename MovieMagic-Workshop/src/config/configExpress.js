const express = require("express");
const path = require('path');


function configExpress (app) {
	app.use(express.static('public'));

}

module.exports = configExpress;
