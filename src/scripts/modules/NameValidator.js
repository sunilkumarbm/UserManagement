define("NameValidator", function (require, exports, module) {
    'use strict';
    var nameRegEx = /^[a-zA-Z\s]+$/;
    
    var validate = function (name) {
        return nameRegEx.test(name);
    };
    
    exports.validate = validate;
});