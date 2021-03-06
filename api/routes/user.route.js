const userRoutingModule = () => {
    const express = require('express');
    const userRoutes = express.Router();
    const userModel = require('./../models/user.model');
    const userController = require('../controller/user.controller')(userModel);
    

    userRoutes.route('/users')
        .get(userController.getUsers)
        .post(userController.newUser);

    userRoutes.route('/users/:id')
        .get(userController.getUser)
        .put(userController.updateUser)
        .delete(userController.deleteUser);

    return userRoutes;

};
module.exports = userRoutingModule();