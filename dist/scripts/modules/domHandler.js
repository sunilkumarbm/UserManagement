define("DomHandler", function (require, exports, module) {
    "use strict";

    var contextMenu = require('ContextMenu');
    var UserManager = require('UserManager');
    var User = require('User');

    var registerEventHandlers = function (pageType) {
        if (pageType === "view") {
            registerViewEvents();
            registerContextMenuForTable();
        } else if (pageType === "save") {
            registerSaveEvents();
        }
    };

    var registerSaveEvents = function () {
        document.getElementById("save").addEventListener("click", function (event) {
            event.preventDefault();
            var firstName = document.getElementById("firstName").value;
            var lastName = document.getElementById("lastName").value;
            var email = document.getElementById("email").value;
            var number = document.getElementById("number").value;
            
            var status = UserManager.validateUser(firstName, lastName, email, number);
            
            if (status.result === "success") {
                var newUser = new User.User(firstName, lastName, email, number, "Active");
                var createStatus = UserManager.createUser(newUser);
            }
            else {
                /* Invalid user details */
            }
        });
    };

    var registerViewEvents = function () {
        window.addEventListener("keydown", function (event) {
            keyPressed(event);
        });

        window.addEventListener("click", function () {
            contextMenu.close();
        });
    };

    var registerContextMenuForTable = function () {
        var tableRows = document.getElementsByClassName("table-row-body");

        for (var i = 0; i < tableRows.length; i++) {
            tableRows[i].addEventListener("contextmenu", contextMenu.show(this, tableRows[i]));
        }
    };

    var keyPressed = function (event) {
        if (!event.ctrlKey && !event.shiftKey && !event.altKey) {
            if (event.keyCode === 27) {
                contextMenu.close();
            } else if (event.keyCode === 69) {
                contextMenu.close();
                alert("Item Edited");
            } else if (event.keyCode === 82) {
                contextMenu.close();
                alert("Item Removed");
            } else if (event.keyCode === 68) {
                contextMenu.close();
                alert("Item Deactivated");
            } else if (event.keyCode === 65) {
                contextMenu.close();
                alert("Item activated");
            }
        }
    };


    var showUsers = function (users) {
        var usersTable = document.getElementById("usersTable");
        var tableBody = usersTable.getElementsByTagName("tbody")[0];
        if (users === null || users === undefined || users.length === 0) {
            var noUserRow = tableBody.insertRow(0);
            noUserRow.className = "table-row table-row-body";

            var cell = noUserRow.insertCell(0);
            cell.colSpan = 5;
            cell.className = "table-cell";
            cell.innerHTML = "No users found. <a href=\"save_user.html\">Click Here</a> to add";
        } else {
            if (users instanceof Array) {
                for (var i = 0; i < users.length; i++) {
                    var row = tableBody.insertRow(i);
                    row.className = "table-row table-row-body";
                    row.setAttribute("data-userId", users[i].id);

                    var fNameCell = row.insertCell(0);
                    fNameCell.className = "table-cell";
                    fNameCell.innerHTML = users[i].firstName;

                    var lNameCell = row.insertCell(1);
                    lNameCell.className = "table-cell";
                    lNameCell.innerHTML = users[i].lastName;

                    var emailCell = row.insertCell(2);
                    emailCell.className = "table-cell";
                    emailCell.innerHTML = users[i].email;

                    var phnoCell = row.insertCell(3);
                    phnoCell.className = "table-cell";
                    phnoCell.innerHTML = users[i].phone;

                    var statusCell = row.insertCell(4);
                    statusCell.className = "table-cell";
                    statusCell.innerHTML = users[i].status;

                    if (users[i].status === "In Active") {
                        row.className += " inactive";
                    }

                    registerContextMenuEventToRow(row);
                }
            } else {
                var corruptRow = tableBody.insertRow(0);
                corruptRow.className = "table-row table-row-body";

                var cell = corruptRow.insertCell(0);
                cell.colSpan = 5;
                cell.className = "table-cell";
                cell.innerHTML = "Your database might be corrupted.";
            }
        }
    };

    var registerContextMenuEventToRow = function (row) {
        row.addEventListener("contextmenu", function (event) {
            contextMenu.show(event, row);
        });
    };

    exports.registerEventHandlers = registerEventHandlers;
    exports.showUsers = showUsers;
});