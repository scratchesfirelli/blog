const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique : true,
        required: true,
        dropDups: true
    },
    username: {
        type: String,
        unique : true,
        required: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema);


//module.exports lets use function from outside
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(11, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err,hash) => {
            if(err) {
                console.log(err);
            } else {
                newUser.password = hash;
                newUser.save(callback);
            }
        });
    });
}

module.exports.getUsers = function(callback) {
    User.find(callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) {
            console.log(err);
        }
        callback(null, isMatch);
    });
}