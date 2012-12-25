/**
 * Load Resources
 *
 * @namespace Lungo
 * @class Resource
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Resource = (function(lng, $$, undefined) {

    var ELEMENT = lng.Constants.ELEMENT;
    var ERROR = lng.Constants.ERROR;

    /**
     * Start loading async sections (local & remote)
     *
     * @method start
     *
     */
    var load = function(resource) {
        if (lng.Core.toType(resource) === 'array') {
            for (var i=0, len=resource.length; i < len; i++) {
                _load(resource[i]);
            }
        } else {
            _load(resource);
        }
    };

    /**
     *
     */
    var _load = function(resource) {
        try {
            var response = _loadSyncResource(resource);
            _pushResourceInBody(response);
        } catch(error) {
            lng.Core.log(3, error.message);
        }
    };

    var _loadSyncResource = function(url) {
        return $$.ajax({
            url: url,
            async: false,
            dataType: 'html',
            error: function() {
                console.error(ERROR.LOADING_RESOURCE + url);
            }
        });
    };

    var _pushResourceInBody = function(section) {
        if (lng.Core.toType(section) === 'string') {
            lng.dom(ELEMENT.BODY).append(section);
        }
    };

    return {
        load: load
    };

})(Lungo, Quo);
