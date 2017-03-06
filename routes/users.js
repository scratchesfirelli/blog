const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, message: 'Failed to register user'});
        } else {
            res.json({success: true, message: 'User registered'})
        }

    });
});

router.get('/getUserByUsername', (req, res, next) => {
    let username = req.get('username');
    User.getUserByUsername(username, (err, user) => {
        if(err) {
            res.json({success: false, message: 'Cant find user'});
        } else {
            res.json({success: true, message: 'User found', user: user});
        }
    })
});



//Authenticate
router.post('/authenticate', (req, res, next) => {
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
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

router.get('/list', (req, res, next) => {
    User.getUsers((err, users) => {
        if(err) {
           res.json({success: false, message: 'Error occured'});
        } else {
            res.json({success: true, message: "Users", users: users});
        }
    });
});




module.exports = router; 