define("StorageOps", function (require, exports, module) {
    "use strict";

    var database = "users";
    var _lastUserId = "lastUserId";

    (function init() {
        if (window.localStorage.getItem(database) === null) {
            window.localStorage.setItem(database, "[]");
        }
        if (window.localStorage.getItem(_lastUserId) === null) {
            window.localStorage.setItem(_lastUserId, "0");
        }
    })();

    var getLastUserId = function () {
        var lastUserId = parseInt(window.localStorage.getItem(_lastUserId));

//        var currentUserId = lastUserId + 1;
//        window.localStorage.setItem(lastUserId, currentUserId);

//        return currentUserId;
        return lastUserId;
    };

    var setLastUserId = function (userId) {
        window.localStorage.setItem(_lastUserId, userId);
    };

    var saveUser = function (user) {
        var usersList = window.localStorage.getItem(database);

        var users = JSON.parse(usersList);

        users.push(user);

        window.localStorage.setItem(database, JSON.stringify(users));

        return true;
    };

    var editUser = function (editedUser) {
        var userId = editedUser.id;

        var users = getAllUsers();
        
        var status = false;

        for (var i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                users[i].firstName = editedUser.firstName;
                users[i].lastName = editedUser.lastName;
                users[i].email = editedUser.email;
                users[i].phone = editedUser.phone;
                
                status = true;
                break;
            }
        }
        
        window.localStorage.setItem(database, JSON.stringify(users));
        return status;
    };

    var getUser = function (userId) {
        var users = getAllUsers();
        var user = null;

        for (var i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                user = users[i];
                break;
            }
        }

        return user;
    };

    var getAllUsers = function () {
        var userList = window.localStorage.getItem(database);

        return JSON.parse(userList);
    };

    var deleteUser = function (userId) {
        var users = getAllUsers();

        var userFound = false;
        for (var i = 0; i < users.length; i++) {
            var user = users[i];

            if (user.id === userId) {
                users.splice(i, 1);
                window.localStorage.setItem(database, JSON.stringify(users));
                userFound = true;
                break;
            }
        }

        return userFound === true ? true : false;
    };

    var deactivateUser = function (userId) {
        return setUserStatus(userId, "Inactive");
    };

    var activateUser = function (userId) {
        return setUserStatus(userId, "Active");

    };

    var setUserStatus = function (userId, status) {
        var users = getAllUsers();

        var userFound = false;
        for (var i = 0; i < users.length; i++) {
            var user = users[i];

            if (user.id === userId) {
                users[i].status = status;
                window.localStorage.setItem(database, JSON.stringify(users));
                userFound = true;
                break;
            }
        }

        return userFound === true ? true : false;
    };

    exports.getLastUserId = getLastUserId;
    exports.setLastUserId = setLastUserId;
    exports.getUser = getUser;
    exports.getAllUsers = getAllUsers;
    exports.saveUser = saveUser;
    exports.editUser = editUser;
    exports.deleteUser = deleteUser;
    exports.deactivateUser = deactivateUser;
    exports.activateUser = activateUser;
});