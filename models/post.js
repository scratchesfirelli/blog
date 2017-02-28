const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('./user');

const pageSize = 10;
//User schema
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        dropDups: true
    },
    tags: [String],
    content: {
        type: String,
        required: true,
        dropDups: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            user: {},
            comment: String,
            commentDate: {
                type: Date,
                defaul: Date.now
            }
        }
    ],
    author: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    }
})

const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.addPost = function(post, callback) {
    post.save(callback);
}

module.exports.getPosts = function(page, callback) {
    const query = Post.find().limit(pageSize).skip((page-1)*pageSize).sort({createDate: 'desc'});
    query.exec(callback);
}


//module.exports lets use function from outside
/*module.exports.getUserById = function(id, callback) {
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

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) {
            console.log(err);
        }
        callback(null, isMatch);
    });
}*/