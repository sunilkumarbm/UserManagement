define("UserManager", function (require, exports, module) {
    'use strict';
    var storageOps = require("StorageOps");
    var User = require("User");
    var NameValidator = require("NameValidator");
    var EmailValidator = require("EmailValidator");
    var NumberValidator = require("NumberValidator");
    
    var createUser = function (user) {
        if(user instanceof User.User) {
            return storageOps.saveUser(user);
        }
        else {
            return false;
        }
    };
    
    var editUser = function (editedUser) {
        return storageOps.editUser(editedUser);
    };
    
    var getUser = function (userId) {
        return storageOps.getUser(userId);
    };
    
    var getAllUsers = function () {
        return storageOps.getAllUsers();
    };
    
    var deleteUser = function (userId) {
        return storageOps.deleteUser(userId);
    };
    
    var deactivateUser = function (userId) {
        return storageOps.deactivateUser(userId);
    };
    
    var activateUser = function (userId) {
        return storageOps.activateUser(userId);
    };
    
    var getUserId = function () {
        var lastUserId = storageOps.getLastUserId();
        
        var userId = lastUserId + 1;
        
        storageOps.setLastUserId(userId);
        
        return userId;
    };
    
    var validateUser = function (firstName, lastName, email, number) {
        var status;
        
        var fieldsList = [];
        if(NameValidator.validate(firstName) === false) {
            fieldsList.push("firstName");
        }
        
        if(NameValidator.validate(lastName) === false) {
            fieldsList.push("lastName");
        }
        
        if(EmailValidator.validate(email) === false) {
            fieldsList.push("email");
        }
        
        if(NumberValidator.validate(number) === false) {
            fieldsList.push("number");
        }
        
        if(fieldsList.length === 0) {
            status = {
                result: "success"
            };
        }
        else {
            status = {
                result: "error",
                fields: fieldsList
            };
        }
        
        return status;
    };
    
    exports.createUser = createUser;
    exports.editUser = editUser;
    exports.getUser = getUser;
    exports.getAllUsers = getAllUsers;
    exports.deleteUser = deleteUser;
    exports.deactivateUser = deactivateUser;
    exports.activateUser = activateUser;
    exports.getUserId = getUserId;
    exports.validateUser = validateUser;
});