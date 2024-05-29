const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken')


const User = require('../models/User');

exports.register = async (userData) => {
	if (userData.password !== userData.rePassword) {
		throw new Error('Password mismatch');
	}

	const user = await User.findOne({email: userData.email});
	if (user) {
		throw new Error('User already exists');
	}

	User.create(userData)
};

exports.login = async ({email , password}) => {
	//Get user from db
	const user = await User.findOne({email});

	if (!user) {
		throw new Error('Username or password is invalid');
	}
	// Check password
	const isValid = await bcrypt.compare(password, user.password)

	if (!isValid) {
		throw new Error('Username or password is invalid');
	}

	// generate Token

	await jwt.sign();

	// return token

}
