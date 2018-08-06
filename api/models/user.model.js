(function () {
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;

    let userModel = new Schema({
        first_name: {
            type: String,
            unique: true
        },
        last_name: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        active: {
            type: Boolean
        },
        createdAt : {
            type : Date,
            value : Date.now()
        }
    });

    module.exports = mongoose.model('users', userModel);
})();