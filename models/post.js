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
            username: String,
            text: String,
            date: {
                type: Date,
                default: Date.now,
                required: true
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

module.exports.addComment = function(comment, callback) {
    const conditions = { _id: comment.postId };
    const update = { 
        $push: { 
            comments: {
                username: comment.username,
                text: comment.text
            },
            $sort: 'desc'
        }};
    const  options = { multi: false };
    //console.log(conditions, update, options);
    Post.update(conditions, update, options, callback);
}

module.exports.getPosts = function(page, callback) {
    const query = Post.find().limit(pageSize).skip((page-1)*pageSize).sort({createDate: 'desc'});
    query.exec(callback);
}

module.exports.getPostById = function(id, callback) {    
    Post.findById(id, callback).sort({comments: 'asc'});
}
