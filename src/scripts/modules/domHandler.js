define("DomHandler", function (require, exports, module) {
    "use strict";
    
    var contextMenu = require('ContextMenu');

    var registerEventHandlers = function () {
        window.addEventListener("keyup", function (event) {
            keyPressed(event);
        });
        
        window.addEventListener("click", function () {
            contextMenu.close();
        });
        registerContextMenuForTable();
    };
    var registerContextMenuForTable = function () {
        var tableRows = document.getElementsByClassName("table-row-body");

        for (var i = 0; i < tableRows.length; i++) {
            tableRows[i].addEventListener("contextmenu", contextMenu.show);
        }
    };

    var keyPressed = function (event) {
        if (event.keyCode === 27) {
            contextMenu.close();
        }
        else if(event.keyCode === 69) {
            contextMenu.close();
            alert("Item Edited");
        }
        else if(event.keyCode === 82) {
            contextMenu.close();
            alert("Item Removed");
        }
        else if(event.keyCode === 68) {
            contextMenu.close();
            alert("Item Deactivated");
        }
    };

    exports.registerEventHandlers = registerEventHandlers;
//    return {
//        showMenu: showMenu,
//        registerContextMenuForTable: registerContextMenuForTable
//    };
});