const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');//enables sites use the api
const passport = require('passport');
const mongoose = require('mongoose');
const user = require('./routes/users');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

const app = express();
const port = 3000;

app.use(cors()); //any domain can access the api

//Body Parser
app.use(bodyParser.json());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//we wanna use user for all of our user routes
app.use('/users', user);

//index route
app.get('/', (req, res) => {
    res.send('Invalid inpoint');
});

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Starts server
app.listen(port, () => {
    console.log('Server started on port'+port);
});