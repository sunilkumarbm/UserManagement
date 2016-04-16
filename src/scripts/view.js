require.config({
    paths: {
        DomHandler: "modules/domHandler",
        ContextMenu: "modules/contextMenu"
    }
});

require(["DomHandler"], function (DomHandler) {
    DomHandler.registerEventHandlers();
});