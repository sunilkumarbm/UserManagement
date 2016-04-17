define("ContextMenu", function (require, exports, module) {
    "use strict";

    var contextMenu = document.getElementById("contextMenu");
    var editMenu = document.getElementById("editMenuItem");
    var statusToggleMenuItem = document.getElementById("statusToggleMenuItem");
//    var deactivateMenu = document.getElementById("deactivateMenuItem");

    var show = function (event, row) {
        contextMenu.setAttribute("data-userId", row.getAttribute("data-userId"));


        if (row.classList.contains("inactive")) {
            statusToggleMenuItem.innerHTML = "Activate";
            statusToggleMenuItem.setAttribute("data-action", "activate");
        } else {
            statusToggleMenuItem.innerHTML = "Deactivate";
            statusToggleMenuItem.setAttribute("data-action", "deactivate");
        }
        
        event.preventDefault();
        contextMenu.style.top = event.pageY + "px";
        contextMenu.style.left = event.pageX + "px";
        contextMenu.style.display = "inline-block";
        contextMenu.setAttribute("aria-hidden", "false");

        editMenu.focus();
    };

    var close = function () {
        contextMenu.style.display = "none";
        contextMenu.setAttribute("aria-hidden", "true");
    };

    exports.show = show;
    exports.close = close;
});