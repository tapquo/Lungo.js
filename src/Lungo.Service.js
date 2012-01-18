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
     * @param  {Function} [OPTIONAL] Callback function after the request, if it ended successfully
     * @param  {Function} [OPTIONAL] Callback function after the request, if it ended with errors
     */
    var get = function(url, data, success, error) {
        var parameters = '?';
        for (var parameter in data) {
            if (lng.Core.isOwnProperty(data, parameter)) {
                if (parameters !== '?') parameters += '&';
                parameters += parameter + '=' + data[parameter];
            }
        }
        url = url + parameters;

        _ajax('GET', url, null, success, error);
    };

    /**
     * Load data from the server using a HTTP POST request.
     *
     * @method post
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} [OPTIONAL] Callback function after the request, if it ended successfully
     * @param  {Function} [OPTIONAL] Callback function after the request, if it ended with errors
     */
    var post = function(url, data, success, error) {
        _ajax('POST', url, data, success, error);
    };

    /**
     * Load data from the server using a HTTP PUT request.
     *
     * @method put
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} [OPTIONAL] Callback function after the request, if it ended successfully
     * @param  {Function} [OPTIONAL] Callback function after the request, if it ended with errors
     */
    var put = function(url, data, success, error) {
        new_data = _clone_and_add_method(data, "PUT");
        _ajax('POST', url, new_data, success, error);
    };

    /**
     * Load data from the server using a HTTP DELETE request.
     *
     * @method delete
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} [OPTIONAL] Callback function after the request, if it ended successfully
     * @param  {Function} [OPTIONAL] Callback function after the request, if it ended with errors
     */
    var del = function(url, data    , success, error) {
        new_data = _clone_and_add_method(data, "DELETE");
        _ajax('POST', url, new_data, success, error);
    };

    var _ajax = function(type, url, data, success, error) {
        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: 'json',
            success: function(response) {
                if (lng.Core.toType(success) === 'function') {
                    setTimeout(success, 100, response);
                }
            },
            error: function(xhr, type) {
                if (error) {
                    setTimeout(error, 100, xhr);
                }
            }
        });
    };

    var _clone_and_add_method = function(obj, mth) {
        new_data = _clone(data);

        if(typeof(new_data) == "undefined")
          new_data={}
        new_data["_method"]=mth;

        return new_data;
    }

    var _clone = function(obj) {
        if(obj == null || typeof(obj) != 'object')
            return obj;

        var temp = obj.constructor();

        for(var key in obj)
            temp[key] = _clone(obj[key]);
        return temp;
    }

    return {
        get: get,
        post: post,
        put: put,
        delete: del
    };

})(LUNGO, Zepto);
