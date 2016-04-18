define("UserManager", function (require, exports, module) {
    'use strict';
    /**
     * The User Manager Module.
     * @module modules/UserManager 
     * @name UserManager
     */

    var storageOps = require("StorageOps");
    var User = require("User");
    var NameValidator = require("NameValidator");
    var EmailValidator = require("EmailValidator");
    var NumberValidator = require("NumberValidator");

    /**
     * @function createUser
     * @description Creates a new user
     * @param {object} user - The user object to be created
     * @returns {boolean} status - <code>true</code> if user is created, <code>false</code> if not
     */
    var createUser = function (user) {
        if (user instanceof User.User) {
            return storageOps.saveUser(user);
        } else {
            return false;
        }
    };

    /**
     * @function editUser
     * @description Edits the user
     * @param {object} editedUser - The user object to be edited
     * @returns {boolean} status - <code>true</code> if user is created, <code>false</code> if not
     */
    var editUser = function (editedUser) {
        return storageOps.editUser(editedUser);
    };

    /**
     * @function getUser
     * @description Gets the user object corresponding to the specified user id
     * @param {Number} userId - The user ID to be retrieved
     * @returns {object} The <code>user</code> object corresponding to the specified user id
     */
    var getUser = function (userId) {
        return storageOps.getUser(userId);
    };


    /**
     * @function getAllUsers
     * @description Gets all the users in the database
     * @returns {Object[]} users List of all user in the database
     */
    var getAllUsers = function () {
        return storageOps.getAllUsers();
    };

    /**
     * @function deleteUser
     * @description Deletes user corresponding to the specified user id
     * @param {Number} userId - The user ID to be retrieved
     * @returns {boolean} status - <code>true</code> if user is created, <code>false</code> if not
     */
    var deleteUser = function (userId) {
        return storageOps.deleteUser(userId);
    };


    /**
     * @function deactivateUser
     * @description Deactivates the user corresponding to the specified user id
     * @param {Number} userId - The user ID to be retrieved
     * @returns {boolean} status - <code>true</code> if user is created, <code>false</code> if not
     */
    var deactivateUser = function (userId) {
        return storageOps.deactivateUser(userId);
    };


    /**
     * @function activateUser
     * @description Activates the user corresponding to the specified user id
     * @param {Number} userId - The user ID to be retrieved
     * @returns {boolean} status - <code>true</code> if user is created, <code>false</code> if not
     */
    var activateUser = function (userId) {
        return storageOps.activateUser(userId);
    };

    /**
     * @function getUserId
     * @description Generates an auto incremented user id for every created user
     * @returns {number} userId - Auto incremented user id
     */
    var getUserId = function () {
        var lastUserId = storageOps.getLastUserId();

        var userId = lastUserId + 1;

        storageOps.setLastUserId(userId);

        return userId;
    };

    /**
     * @function validateUser
     * @description Validates user details during creating or editing of a user
     * @param {string} firstName - First Name of the user
     * @param {string} lastName - Last Name of the user
     * @param {string} email - Email Address of the user
     * @param {Number} number - Phone number of the user
     * @returns {boolean} status - <code>true</code> if user is created, <code>false</code> if not
     */
    var validateUser = function (firstName, lastName, email, number) {
        var status;

        var fieldsList = [];
        if (NameValidator.validate(firstName) === false) {
            fieldsList.push("firstName");
        }

        if (NameValidator.validate(lastName) === false) {
            fieldsList.push("lastName");
        }

        if (EmailValidator.validate(email) === false) {
            fieldsList.push("email");
        }

        if (NumberValidator.validate(number) === false) {
            fieldsList.push("number");
        }

        if (fieldsList.length === 0) {
            status = {
                result: "success"
            };
        } else {
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