define("DomHandler", function (require, exports, module) {
    "use strict";

    var contextMenu = require('ContextMenu');
    var UserManager = require('UserManager');
    var User = require('User');

    var registerEventHandlers = function (pageType) {
        if (pageType === "view") {
            registerViewEvents();
            registerContextMenuEvents();
            registerContextMenuForTable();
        } else if (pageType === "save") {
            registerSaveEvents();
        }
    };

    var registerSaveEvents = function () {
        registerFormFieldEvents();
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

                goToHomePage(createStatus);
            } else {
                /* Invalid user details */
                var invalidFields = status.fields;

                for (var i = 0; i < invalidFields.length; i++) {
                    showErrorField(invalidFields[i]);
                }
            }
        });

        document.getElementById("firstName").focus();
    };

    var registerContextMenuEvents = function () {
        document.getElementById("editMenuItem").addEventListener("click", function () {
            contextMenu.close();

            editUserPage(getUserFromContext());
        });
        document.getElementById("deleteMenuItem").addEventListener("click", function () {
            contextMenu.close();
            deleteUser(getUserFromContext());
        });
        document.getElementById("deactivateMenuItem").addEventListener("click", function () {
            contextMenu.close();
            
            if(!this.classList.contains("inactive")) {
                deactivateUser(getUserFromContext());
            }
            else {
                alert("User already inactive");
            }
        });
        document.getElementById("activateMenuItem").addEventListener("click", function () {
            contextMenu.close();
            alert("Activated");
        });
    };

    var registerFormFieldEvents = function () {
        var formFields = document.getElementsByClassName("form-field");

        for (var i = 0; i < formFields.length; i++) {
            formFields[i].addEventListener("change", function () {
                hideErrorField(this.id);
            });
        }
    };

    var showErrorField = function (fieldId) {
        document.getElementById(fieldId).classList.add("invalid-field");
        document.getElementById(fieldId + "Error").style.display = "block";
    };

    var hideErrorField = function (fieldId) {
        document.getElementById(fieldId).classList.remove("invalid-field");
        document.getElementById(fieldId + "Error").style.display = "none";
    };

    var getUserFromContext = function () {
        var userId = parseInt(document.getElementById("contextMenu").getAttribute("data-userId"));
        return userId;
    };

    var deleteUser = function (userId) {
        var status = UserManager.deleteUser(getUserFromContext());
        if (status) {
            var tableBody = getUsersTableBody();

            tableBody.removeChild(document.getElementById("userId_" + userId));

            if (tableBody.getElementsByTagName("tr").length === 0) {
                createNoUserRow(tableBody);
            }
        }
    };

    var getUsersTableBody = function () {
        var usersTable = document.getElementById("usersTable");
        var tableBody = usersTable.getElementsByTagName("tbody")[0];

        return tableBody;
    };

    var deactivateUser = function (userId) {
        var status = UserManager.deactivateUser(userId);

        if (status) {
            var row = document.getElementById("userId_" + userId);

            setUserStatus(userId, row, "Inactive");
            
            row.classList.add("inactive");
        } else {

        }
    };

    var setUserStatus = function (userId, row, status) {
        row.cells[4].innerHTML = status;
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
            } else if (event.keyCode === 69) { //Edit
                contextMenu.close();
                document.getElementById("editMenuItem").click();
            } else if (event.keyCode === 82) { //Delete
                contextMenu.close();
                document.getElementById("deleteMenuItem").click();
            } else if (event.keyCode === 68) { //Deactivate
                contextMenu.close();
                document.getElementById("deactivateMenuItem").click();
            } else if (event.keyCode === 65) { //Activate
                contextMenu.close();
                document.getElementById("activateMenuItem").click();

            }
        }
    };

    var createNoUserRow = function (tableBody) {
        var noUserRow = tableBody.insertRow(0);
        noUserRow.className = "table-row table-row-body";

        var cell = noUserRow.insertCell(0);
        cell.colSpan = 5;
        cell.className = "table-cell";
        cell.innerHTML = "No users found. <a href=\"save_user.html\">Click Here</a> to add.";
    };

    var showUsers = function (users) {
        var tableBody = getUsersTableBody();
        if (users === null || users === undefined || users.length === 0) {
            createNoUserRow(tableBody);
        } else {
            if (users instanceof Array) {
                for (var i = 0; i < users.length; i++) {
                    var row = tableBody.insertRow(i);
                    row.id = "userId_" + users[i].id;
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

                    if (users[i].status === "Inactive") {
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

    var goToHomePage = function () {
        redirector("index.html");
    };

    var editUserPage = function (userId) {
        redirector("save_user.html?userId=" + userId);
    };

    var redirector = function (url) {
        window.location.href = url;
    };

    var registerContextMenuEventToRow = function (row) {
        row.addEventListener("contextmenu", function (event) {
            contextMenu.show(event, row);
        });
    };

    exports.registerEventHandlers = registerEventHandlers;
    exports.showUsers = showUsers;
});