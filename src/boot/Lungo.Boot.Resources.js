/**
 * Load Resources
 *
 * @namespace LUNGO.Boot
 * @class Resources
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Boot.Resources = (function(lng, $$, undefined) {

    var ELEMENT = lng.Constants.ELEMENT;
    var ERROR = lng.Constants.ERROR;

    var RESOURCE = {
        SECTION: 'sections',
        TEMPLATE: 'templates',
        SCRIPT: 'scripts'
    };

    /**
     * Start loading async sections (local & remote)
     *
     * @method start
     *
     */
    var start = function() {
        var resources = lng.App.get('resources');
        for (resource_key in resources) {
            _loadResources(resource_key, resources[resource_key]);
        }
    };

    var _loadResources = function(resource_key, resources, callback) {
        for (index in resources) {
            var url = _parseUrl(resources[index], resource_key);

            try {
                var response = _loadAsyncResource(url);
                _factoryResources(resource_key, response);
            } catch(error) {
                lng.Core.log(3, ERROR.LOADING_RESOURCE + ' ' + error);
            }
        }
    };

    var _parseUrl = function(section_url, folder) {
        return (/http/.test(section_url)) ? section_url : 'app/' + folder + '/' + section_url;
    };

    var _loadAsyncResource = function(url) {
        return $$.ajax({
            url: url,
            async: false,
            dataType: 'html',
            error: function() {
                console.error('[ERROR] Loading url', arguments);
            }
        });
    };

    var _factoryResources = function(resource_key, response) {
        switch(resource_key) {
            case RESOURCE.SECTION:
                _pushSectionInLayout(response);
                break;

            case RESOURCE.TEMPLATE:
                _createTemplate(response);
                break;

            case RESOURCE.SCRIPT:
                break;
        }
    };

    var _pushSectionInLayout = function(section) {
        if (lng.Core.toType(section) === 'string') {
            lng.dom(ELEMENT.BODY).append(section);
        }
    };

    var _createTemplate = function(markup) {
        var div = document.createElement(ELEMENT.DIV);
        div.innerHTML = markup;

        var template_id = lng.dom(div.firstChild).data('template');

        if (template_id) {
            lng.View.Template.create(template_id, markup);
        }
    };

    return {
        start: start
    };

})(LUNGO, Quo);