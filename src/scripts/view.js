require.config({
    paths: {
        DomHandler: "modules/domHandler",
        UserManager: "modules/UserManager",
        User: "modules/User",
        ContextMenu: "modules/contextMenu",
        StorageOps: "modules/storageOps",
        NameValidator: "modules/NameValidator",
        NumberValidator: "modules/NumberValidator",
        EmailValidator: "modules/EmailValidator"
    }
});

require(["DomHandler", "UserManager"], function (DomHandler, UserManager) {
    DomHandler.registerEventHandlers("view");
    
    var users = UserManager.getAllUsers();
    DomHandler.showUsers(users);
});