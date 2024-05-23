const mongoose = require('mongoose');
const Student = require('./models/Student');

mongoose.connect(`mongodb://localhost:27017/test1`)
    .then(() => console.log('DB Connected successfuly'));

const student = new Student({
    name: 'Stamat4',
    age: 17,
});

// CREATE
// Save model instance to db
// student.save()
//     .then(createdStudent => {
//         console.log('Student saved');
//         console.log(createdStudent)
//     })

// Save with static method
// Student.create({
//     name: 'Un',
//     age: 13,
// }).then(data => console.log(data))

// READ
// Get all data
Student.find({})
    .then(students => {
        students.forEach(student => student.logInfo())
    });

// Get all data with filter
Student.find({ age: { $gte: 19 } })
    .then(result => {
        result.forEach(student => console.log(student.description));
    })

// Get single record
Student.findOne({ name: { $in: ['Peter', 'Mariyka'] } } )
    .sort({age: 1})
    // Student.findOne({ $or: [{ name: 'Stamat' }, { name: 'Mariyka' }]})
    .then(student => {
        console.log('findOne')
        console.log(student);
    });

// Get by Id
Student.findById('65aec04a65f3843fbed4a501')
    .then(result => {
        console.log('findById');
        console.log(result);
    })

// Update
Student.updateOne({ name: 'Peter' }, { $set: { age: 21 } })
    .then(result => {
        console.log('updateOne');
        console.log(result);
    })

Student.updateOne({ name: 'Peter' }, { $set: { age: 20 } })
    .then(result => {
        console.log('updateOne');
        console.log(result);
    })

Student.updateMany({ age: 17 }, { $set: { age: 17 } })
    .then(result => {
        console.log('updateMany');
        console.log(result);
    })

Student.findByIdAndUpdate('65aeae06220da258f7618d1e', { $set: { age: 18 } })
    .then(result => {
        console.log('findByIdAndUpdate');
        console.log(result);
    })

// DELETE
Student.findByIdAndDelete('65aec04a65f3843fbed4a501')
    .then(result => {
        console.log('findByIdAndDelete');
        console.log(result);
    });

Student.deleteOne({ name: 'Stamat4' })
    .then(result => {
        console.log('deleteOne');
        console.log(result);
    });

Student.deleteMany({ _id: { $in: ['65aec5dca50b578b22eb467a', '65aead0c811e8edcf6d35aa4'] } })
    .then(result => {
        console.log('deleteMany');
        console.log(result);
    });