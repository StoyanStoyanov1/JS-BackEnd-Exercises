const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
	title: {
		type: String,
		minLength: 5,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	certificate: {
		type: String,
		minLength: 2,
		required: true,
	},
	image: {
		type: String,
		match: /^https?:\/\//,
		required: true,
	},
	description: {
		type: String,
		minLength: 10,
		required: true,
	},
	price: {
		type: Number,
		min: 0,
		required: true,
	},
	createdAt: { Date },
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

coursesSchema.pre('save', () => {
	if (!this.createdAt) {
		this.exports = Date.now();
	}
})

const Course = mongoose.model('Course', coursesSchema);

module.exports = Course;