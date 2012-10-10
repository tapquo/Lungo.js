/**
 * Geolocation API (HTML5 Feature)
 * Pending to final SPEC, now it's a Phonegap Wrapper
 * http://www.w3.org/TR/geolocation-API/
 *
 * @namespace LUNGO.Device
 * @class Gps
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Device.Gps = (function(lng, undefined) {

    var _position = null;
    var _watcher = null;

    var CALLBACK = {
        success: null,
        error: null
    };

    var GPS_OPTIONS = {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000
    };

    /**
     * @ToDo
     *
     * @method get
     *
     * @param {Function} Callback
     */
    var get = function(callbacks, options) {
        if (_isReady()) {
            _bindCallbacks(callbacks);
            navigator.geolocation.getCurrentPosition(_success, _error, options);
        }
    };

    /**
     * @ToDo
     *
     * @method get
     *
     * @param {Function} @ToDo
     * @param {object} @ToDo
     */
    var watch = function(callbacks, options) {
        if (_isReady()) {
            _bindCallbacks(callbacks);
            _watcher = navigator.geolocation.watchPosition(_success, _error, options);
        }
    };

    /**
     * @ToDo
     *
     * @method position
     *
     */
    var position = function() {
        return _position;
    };

    /**
     * @ToDo
     *
     * @method clear
     */
    var stop = function() {
        _clearPosition();
    };

    /**
     * Console system to display messages when you are in debug mode.
     *
     * @method log
     *
     * @param {number} Severity based in (1)Log, (2)Warn, (>2)Error
     * @param {string} Message to show in console
     */
    var address = function(latitude, longitude, callback) {
        // @ToDo: Check Social Analytics RESTful
    };

    var _isReady = function() {
        if (navigator.geolocation) {
            _clearPosition();
            return true;
        } else {
            lng.core.log(3, 'Lungo.Device.Gps [ERROR]: navigator.geolocation is innacesible.')
            return false;
        }
    };

    var _clearPosition = function() {
        _position = null;

        if (_watcher) {
            navigator.geolocation.clearWatch(_watcher);
            _watcher = null;
        }
    };

    var _bindCallbacks = function(callbacks) {
        CALLBACK.success = (callbacks.success || null);
        CALLBACK.error = (callbacks.error || null);
    };

    var _success = function(position) {
        _position = position.coords;
        CALLBACK.success.call(CALLBACK.success, position);
    };

    var _error = function(error) {
        _clearPosition();
        CALLBACK.error.call(CALLBACK.error, error);
    };

    return {
        get: get,
        watch: watch,
        position: position,
        address: address,
        stop: stop
    }

})(LUNGO);