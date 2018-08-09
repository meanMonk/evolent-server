/**
 * Author : Sahil kashetwar [sahilkashetwar24@gmail.com]
 **/

/** Loading the required module 
 * @ Express : express server creation.
 * @ Morngan : To keep the request logs.
 * @ BodyParser : To parse the req.body data into to json format when header content-type set to app/json.
 * @ Mongoose : To connect or access the mongodb database for managing data
 * */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const db = require('./api/config/db');
const config = require('./api/config/config');


/**
 *  Calling the express functions to create the express APP
 * */

const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));

/**
 * Adding middleware to resolve the CORS error.
 **/
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // Pass to next layer of middleware
    next();
});

/**
 * @ Dist : will hold the client side code.
 * @ Docs : will hold the API documentation code.
 * @ We are using express static midlleware to server the static file over the express server.
 **/
app.use(express.static(__dirname + '/dist/evolent-client'));
app.use(express.static(__dirname + '/docs'));

/**
 *  Setting up routes.
 *  @ '/' : angular project or html serving.
 *  @ '/api' : Will serve the API to access the data for the application
 *  @ '/api-docs' : Will serve the Rest API documentation
 **/
app.get('/',function(req, res){
    res.sendFile(path.join(__dirname+ '/dist/evolent-client/index.html'));
});
 
require('./api/routes/index.route')(app);

app.get('/api-docs',function(req, res){
    res.sendFile(path.join(__dirname+ '/docs/index.html'));
});

app.get('**',function(req, res){
    res.sendFile(path.join(__dirname+ '/dist/evolent-client/index.html'));
});

/**
 *  @ PORT : will look for the port from the process env first if not found then will choose static port number
 *  @ Listen : Will start the express server and listen at the port which we pass as arguments.
 **/

const PORT = process.env.PORT || config.server.port;

app.listen(PORT, ()=>{
    console.log(`gulp server is running on port ${PORT}`);
})

module.exports = app;

