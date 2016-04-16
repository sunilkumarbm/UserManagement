define("ContextMenu", function (require, exports, module) {
    "use strict";

    var show = function (event, row) {
        if(!row.classList.contains("inactive")) {
            document.getElementById("activateMenuItem").classList.add("inactive");
            document.getElementById("deactivateMenuItem").classList.remove("inactive");
        } else {
            document.getElementById("activateMenuItem").classList.remove("inactive");
            document.getElementById("deactivateMenuItem").classList.add("inactive");
        }
        
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