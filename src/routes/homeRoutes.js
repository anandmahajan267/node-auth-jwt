var express = require("express");
var homeController = require('../controllers/homeController');
//create API group routes
var routes = express.Router();

//get user id in dashboard protected route
routes.get('/dashboard', homeController.dashboard);

module.exports = routes