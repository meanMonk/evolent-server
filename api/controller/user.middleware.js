const userIdMiddleware =function (model) {
    var getById = function (req, res, next) {
        model.findById(req.params.id, function (err, userDoc) {
            if(err){
                res.status(401).send("NOT FOUND");
            }else {
                req.userDoc = userDoc;
                next();
            }
        })
    };
    return {
        getById : getById
    }
};

module.exports = userIdMiddleware;