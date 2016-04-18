define("EmailValidator", function (require, exports, module) {
    'use strict';
    /**
     * The User's email address validator module
     * @module modules/EmailValidator
     * @name EmailValidator
     */
    
    var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    /**
     * @function validate
     * @description Validates user's phone number
     * @param {string} email - Phone number of the user
     * @returns {boolean} status - <code>true</code> if user is created, <code>false</code> if not
     */
    var validate = function (email) {
        return emailRegEx.test(email);
    };
    
    exports.validate = validate;
});