var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/main')

const signup = (req, res) => {
    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
        res.status(400).json({ success: false, message: 'Please fill in the required fields to register new user' });
    } else {
        var newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        });
        //save new user to database
        newUser.save(function (err) {
            if (err) {
                return res.status(409).json({ success: false, message: 'This email address already exists.' });
            }
            res.status(201).json({ success: true, message: 'Succesfully created new user.' });
        });
    }
}

const login = (req, res) => {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            res.status(404).json({ success: false, message: 'User not found.' });
        } else {
            //check user password
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    //create token

                    var token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 1000//seconds
                    });
                    res.json({
                        success: true, token: 'JWT ' + token, data: {
                            id: user.id,
                            email: user.email,
                            first_name: user.first_name,
                            last_name: user.last_name,
                        }
                    });
                } else {
                    res.status(400).json({ success: false, message: 'Password did not match.' });
                }

            });
        }
    });
}

module.exports = {
    login: login,
    signup: signup
}