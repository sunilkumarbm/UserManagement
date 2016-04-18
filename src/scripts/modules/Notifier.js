define(function (require, exports, module) {
    "use strict";
    
    /**
     * Navbar controller
     * @module modules/Notifier
     * @name Notifier
     */
    var notificationBar = document.getElementsByClassName("notify")[0];
    var notificationLabel = document.getElementById("notification");

    var MESSAGE_TYPE_SUCCESS = "success";
    var MESSAGE_TYPE_FAILURE = "failure";


    (
        /**
          * @function init
          * @description Notifier module initialization
         */
        function init() {
        var notifyClose = document.getElementsByClassName("notify-close");

        for (var i = 0; i < notifyClose.length; i++) {
            notifyClose[i].addEventListener("click", function () {
                hide();
            });
        }
    })();


    /**
     * @function show
     * @description Displays notification
     * @param {string} message Message to display in the notification
     * @param {string} type Type of message (success/error)
     */
    var show = function (message, type) {
        notificationLabel.innerHTML = message;

        notificationBar.style.display = "inline-block";
        notificationBar.setAttribute("aria-hidden", "false");

        if (type.toLowerCase() === MESSAGE_TYPE_SUCCESS) {
            notificationBar.classList.add("notify-success");
        } else {
            notificationBar.classList.add("notify-error");
        }
    };

    /**
     * @function hide
     * @description Hides notification
     */
    var hide = function () {
        notificationBar.style.display = "none";
        notificationBar.setAttribute("aria-hidden", "true");
    };

    exports.show = show;
    exports.hide = hide;
});