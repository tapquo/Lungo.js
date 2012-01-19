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

    return {
        get: get,
        post: post,
        json: json,
        Settings: $$.ajaxSettings
    };

})(LUNGO, Quo);