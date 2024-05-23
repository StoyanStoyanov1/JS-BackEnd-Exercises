const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test')
	.then(() => console.log('DB Connect successfuly'));

const studentSchema = new mongoose.Schema({
	name: String,
	age: Number,
});

const Student = mongoose.model('Student', studentSchema);

const student = new Student({
	name: 'Stenly',
	age: 17,
});

student.save().then((createdStudent => {
	console.log('student, saved successfully');
	console.log(createdStudent)
}));

Student.create({
	name: 'Other',
	age: 24,
}).then(data => console.log(data));