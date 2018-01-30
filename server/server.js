// And this is where I'd put my Functions... IF I HAD ANY!!!


// Node Dependencies
const express = require('express');
const path = require('path')
let app = express();


// Renamed frequently used stuff
const publicPath = path.join(__dirname, 'public')


// Do stuff with above stuff
app.get('/', (req, res, next) => {
    res.send("Hello from the web server side...");
});

// Serving files from ../public (See Line 11 for 'publicPath' definition)
app.use(express.static(publicPath))

//Localhost Server Port is 3000
app.listen(3000);