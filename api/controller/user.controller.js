const userController = function(userModel) {

    const getUsers = (req, res) => {
        let query = {};
        if(req.query.name){
            query.first_name = { "$regex" : req.query.name}
        }
        userModel.find(query, {__v : 0},function(err, userDocs){
           if(err){
               res.status(500);
               res.send(err);
           }else {
               var returnDocs = [];
                userDocs.forEach((user, index) => {
                    user = JSON.stringify(user);
                   let userDoc = JSON.parse(user);
                    userDoc['links'] = {};
                    userDoc.links['self'] = 'http://' + req.headers.host + '/api/users/' + userDoc._id;
                   returnDocs.push(userDoc);
               });
               res.json(returnDocs);
           }
        });
    };

    const getUser = (req, res) => {
        userModel.findById(req.params.id, (err, doc)=>{
            if(err) {
                res.status(401);
                res.send(err);
            }
            else {
                res.json(doc);
            }
        })
    };

    const createNewUser = (req, res) => {
        const userDoc = new userModel(req.body);
        if(!req.body.first_name){
            res.status(400);
            res.send('first name is required');
        }else {
            userDoc.save();
            res.status(201);
            res.send('user create successfully');
        }
    };

    const updateUser = (req, res) => {
        let query = {_id : req.params.id};
        userModel.findOneAndUpdate(query, req.body, { upsert : true}, function (err, doc) {
            if(err) {
                res.status(500);
                res.send(err);
            } else {
                res.send({message: 'Successfully updated'});
            }
        });
    };

    const deleteUser = (req, res) => {
        let query = {_id : req.params.id};
        userModel.findOneAndRemove(query, function (err, doc) {
            if(err){
                res.status(500);
                res.send(err);
            }
            res.send({message: 'User has been deleted successfully!'});
        });
    };

    return {
        getUsers : getUsers,
        getUser : getUser,
        newUser : createNewUser,
        deleteUser : deleteUser,
        updateUser : updateUser
    }
}

module.exports = userController;