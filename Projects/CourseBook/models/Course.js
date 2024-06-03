const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	certificate: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	signUpList: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'User',
		}
	],
	owner: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	}
});

const Course = mongoose.model('Course', coursesSchema);