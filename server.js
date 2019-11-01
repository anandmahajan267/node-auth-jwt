var express = require("express");
app = express();
const cors = require('cors');
var mongoose = require("mongoose");

var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var apiRoutes = require('./src/routes');
var config = require('./src/config/main');


var port = 3000;
app.use(cors());
//use body parser to get api request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//log request to console
app.use(morgan('dev'));
//initialze passport to use
app.use(passport.initialize());


//connect to db
mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

//Bring the passport strategy we just defined
require('./src/config/passport')(passport);
//create API group routes

//set url for api
app.use('/api', apiRoutes);

app.listen(port);
console.log(`app running on port ${port}`);