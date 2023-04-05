const express = require('express');
const mongoose = require('mongoose');

//the information is sent to the server in json format. the server cannot understand the incoming format, 
//the server can understand the javascript object, and the incoming request needs to be converted into the javascript object. that is what body-parser is used for.
const bodyParser = require('body-parser');

//when running from backend and frontend port number two,it is blocked for a security reason
//that is called cors error
//cors is used as a middleware to prevent it
const cors = require('cors');

const app = express()

//import routes
const postRoutes = require('./routes/posts');

//app middleware
app.use(bodyParser.json());

//cors shoud be used as a middleware
app.use(cors());

//route middleware
//a user request is sent from the frontend
//and then goes to routes
//finally,routes show what the user wants to see(like save)
app.use(postRoutes);

const PORT = 8000;
//add mongodb url
const DB_URL = 'add mongodb url';

mongoose.set('strictQuery',false);
mongoose.connect(DB_URL)
//promise
.then(() =>{
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error',err));


app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
});


