define(function (require, exports, module) {
    "use strict";
    var notificationBar = document.getElementsByClassName("notify")[0];
    var notificationLabel = document.getElementById("notification");

    var MESSAGE_TYPE_SUCCESS = "success";
    var MESSAGE_TYPE_FAILURE = "failure";


    (function () {
        var notifyClose = document.getElementsByClassName("notify-close");

        for (var i = 0; i < notifyClose.length; i++) {
            notifyClose[i].addEventListener("click", function () {
                hide();
            });
        }
    })();

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

    var hide = function () {
        notificationBar.style.display = "none";
        notificationBar.setAttribute("aria-hidden", "true");
    };

    exports.show = show;
    exports.hide = hide;
});