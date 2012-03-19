/**
 * External Data & Services Manager
 *
 * @namespace LUNGO
 * @class Service
 * @requires QuoJS
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Service = (function(lng, $$, undefined) {

    var URL_CACHE_INDEX_KEY = 'lungojs_service_cache';
    var DATE_PATTERN = {
        MINUTE: 'minute',
        HOUR: 'hour',
        DAY: 'day'
    };

    /**
     * Load data from the server using a HTTP GET request.
     *
     * @method get
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} Callback function after the request [OPTIONAL]
     * @param  {string} Mime-Type: json, xml, html, or text [OPTIONAL]
     */
    var get = function(url, data, success, dataType) {
        return $$.get(url, data, success, dataType);
    };

    /**
     * Load data from the server using a HTTP POST request.
     *
     * @method post
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} Callback function after the request [OPTIONAL]
     * @param  {string} Mime-Type: json, xml, html, or text [OPTIONAL]
     */
    var post = function(url, data, success, dataType) {
        return $$.post(url, data, success, dataType);
    };

    /**
     * Load data from the server using a HTTP GET request.
     *
     * @method json
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} [OPTIONAL] Callback function after the request
     */
    var json = function(url, data, success) {
        return $$.json(url, data, success);
    };

    /**
     * Auto-caching system with date pattern.
     *
     * @method cache
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {string} Date pattern (example: 15 minutes, 1 hour, 3 days)
     * @param  {Function} [OPTIONAL] Callback function after the request
     * @param  {string} Mime-Type: json, xml, html, or text [OPTIONAL]
     */
    var cache = function(url, data, date_pattern, callback, dataType) {
        var url_key = url + $$.serializeParameters(data);

        if (_urlCached(url_key, date_pattern)) {
            var value = lng.Data.Storage.persistent(url_key);
            if (value) {
                return callback.call(callback, value);
            }
        } else {
            return $$.get(url, data, function(result) {
                _saveServiceInCache(url_key, result);
                callback.call(callback, result);
            }, dataType);
        }
    };

    var _urlCached = function(url, date_pattern) {
        var in_cache = false;

        var url_cache_index = lng.Data.Storage.persistent(URL_CACHE_INDEX_KEY);
        if (url_cache_index) {
            var time_between = _calculateTimeSpent(url_cache_index[url]);
            in_cache = _checkIsValidPattern(time_between, date_pattern);
        }

        return in_cache;
    };

    var _calculateTimeSpent = function(url_last_access) {
        var now = new Date().getTime();
        var service_last_access = new Date(url_last_access).getTime();

        return now - service_last_access;
    };

    var _checkIsValidPattern = function(time_between, date_pattern) {
        var pattern = date_pattern.split(' ');
        var diference_time = _calculateDiferenceTime(pattern[1], time_between);

        return (diference_time < pattern[0]) ? true : false;
    };

    var _calculateDiferenceTime = function(pattern_name, time_between) {
        var diference = (time_between / 1000) / 60;

        if (pattern_name.indexOf(DATE_PATTERN.HOUR) >= 0) {
            diference = diference / 60;
        } else if (pattern_name.indexOf(DATE_PATTERN.DAY) >= 0) {
            diference = (diference / 60) / 24;
        }

        return diference;
    };

    var _saveServiceInCache = function(url, result) {
        var service_cache_index = lng.Data.Storage.persistent(URL_CACHE_INDEX_KEY) || {};
        service_cache_index[url] = new Date();

        lng.Data.Storage.persistent(URL_CACHE_INDEX_KEY, service_cache_index);
        lng.Data.Storage.persistent(url, result);
    };

    return {
        get: get,
        post: post,
        json: json,
        cache: cache,
        Settings: $$.ajaxSettings
    };

})(LUNGO, Quo);