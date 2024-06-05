const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const volcanoSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	elevation: {
		type: Number,
		required: true,
	},
	lastEruption: {
		type: Number,
		required: true,
	},
	typeVolcano: {
		type: String,
		enum: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	voteList: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
	}],
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

})