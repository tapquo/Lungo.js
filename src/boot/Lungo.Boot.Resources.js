/**
 * Load Resources
 *
 * @namespace Lungo.Boot
 * @class Resources
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Boot.Resources = (function(lng, $$, undefined) {

    var ELEMENT = lng.Constants.ELEMENT;
    var ERROR = lng.Constants.ERROR;

    var RESOURCE = {
        SECTION: 'sections',
        ASIDE: 'asides'
    };

    /**
     * Start loading async sections (local & remote)
     *
     * @method start
     *
     */
    var init = function(resources) {
        for (var i=0, len=resources.length; i < len; i++) {
            resource = resources[i];
            try {
                var response = _loadSyncResource(resource);
                _pushResourceInBody(response);
            } catch(error) {
                lng.Core.log(3, error.message);
            }

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
        init: init
    };

})(Lungo, Quo);
