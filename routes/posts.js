const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const config = require('../config/database');

//Register
router.post('/add', (req, res, next) => {
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

//Authenticate
router.post('/edit', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) {
            console.log(err);
        }
        if(!user) {
            return res.json({success: false, message: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) {
                console.log(err);
            }
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true, 
                    token: 'JWT ' + token, 
                    user: { 
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                }});
            } else {
                res.json({success: false, message: 'Wrong password'});
            }
        });
    });
});

//Profile
router.post('/delete', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router; 