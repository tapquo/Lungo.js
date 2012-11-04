/**
 * Wrapper for using LocalStorage & SessionStorage (HTML5 Feature)
 *
 * @namespace Lungo.Data
 * @class Storage
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

Lungo.Data.Storage = (function(lng, undefined) {

    var STORAGE = {
        PERSISTENT: 'localStorage',
        SESSION: 'sessionStorage'
    };

    /**
     * Wrapper for SessionStorage
     *
     * @method persistent
     *
     * @param {string} Key
     * @param {object} Value
     * @return {string} If no value assigned returns the value of established key
     */
    var persistent = function(key, value) {
        return _handler(STORAGE.PERSISTENT, key, value);
    };

    /**
     * Wrapper for SessionStorage
     *
     * @method session
     *
     * @param {string} Key
     * @param {object} Value
     * @return {string} If no value assigned returns the value of established key
     */
    var session = function(key, value) {
        return _handler(STORAGE.SESSION, key, value);
    };

    var _handler = function(storage, key, value) {
        var storage = window[storage];

        if (value) {
            _saveKey(storage, key, value);
        } else if (value === null) {
            _removeKey(storage, key);
        } else {
            return _getKey(storage, key);
        }
    };

    var _saveKey = function(storage, key, value) {
        value = JSON.stringify(value);
        storage.setItem(key, value);
    };

    var _removeKey = function(storage, key) {
        storage.removeItem(key);
    };

    var _getKey = function(storage, key) {
        value = storage.getItem(key);
        return JSON.parse(value);
    };

    return {
        session: session,
        persistent: persistent
    };

})(Lungo);
