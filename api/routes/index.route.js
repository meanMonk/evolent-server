/* Load express and mongoose model/schema */
module.exports = function (app) {
    /*loading all the routes*/
    
    const userRoutingModule = require('./user.route');

    app.use('/api', userRoutingModule);
    
    app.get('/api',function(req, res){

        res.send({message : 'API for evolent exercise'});

    });
}