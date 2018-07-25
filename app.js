const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require("cors");

const config = require('./config/database');

//initialize express
const app = express();


//Database connection mongoose
mongoose.connect(config.database);

//on database connection
mongoose.connection.on('connected',()=>{

console.log("connected to database "+config.database);

});

//on database error

mongoose.connection.on('error',(err)=>{

console.log("Database Error "+err);

});


//user routes

const users = require('./routes/users');

//port
const port = 3000;

//cors Middleware
app.use(cors());

//set static folder

app.use(express.static(path.join(__dirname,'public')));

//BodyParser Middleware
app.use(bodyParser.json());


//passport

app.use(passport.initialize());

app.use(passport.session());

require('./config/passport')(passport);


//user routes
app.use('/users',users);

//index route
app.get('/',(req,res)=>{

res.send("invalid endpoint");

});

//start server
app.listen(port,()=>{

console.log("Server start on port"+port);

});
