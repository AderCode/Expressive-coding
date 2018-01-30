// Functions
let myLogger = (req, res, next) => {
    console.log(req.url)
    next()
  }

// Node Dependencies
const express = require('express');
const path = require('path')
let app = express();


// Renamed frequently used stuff
const publicPath = path.join(__dirname, '../public')


// Do stuff with above stuff
app.use(myLogger) // (See line 2 for 'myLogger' definition)
app.get('/', (req, res) => {
    res.send("Hello from the web server side...");
});

// Serving files from ../public (See Line 14 for 'publicPath' definition)
app.use(express.static(publicPath))

//Localhost Server Port is 3000
app.listen(3000)