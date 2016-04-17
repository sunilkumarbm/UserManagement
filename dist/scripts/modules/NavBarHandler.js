define("NavbarHandler", function (require, exports, module) {
    'use strict';
    var navBar = document.getElementsByClassName("menu-container")[0];
    
    var show = function () {
        navBar.style.display = "block";
    };
    
    var hide = function () {
        navBar.style.display = "none";
    };
    
    
    exports.show = show;
    exports.hide = hide;
});