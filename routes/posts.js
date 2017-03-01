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

router.get('/getPosts', (req, res, next) => {
    //console.log(req.get('page'));
    let page = parseInt(req.get('page'));
    let pageSize = parseInt(req.get('pageSize'));

    Post.getPosts(page, pageSize, (err, posts) => {
        if(err || posts.length==0) {
            console.log(err);
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

router.get('/getPostsTotalCount', (req, res, next) => {
    Post.getPostsTotalCount((err, count) => {
        if(err) {
           res.json({success: false, message: 'Failed to get posts count'});
        } else {
            res.json({success: true, message: 'We got posts count', postsTotalCount: count});
        }
    });
});

module.exports = router; 