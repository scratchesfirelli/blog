const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const config = require('../config/database');

//Register
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newPost = new Post({
        title: req.body.title,
        tags: req.body.tags,
        content: req.body.content,
        author: req.body.author,
    });

    Post.addPost(newPost, (err, post) => {
        if(err) {
            res.json({success: false, message: 'Failed to add post'});
        } else {
            res.json({success: true, message: 'Post added'})
        }

    });
});

router.post('/addComment', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    var comment = {
        postId: req.body.postId,
        username: req.body.username,
        text: req.body.text
    }
    //console.log(comment);
    Post.addComment(comment, (err, comment) => {
        if(err) {
            res.json({success: false, message: 'Failed to add comment'});
        } else {
            res.json({success: true, message: 'Comment added'})
        }

    });
});

router.get('/list', (req, res, next) => {
    let page = req.page

    Post.getPosts(page, (err, posts) => {
        if(err) {
            res.json({success: false, message: 'Failed to get posts'});
        } else {
            res.json({success: true, message: 'Posts', posts: posts});
        }
    });
});

router.get('/getPostById', (req, res, next) => {
    let id = req.get('postId');
    Post.getPostById(id, (err, post) => {
        if(err) {
            res.json({success: false, message: 'Failed to get posts'});
        } else {
            res.json({success: true, message: 'Post', post: post});
        }
    });
});

module.exports = router; 