/**
 * Notifacion API (HTML5 Feature)
 * Pending to final SPEC, now it's a Phonegap Wrapper
 *
 * @namespace LUNGO.Device
 * @class Notification
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Device.Notification = (function(lng, undefined) {

    /**
     * Shows a custom alert or dialog box.
     *
     * @method alert
     *
     * @param {string} Dialog message
     * @param {Function} Callback to invoke when alert dialog is dismissed.
     * @param {string} Dialog title (Optional, Default: "Alert")
     * @param {string} Button name (Optional, Default: "OK")
     */
    var alert = function(message, callback, title, buttonName) {
        navigator.notification.alert(message, callback, title, buttonName)
    };

    /**
     * Shows a customizable confirmation dialog box.
     *
     * @method confirm
     *
     * @param {string} Dialog message @ToDo
     * @param {function} Callback to invoke with index of button pressed (1, 2 or 3).
     * @param {string} Dialog title (Optional, Default: "Confirm")
     * @param {string} Comma separated string with button labels (Optional, Default: "OK,Cancel")
     */
    var confirm = function(message, callback, title, buttonLabels) {
        navigator.notification.confirm(message, callback, title, buttonLabels)
    };

    /**
     * The device will play a beep sound.
     *
     * @method beep
     *
     * @param {number} The number of times to repeat the beep
     */
    var beep = function(times) {
        navigator.notification.beep(times)
    };

    /**
     * Vibrates the device for the specified amount of time.
     *
     * @method vibrate
     *
     * @param {number} Milliseconds to vibrate the device. 1000 milliseconds equals 1 second
     */
    var vibrate = function(milliseconds) {
        navigator.notification.vibrate(milliseconds)
    };

    return {
        alert: alert,
        confirm: confirm,
        beep: beep,
        vibrate: vibrate
    };

})(LUNGO);