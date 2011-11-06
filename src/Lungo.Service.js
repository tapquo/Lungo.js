/** 
 * External Data & Services Manager
 * 
 * @namespace LUNGO
 * @class Service
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Service = (function(lng, $, undefined) {

    /**
     * Load data from the server using a HTTP GET request.
     *
     * @method get
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} [OPTIONAL] Callback function after the request
     */
    var get = function(url, data, callback) {
        var parameters = '?';
        for (var parameter in data) {
            if (lng.Core.isOwnProperty(data, parameter)) {
                if (parameters !== '?') parameters += '&';
                parameters += parameter + '=' + data[parameter];
            }
        }
        url = url + parameters;

        _ajax('GET', url, null, callback);
    };

    /**
     * Load data from the server using a HTTP POST request.
     *
     * @method post
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} [OPTIONAL] Callback function after the request
     */
    var post = function(url, data, callback) {
        _ajax('POST', url, data, callback);
    };

    var _ajax = function(type, url, data, callback, error) {
        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: 'json',
            success: function(response) {
                if (lng.Core.toType(callback) === 'function') {
                    setTimeout(callback, 100, response);
                }
            },
            error: function(xhr, type) {
                if (error) {
                    setTimeout(error, 100, result);
                }
            }
        });
    };

    return {
        get: get,
        post: post
    };

})(LUNGO, Zepto);