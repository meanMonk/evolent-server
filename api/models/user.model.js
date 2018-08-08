(function () {
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;

    let userModel = new Schema({
        first_name: {
            type: String,
            unique: true,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default : 'Inactive'
        },
        createdAt : {
            type: Date,
            default: Date.now()
        }
    });

    module.exports = mongoose.model('UsersCollection', userModel);
})();