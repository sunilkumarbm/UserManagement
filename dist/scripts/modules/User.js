define("User", function (require, exports, module) {
    'use strict';
    var UserManager = require("UserManager");
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