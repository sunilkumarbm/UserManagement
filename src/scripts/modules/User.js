define("User", function (require, exports, module) {
    'use strict';
    /**
     * User class
     * @module modules/User
     * @name User
     * @requires UserManager
     */
    
    var UserManager = require("UserManager");
    
    
    /**
     * @function User
     * @description The user object template
     * @param {string} firstName - First name of the user
     * @param {string} lastName - Last name of the user
     * @param {string} email - Email address of the user
     * @param {number} phno - Phone number of the user
     * @param {string} status - Status of the user
     * @param {number} [userId] - User ID (Auto generated for create user)
     * @returns {object} status Object containing all the query parameters
     */
    var user = function User(firstName, lastName, email, phno, status, userId) {
        this.id = userId === undefined ? UserManager.getUserId() : userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phno;
        this.status = status;
    };
    
    exports.User = user;
});