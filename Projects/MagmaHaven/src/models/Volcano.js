
const mongoose = require('mongoose');

const volcanoSchema = new mongoose.Schema({
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
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	}],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

});

const Volcano = mongoose.model('Volcano', volcanoSchema);
exports.Volcano = Volcano;