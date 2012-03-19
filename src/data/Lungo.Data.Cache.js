/**
 * Temporary cache system
 *
 * @namespace LUNGO.Data
 * @class Cache
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Data.Cache = (function(lng, undefined) {

    var _cache = {};

    /**
     * Sets in the LungoJS cache system a new key/value
     *
     * @method set
     *
     * @param {string} Key for the new value
     * @param {object} Type of environment: DESKTOP_ENVIRONMENT or MOBILE_ENVIRONMENT
     */
    var set = function(key, value) {
        if (exists(key)) {
            _cache[key] = lng.Core.mix(get(key), value);
        } else {
            _cache[key] = value;
        }
    };

    /**
     * Returns the value of a given key.
     *
     * @method get
     *
     * @param {string} Key in LungoJS Cache System
     * @param {string} [OPTIONAL] Subkey in LungoJS Cache System
     * @return {object} Value
     */
    var get = function(key, value) {
        if (arguments.length === 1) {
            return _cache[key];
        } else {
            return (_cache[arguments[0]]) ? _cache[arguments[0]][arguments[1]] : undefined;
        }
    };

    /**
     * Removes the instance in LungoJs Cache System of a given key
     *
     * @method remove
     *
     * @param {string} Key in LungoJS Cache System
     * @param {string} [OPTIONAL] Subkey in LungoJS Cache System
     */
    var remove = function(key, value) {
        if (arguments.length === 1) {
            delete _cache[key];
        } else {
            delete _cache[arguments[0]][arguments[1]];
        }
    };

    /**
     * Returns the existence of a key in LungoJs Cache System
     *
     * @method exists
     *
     * @param {String} Key in LungoJS Cache System
     * @return {Boolean} true if exists, false if not
     */
    var exists = function(key) {
        return (_cache[key]) ? true : false;
    };

    return {
        set: set,
        get: get,
        remove: remove,
        exists: exists
    };

})(LUNGO);