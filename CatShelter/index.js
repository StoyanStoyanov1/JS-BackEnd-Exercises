const fs = require("fs");

import cats from "./cats";


function render(view, dataArr, callback) {
	fs.readFile(view, "utf8", (err, data) => {
		if (err) {
			return callback(err);
		}

		const htmlResult = dataArr.map(data => {
			return Object.keys(data).reduce((acc, key) => {
				const pattern = new RegExp(`{{${key}}`, 'g');

				return acc.replace(pattern, data[key]);
			})
		})
	})
}