const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdCourses: [{
		type: mongoose.Types.ObjectId,
		ref: 'Course',
	}],
	signedUpCourses: [{
		type: mongoose.Types.ObjectId,
		ref: 'Course',
	}],
});

userSchema.pre('save', async function () {
	this.password = await bcrypt.hash(this.password, 12);
});

userSchema.virtual('rePassword')
	.set(function (value) {
	if (value !== this.password) {
		throw new Error('Passwords do not match');
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;