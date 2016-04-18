define("NameValidator", function (require, exports, module) {
    'use strict';
    /**
     * The User's first name and last name validator module
     * @module modules/NumberValidator
     * @name NameValidator
     */
    
    var nameRegEx = /^[a-zA-Z\s]+$/;
    
    
    /**
     * @function validate
     * @description Validates user's phone number
     * @param {string} name - Phone number of the user
     * @returns {boolean} status - <code>true</code> if user is created, <code>false</code> if not
     */
    var validate = function (name) {
        return nameRegEx.test(name);
    };
    
    exports.validate = validate;
});