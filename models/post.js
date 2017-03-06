const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('./user');

//User schema
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        dropDups: true
    },
    intro: {
        type: String,
        required: true
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

module.exports.getPosts = function(page, pageSize, callback) {
    const query = Post.find().limit(pageSize).skip((page-1)*pageSize).sort({createDate: 'desc'});
    query.exec(callback);
}

module.exports.getUsersPosts = function(username, callback) {
    const query = Post.find({author: username}).sort({createDate: 'desc'});
    query.exec(callback);
}

module.exports.getPostsTotalCount = function(callback) {
    Post.count(callback);
}

module.exports.editPost = function(post, callback) {
    Post.update({_id: post.postId}, {$set: {title: post.title, intro: post.intro, tags: post.tags}}, callback);
}


module.exports.getPostById = function(id, callback) {    
    Post.findById(id, callback).sort({comments: 'asc'});
}
