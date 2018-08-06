const userController = function(userModel) {

    const getUsers = (req, res) => {
        const query = {};
        if(req.query.name){
            query.first_name = { "$regex" : req.query.name}
        }
        userModel.find(query, {__v : 0},function(err, userDocs){
           if(err){
               res.status(500).send(err);
           }else {
               var returnDocs = [];
                userDocs.forEach((user, index) => {
                   var user = user.toJSON();
                   user.links = {};
                   user.links.self = 'http://' + req.headers.host + '/api/users/' + user._id;
                   returnDocs.push(user);
               });
               res.json(returnDocs);
           }
        });
    }

    const getUser = (req, res) => {
        var user = req.userDoc.toJSON();
        user.links = {};
        user.links.filter = 'http://' + req.headers.host + '/api/users/?name=' + user.first_name;
        res.json(user);
    }

    const createNewUser = (req, res) => {
        const userDoc = new userModel(req.body);
        if(!req.body.first_name){
            res.status(400);
            res.send('first name is required');
        }else {
            userDoc.save();
            res.status(201);
            res.send(userDoc);
        }
    }
    const updateUser = (req, res) => {
        req.userDoc.first_name = req.body.first_name;
        req.userDoc.last_name = req.body.last_name;
        req.userDoc.email = req.body.email;
        req.userDoc.phone = req.body.phone;
        req.userDoc.active = req.body.active;
        req.userDoc.save(function (err) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.json(req.userDoc);
            }
        });
    }
    const deleteUser = (req, res) => {
        const query = {};
        if(req.params.id){
            query._id = req.params.id;
        }
        userModel.remove(query, function (err, userDoc) {
            if(err){
                res.status(500).send(err)
            }
            res.send({ message : "User has been deleted successfully"});
        });
    }

    return {
        getUsers : getUsers,
        getUser : getUser,
        newUser : createNewUser,
        deleteUser : deleteUser,
        updateUser : updateUser
    }
}

module.exports = userController;