/* Loading the required module */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./api/config/db');
const config = require('./api/config/config');
const path = require('path');

const app = express();


/* Adding middleware body parser to parse the application/json */
app.use(bodyParser.json());

require('./api/routes/index.route')(app);

app.use(express.static(__dirname + '/dist/evolent-client'));

app.get('*',function(req, res){
    res.sendFile(path.join(__dirname+ '/dist/evolent-client/index.html'));
});

app.listen(process.env.PORT || config.server.port, ()=>{
    console.log(`gulp server is running on port ${process.env.PORT}`);
})

module.exports = app;

