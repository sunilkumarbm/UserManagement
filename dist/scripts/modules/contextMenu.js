define("ContextMenu", function (require, exports, module) {
    "use strict";

    var contextMenu = document.getElementById("contextMenu");
    var editMenu = document.getElementById("editMenuItem");
    var activateMenu = document.getElementById("activateMenuItem");
    var deactivateMenu = document.getElementById("deactivateMenuItem");
    
    var show = function (event, row) {
        contextMenu.setAttribute("data-userId", row.getAttribute("data-userId"));
        
        if(!row.classList.contains("inactive")) {
            activateMenu.classList.add("inactive");
            activateMenu.removeAttribute("tabindex");
            
            deactivateMenu.classList.remove("inactive");
            deactivateMenu.setAttribute("tabindex", 3);
        } else {
            activateMenu.classList.remove("inactive");
            activateMenu.setAttribute("tabindex", 3);
            
            deactivateMenu.classList.add("inactive");
            deactivateMenu.removeAttribute("tabindex");
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