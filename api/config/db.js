(function () {
    const Mongoose = require('mongoose');
    const Config = require('./config');

    Mongoose.connect(process.env.DB_URL || Config.database.dev_url);

    const dbConnection = Mongoose.connection;

    dbConnection.on('error', console.error.bind(console, 'connection error'));

    dbConnection.once('open', function callback() {
        console.log("Connection with database succeeded..!");
    });

    module.exports = dbConnection;
})();