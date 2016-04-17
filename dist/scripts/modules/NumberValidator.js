define("NumberValidator", function (require, exports, module) {
    'use strict';
    var numberRegEx = /^\d{10}$/;
    
    var validate = function (number) {
        return numberRegEx.test(number);
    };
    
    exports.validate = validate;
});
