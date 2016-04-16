define("NameValidator", function (require, exports, module) {
    var nameRegEx = /^[a-zA-Z]+$/;
    
    var validate = function (name) {
        return nameRegEx.test(name);
    };
    
    exports.validate = validate;
});