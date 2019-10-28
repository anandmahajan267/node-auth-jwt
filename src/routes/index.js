var express = require("express");
var passport = require('passport');
var authRoutes = require('../routes/authRoutes');
var homeRoutes = require('../routes/homeRoutes');

//create API group routes
var routes = express.Router();

routes.use('/auth', authRoutes);

//protect route with JWT
//add header : Authorization = JWT Token
routes.use('/home', passport.authenticate('jwt', { session: false }), homeRoutes);

module.exports = routes