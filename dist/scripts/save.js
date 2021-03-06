require.config({
    paths: {
        DomHandler: "modules/domHandler",
        UserManager: "modules/UserManager",
        User: "modules/User",
        ContextMenu: "modules/contextMenu",
        StorageOps: "modules/storageOps",
        NameValidator: "modules/NameValidator",
        NumberValidator: "modules/NumberValidator",
        EmailValidator: "modules/EmailValidator",
        QueryParser: "modules/QueryParser",
        NavbarHandler: "modules/NavbarHandler",
        Notifier: "modules/Notifier"
    }
});

require(["DomHandler", "UserManager"], function (DomHandler, UserManager) {
    DomHandler.registerEventHandlers("save");
});