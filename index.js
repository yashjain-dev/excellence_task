// require express
const express = require('express');
// initialise express
const app = express();
// initializing port number
const port = 8000;

// setting up mongoose to connect to the database
const db = require('./config/mongoose');

//Use express router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});