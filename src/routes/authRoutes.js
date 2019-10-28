var express = require("express");
var passport = require('passport');
var authController = require('../controllers/authController');
//create API group routes
var routes = express.Router();

//register new user
routes.post('/signup', authController.signup);

//authenticate the user and get jwt token
routes.post('/login', authController.login);


module.exports = routes