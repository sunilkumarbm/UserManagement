define("MenuHandler", function (require, exports, module) {
    var show = function () {
        document.getElementsByClassName("menu-container").style.display = "block";
    };
    
    var hide = function () {
        document.getElementsByClassName("menu-container").style.display = "none";
    };
    
    
    exports.show = show;
    exports.hide = hide;
});