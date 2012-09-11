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
        TEMPLATE: 'templates',
        SCRIPT: 'scripts'
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

        _cacheDOMElements();
    };

    var _loadResources = function(resource_key, resources, callback) {
        for (index in resources) {
            var url = _parseUrl(resources[index], resource_key);

            try {
                var response = _loadSyncResource(url);
                _factoryResources(resource_key, response);
            } catch(error) {
                lng.Core.log(3, error.message);
            }
        }
    };

    var _cacheDOMElements = function() {
        lng.Element.sections = lng.dom(ELEMENT.SECTION);
        lng.Element.asides = lng.dom(ELEMENT.ASIDE);
        // @todo: WTF?
        // lng.Element.toolbars = lng.dom(ELEMENT.ASIDE);
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
                throw new Error(ERROR.LOADING_RESOURCE + url);
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
        init: init
    };

})(Lungo, Quo);
