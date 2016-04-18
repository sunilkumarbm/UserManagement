define("NavbarHandler", function (require, exports, module) {
    'use strict';
    
    /**
     * Navbar controller
     * @module modules/NavbarHandler
     * @name NavbarHandler
     */
    var navBar = document.getElementsByClassName("menu-container")[0];
    
    
    /**
     * @function show
     * @description Displays Navbar in tablets
     */
    var show = function () {
        navBar.style.display = "block";
    };
    
    /**
     * @function hide
     * @description Hides Navbar in tablets
     */
    var hide = function () {
        navBar.style.display = "none";
    };
    
    
    exports.show = show;
    exports.hide = hide;
});