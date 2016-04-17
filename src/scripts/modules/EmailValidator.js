define("EmailValidator", function (require, exports, module) {
    'use strict';
    var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    var validate = function (email) {
        return emailRegEx.test(email);
    };
    
    exports.validate = validate;
});