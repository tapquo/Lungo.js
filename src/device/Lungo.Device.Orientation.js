/**
 * Orientation Events API (HTML5 Feature)
 * DOM events that provide information about the physical orientation and
 * motion of a hosting device.
 * http://www.w3.org/TR/orientation-event/
 *
 * @namespace LUNGO.Device
 * @class Camera
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Device.Orientation = (function(lng, undefined) {

    var EVENTS = {
        ORIENTATION: 'deviceorientation',
        MOTION: 'devicemotion',
        COMPASS_CALIBRATION: 'compassneedscalibration'
    };

    var onChange = function(callback) {
        _addEvent(EVENTS.ORIENTATION, callback);
    };

    var onMotion = function(callback) {
        _addEvent(EVENTS.MOTION, callback);
    };

    var onNeedsCalibration = function(callback) {
        _addEvent(EVENTS.COMPASS_CALIBRATION, callback);
    };

    var _addEvent = function(event, callback) {
        //@todo: Cross-browser: IE fix
        window.addEventListener(event, function(event) {
            callback.apply(callback, event);
        }, true);
    };

    return {
        onChange: onChange,
        onMotion: onMotion,
        onNeedsCalibration: onNeedsCalibration
    };

})(LUNGO);