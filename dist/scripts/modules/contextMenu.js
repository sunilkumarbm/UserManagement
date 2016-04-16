define("ContextMenu", function (require, exports, module) {
    "use strict";

    var show = function (event) {
        event.preventDefault();
        document.getElementById("contextMenu").style.top = event.pageY + "px";
        document.getElementById("contextMenu").style.left = event.pageX + "px";
        document.getElementById("contextMenu").style.display = "inline-block";
    };

    var close = function () {
        document.getElementById("contextMenu").style.display = "none";
    };
    
    exports.show = show;
    exports.close = close;
});