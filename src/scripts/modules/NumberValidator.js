define("NumberValidator", function (require, exports, module) {
    'use strict';

    /**
     * The User's phone number validator module
     * @module modules/NumberValidator
     * @name NumberValidator
     */
    var numberRegEx = /^\d{10}$/;


    /**
     * @function validate
     * @description Validates user's phone number
     * @param {number} number - Phone number of the user
     * @returns {boolean} status - <code>true</code> if user is created, <code>false</code> if not
     */
    var validate = function (number) {
        return numberRegEx.test(number);
    };

    exports.validate = validate;
});
