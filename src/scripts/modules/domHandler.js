define("DomHandler", function (require, exports, module) {
    "use strict";

    var contextMenu = require('ContextMenu');
    var UserManager = require('UserManager');
    var User = require('User');
    var QueryParser = require("QueryParser");
    var NavbarHandler = require("NavbarHandler");
    var Notifier = require("Notifier");

    var registerEventHandlers = function (pageType) {
        registerMenuEvents();
        if (pageType === "view") {
            registerViewEvents();
            registerContextMenuEvents();
            registerContextMenuForTable();
            checkStatus();
        } else if (pageType === "save") {
            registerSaveEvents();
        }
    };

    var registerMenuEvents = function () {
        document.getElementsByClassName("menu-icon")[0].addEventListener("click", function () {
            if (window.getComputedStyle(document.getElementsByClassName("menu-container")[0]).display === "none") {
                NavbarHandler.show();
            } else {
                NavbarHandler.hide();
            }
        });
    };

    var registerSaveEvents = function () {
        registerFormFieldEvents();
        document.getElementById("save").addEventListener("click", saveHandler);

        document.getElementById("cancel").addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "index.html";
        });

        checkEdit();
        document.getElementById("firstName").focus();
    };

    var saveHandler = function (event) {
        event.preventDefault();
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var email = document.getElementById("email").value;
        var number = document.getElementById("number").value;

        var status = UserManager.validateUser(firstName, lastName, email, number);

        if (status.result === "success") {
            var saveStatus;
            if (this.getAttribute("data-action") === "create") {
                var newUser = new User.User(firstName, lastName, email, number, "Active");
                saveStatus = UserManager.createUser(newUser);
            } else if (this.getAttribute("data-action") === "edit") {
                var userId = parseInt(this.getAttribute("data-userId"));

                var editedUser = new User.User(firstName, lastName, email, number, "Active", userId);
                saveStatus = UserManager.editUser(editedUser);
            }

            goToHomePage(saveStatus);
        } else {
            /* Invalid user details */
            var invalidFields = status.fields;

            document.getElementById(invalidFields[0]).focus();
            for (var i = 0; i < invalidFields.length; i++) {
                showErrorField(invalidFields[i]);
            }
        }
    };

    var checkStatus = function () {
        var status = QueryParser.getUrlParameters(window.location.href);

        if (status.result === "error") {

        } else {
            var params = status.queryParams;

            if (params.action === "save") {
                var message;
                var status;
                if (params.result === "success") {
                    message = "User saved successfully";
                    status = "success";
                } else {
                    message = "Cannot save user data";
                    status = "error";
                }
                Notifier.show(message, status);
                setTimeout(function () {
                    Notifier.hide();
                }, 3000);
            }
        }
    };

    var checkEdit = function () {
        var status = QueryParser.getUrlParameters(window.location.href);

        if (status.result === "error") {
//            alert("User not specified");
//            window.location.href = "index.html";
        } else {
            var params = status.queryParams;

            var userId = parseInt(params.userId);
            var user = UserManager.getUser(userId);

            if (user === null) {
                alert("Invalid user");
            } else {
//                alert(JSON.stringify(user));
                var firstName = user.firstName;
                var lastName = user.lastName;
                var email = user.email;
                var number = user.phone;

                document.getElementById("firstName").value = firstName;
                document.getElementById("lastName").value = lastName;
                document.getElementById("email").value = email;
                document.getElementById("number").value = number;

                document.getElementById("save").setAttribute("data-action", "edit");
                document.getElementById("save").setAttribute("data-userId", userId);
            }
        }
    };

    var registerContextMenuEvents = function () {
        var editMenuItem = document.getElementById("editMenuItem");
        editMenuItem.addEventListener("click", function () {
            editUserEvent();
        });
        editMenuItem.addEventListener("keydown", function (event) {
            keyBoardEventHandler(event, editUserEvent);
        });


        var deleteMenuItem = document.getElementById("deleteMenuItem");
        deleteMenuItem.addEventListener("click", function () {
            deleteUserEvent();
        });
        deleteMenuItem.addEventListener("keydown", function (event) {
            keyBoardEventHandler(event, deleteUserEvent);
        });


        var statusToggleMenuItem = document.getElementById("statusToggleMenuItem");
        statusToggleMenuItem.addEventListener("click", function () {
            statusToggleEvent();
        });
        statusToggleMenuItem.addEventListener("keydown", function (event) {
            keyBoardEventHandler(event, statusToggleEvent);
        });
    };

    var editUserEvent = function () {
        contextMenu.close();

        editUserPage(getUserFromContext());
    };

    var deleteUserEvent = function () {
        contextMenu.close();
        deleteUser(getUserFromContext());
    };

    var statusToggleEvent = function () {
        contextMenu.close();

        var statusToggleMenuItem = document.getElementById("statusToggleMenuItem");

        if (statusToggleMenuItem.getAttribute("data-action") === "activate") {
            activateUser(getUserFromContext());
        } else {
            deactivateUser(getUserFromContext());
        }
    };

    var keyBoardEventHandler = function (event, callBack) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();
            callBack();
        }
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
        var confirmation = confirm("Are you sure you want to delete the user?");
        if (confirmation) {
            var status = UserManager.deleteUser(getUserFromContext());
            if (status) {
                var tableBody = getUsersTableBody();

                tableBody.removeChild(document.getElementById("userId_" + userId));

                if (tableBody.getElementsByTagName("tr").length === 0) {
                    createNoUserRow(tableBody);
                }

                Notifier.show("User deleted successfully", "success");

                setTimeout(function () {
                    Notifier.hide();
                }, 3000);
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

            Notifier.show("User deactivated", "success");

            setTimeout(function () {
                Notifier.hide();
            }, 3000);
        } else {

        }
    };

    var activateUser = function (userId) {
        var status = UserManager.activateUser(userId);

        if (status) {
            var row = document.getElementById("userId_" + userId);

            setUserStatus(userId, row, "Active");

            row.classList.remove("inactive");

            Notifier.show("User activated", "success");

            setTimeout(function () {
                Notifier.hide();
            }, 3000);
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
                    fNameCell.title = users[i].firstName;

                    var lNameCell = row.insertCell(1);
                    lNameCell.className = "table-cell";
                    lNameCell.innerHTML = users[i].lastName;
                    lNameCell.title = users[i].lastName;

                    var emailCell = row.insertCell(2);
                    emailCell.className = "table-cell";
                    emailCell.innerHTML = users[i].email;
                    emailCell.title = users[i].email;

                    var phnoCell = row.insertCell(3);
                    phnoCell.className = "table-cell";
                    phnoCell.innerHTML = users[i].phone;
                    phnoCell.title = users[i].phone;

                    var statusCell = row.insertCell(4);
                    statusCell.className = "table-cell";
                    statusCell.innerHTML = users[i].status;
                    statusCell.title = users[i].status;

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

    var goToHomePage = function (status) {
        var homePage = "index.html";

        if (status) {
            homePage += "?action=save&result=success";
        } else {
            homePage += "?action=save&result=error";
        }

        redirector(homePage);
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