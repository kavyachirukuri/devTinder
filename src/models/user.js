// here, we are defining , what a user is in our database is,
// what fields this user collection will have

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId:{
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User