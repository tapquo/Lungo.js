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
        for (resource_key in resources) {
            _loadResources(resource_key, resources[resource_key]);
        }
    };

    var _loadResources = function(resource_key, resources, callback) {
        for (index in resources) {
            var url = _parseUrl(resources[index], resource_key);

            try {
                var response = _loadSyncResource(url);
                _pushResourceInBody(response);
            } catch(error) {
                lng.Core.log(3, error.message);
            }
        }
    };

    var _parseUrl = function(section_url, folder) {
        return (/http/.test(section_url)) ? section_url : 'app/resources/' + folder + '/' + section_url;
    };

    var _loadSyncResource = function(url) {
        return $$.ajax({
            url: url,
            async: false,
            dataType: 'html',
            error: function() {
                console.error(ERROR.LOADING_RESOURCE + url);
                // throw new Error(ERROR.LOADING_RESOURCE + url);
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
