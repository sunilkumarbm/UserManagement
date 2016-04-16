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
    };
    
    var getAllUsers = function () {
        var userList = window.localStorage.getItem(database);
        
        return JSON.parse(userList);
    };
    
    exports.getLastUserId = getLastUserId;
    exports.setLastUserId = setLastUserId;
    exports.getAllUsers = getAllUsers;
    exports.saveUser = saveUser;
});