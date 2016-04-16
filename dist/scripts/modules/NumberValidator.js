define("NumberValidator", function (require, exports, module) {
    var numberRegEx = /^\d{10}$/;
    
    var validate = function (number) {
        return numberRegEx.test(number);
    };
    
    exports.validate = validate;
});
