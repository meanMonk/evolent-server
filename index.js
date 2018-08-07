/* Loading the required module */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./api/config/db');
const config = require('./api/config/config');
const path = require('path');
const morgan = require('morgan');

const app = express();


/* Adding middleware body parser to parse the application/json */
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(express.static(__dirname + '/dist/evolent-client'));
app.use(express.static(__dirname + '/docs'));
app.get('/document',function(req, res){
    res.sendFile(path.join(__dirname+ '/docs/index.html'));
});

app.get('/',function(req, res){
    res.sendFile(path.join(__dirname+ '/dist/evolent-client/index.html'));
});

require('./api/routes/index.route')(app);

app.get('**',function(req, res){
    res.sendFile(path.join(__dirname+ '/dist/evolent-client/index.html'));
});

const PORT = process.env.PORT || config.server.port;

app.listen(PORT, ()=>{
    console.log(`gulp server is running on port ${PORT}`);
})

module.exports = app;

