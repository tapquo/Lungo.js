var App = (function(lng, undefined) {

    var _getEnvironmentFromQuoJS = (function() {
        var environment = lng.Core.environment();
        if (environment.isMobile) {
            alert('Your Device is ' + environment.os.name + ' (' + environment.os.version + ')');
        }
    })();

    eventConsole = function(event) {
        $$('#touchevents-console').html($$(event.target).data('event'));
    };

    triggerCapture = function(event) {
        event.stopPropagation();
        Lungo.Notification.success("Event: " + event.type, "Layout events manager", "info", 2);
    };

    return {
        eventConsole: eventConsole,
        triggerCapture: triggerCapture

    };

})(Lungo);
