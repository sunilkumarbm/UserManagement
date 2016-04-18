define("StorageOps", function (require, exports, module) {
    "use strict";

    /**
     * Handles all database operatons. Currently the database
     *  being used is <a target="_blank" href="https://en.wikipedia.org/wiki/Local_storage">Local Storage</a>
     * @module modules/storageOps
     * @name StorageOps
     */
    var database = "localUsersMgmt";
    var _lastUserId = "lastUserId";

    /**
     * @function init
     * @description Database initialization
     */
    (function init() {
        if (window.localStorage.getItem(database) === null) {
            window.localStorage.setItem(database, "[]");
        }
        if (window.localStorage.getItem(_lastUserId) === null) {
            window.localStorage.setItem(_lastUserId, "0");
        }
    })();

    /**
     * @function getLastUserId
     * @description Get the last used user id
     * @returns {string} lastUserId
     */
    var getLastUserId = function () {
        var lastUserId = parseInt(window.localStorage.getItem(_lastUserId));
        return lastUserId;
    };

    /**
     * @function setLastUserId
     * @description Save last used user id in database
     * @param {Number} userId User id to be saved in database
     */
    var setLastUserId = function (userId) {
        window.localStorage.setItem(_lastUserId, userId);
    };


    /**
     * @function saveUser
     * @description Save user to database
     * @param {object} user User to be saved in database
     * @returns {boolean} status true
     */
    var saveUser = function (user) {
        var usersList = window.localStorage.getItem(database);

        var users = JSON.parse(usersList);

        users.push(user);

        window.localStorage.setItem(database, JSON.stringify(users));

        return true;
    };

    /**
     * @function editUser
     * @description Edit user details
     * @param {object} editedUser User details of the edited user
     * @returns {boolean} status <code>true</code> - if success / <code>false</code> - if failure
     */
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

    /**
     * @function getUser
     * @description Get the user from database
     * @param {Number} userId User id of the user
     * @returns {object} user User corresponding to given user id
     */
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

    /**
     * @function getAllUsers
     * @description Get all the users in the database
     * @returns {object[]} userList
     */
    var getAllUsers = function () {
        var userList = window.localStorage.getItem(database);

        return JSON.parse(userList);
    };

    /**
     * @function deleteUser
     * @description Deletes user from database
     * @param {Number} userId User id of the user
     * @returns {boolean} status <code>true</code> - if success / <code>false</code> - if failure
     */
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

    /**
     * @function deactivateUser
     * @description Deactivates a user in database
     * @param {Number} userId User id of the user
     * @returns {boolean} status <code>true</code> - if success / <code>false</code> - if failure
     */
    var deactivateUser = function (userId) {
        return setUserStatus(userId, "Inactive");
    };

    /**
     * @function activateUser
     * @description Activates a user in database
     * @param {Number} userId User id of the user
     * @returns {boolean} status <code>true</code> - if success / <code>false</code> - if failure
     */
    var activateUser = function (userId) {
        return setUserStatus(userId, "Active");

    };

    /**
     * @function setUserStatus
     * @description Sets the status of the user in database
     * @param {Number} userId User id of the user
     * @param {string} status Status of the user (active/inactive)
     * @returns {boolean} status <code>true</code> - if success / <code>false</code> - if failure
     */
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