var express = require("express");
app = express();
var mongoose = require("mongoose");

var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./config/main');
var User = require('./app/models/user');
var jwt = require('jsonwebtoken');

var port = 3000;

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
require('./config/passport')(passport);

//create API group routes
var apiRoutes = express.Router();

//register new user
apiRoutes.post('/signup', function (req, res) {
    console.log('req :', req)
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, message: 'Please enter an email or password to register user' });
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
                return res.json({ success: false, message: 'this email address already exists.' });
            }

            res.json({ success: true, message: 'Succesfully created new user.' });
        });
    }
});

//authenticate the user and get jwt token
apiRoutes.post('/login', function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            res.json({ success: false, message: 'user not found.' });
        } else {
            //check user password
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    //create token

                    var token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 1000//seconds
                    });
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.json({ success: false, message: 'password did not match.' });
                }

            });
        }
    });
});

//protect dashboard route with JWT
apiRoutes.get('/dashboard', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.send("it's worked user id " + req.user._id);
});

//set url for api
app.use('/api', apiRoutes);

//home page
app.get('/', function (req, res) {
    res.send('relax! We will put home page later...');
});


app.listen(port);
console.log(`app running on port ${port}`);