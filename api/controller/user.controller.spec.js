const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = require('should');

describe(">> User controller test", () => {
    let res, req, User, userController ;
    User = require('../models/user.model');
    beforeEach(function(){
        req = {
            query: {
                name : 'ac'
             },
            params : {
                id : 'a'
            },
            headers: {
                host : 'localhost'
            }
        };
        res = {
            json : sinon.spy(),
            status : sinon.spy(),
            send : sinon.spy()
        }
    })
    describe("\n > @newUser() methods : test", () => {
        
        beforeEach(function () {
             req['body'] = {
                    last_name : 'test demo',
                    email : 'test@gmai.com',
                    phone: '1231231231',
                    active : 'true'
                };
                User['save'] = sinon.spy();
                userController = require('./user.controller')(User);
        });
        it(">> should not allow an empty Name on post request", function () {

            userController.newUser(req, res);

            res.status.calledWith(500).should.equal(true);
            // res.send.calledWith().should.equal(true);

        });
        it(">> should create new user post request", function () {
            userController = require('./user.controller')(User);
            req.body['first_name'] = "test";
            userController.newUser(req, res);

            res.status.calledWith(201).should.equal(true);
            // res.send.calledWith({message : 'user create successfully'}).should.equal(true);

        })
    });
    describe("\n > @getUsers() methods : test", ()=>{

        beforeEach(function() {
            sinon.stub(User, 'find');
            userController = require('./user.controller')(User);
        });

        afterEach(function() {
            User.find.restore();
        });

        it('should send all users', function() {
            let a = { first_name: 'a', _id:'a', links: { self: "http://localhost/api/users/a" }  };
            let b = { first_name: 'a', _id:'b', links: { self: "http://localhost/api/users/b" }  };
            let expectedModels = [a, b];

            User.find.yields(null, expectedModels);

            userController.getUsers(req, res);

            sinon.assert.calledWith(res.json, expectedModels);
        });
        it('should send error if something went wrong', function() {
            let err= {
                message : 'error occurred'
            };

            User.find.yields(err, null);
            userController.getUsers(req, res);

            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledWith(res.send, err);
        });
    });
    describe("\n > @getUser() method : test", ()=>{
        
        beforeEach(function() {
            sinon.stub(User, 'findById');
            userController = require('./user.controller')(User);
        
        });
        afterEach(function() {
            User.findById.restore();
        });

        it("should get the info related to single user", function () {
            let doc = { first_name: 'a', _id:'a'};

            User.findById.yields(null, doc);

            userController.getUser(req, res);

            sinon.assert.calledWith(res.json, doc );
        });
        it("should send error if no user", function () {
            let err = {
                message : 'error occurred'
            };
            req.params.id = null;

            User.findById.yields(err, null);

            userController.getUser(req, res);

            sinon.assert.calledWith(res.status, 401 );
            sinon.assert.calledWith(res.send, err );
        })


    });
    describe("\n > @updateUser() methods : test", ()=>{
        beforeEach(function() {
            sinon.stub(User, 'findOneAndUpdate');
            userController = require('./user.controller')(User);
        });

        afterEach(function() {
            User.findOneAndUpdate.restore();
        });

        it("should update the single user", function() {
            let doc = { first_name: 'a', _id:'a', links: { self: "http://localhost/api/users/a" }  };

            User.findOneAndUpdate.yields(null, doc);

            userController.updateUser(req, res);

            sinon.assert.calledWith(res.send, { message: "Successfully updated" } );
        });
        it("should send error", function() {
            let err = {
                message : 'error occurred'
            };
            User.findOneAndUpdate.yields(err, null);

            userController.updateUser(req, res);

            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledWith(res.send, err);
        });
    });
    describe("\n > @DeletUser () methods : test", ()=>{

        var userController, req, res;
        let User = require('../models/user.model');

        beforeEach(function() {
            sinon.stub(User, 'findOneAndRemove');
            userController = require('./user.controller')(User);
            req = {
                query: { },
                params: {
                    _id : 'a'
                },
                headers: {
                    host : 'localhost'
                }
            };
            res = {
                status : sinon.spy(),
                send: sinon.spy()
            };
        });

        afterEach(function() {
            User.findOneAndRemove.restore();
        });

        it("should delete the single user", function() {
            let doc = { first_name: 'a', _id:'a', links: { self: "http://localhost/api/users/a" }  };

            User.findOneAndRemove.yields(null, doc);

            userController.deleteUser(req, res);

            sinon.assert.calledWith(res.send, { message: "User has been deleted successfully!" } );
        });
        it("should send error", function() {
            let err = {
                message : 'error occurred'
            };
            User.findOneAndRemove.yields(err, null);

            userController.deleteUser(req, res);

            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledWith(res.send, err);
        });
    });
});