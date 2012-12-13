/**
 * Make an analysis of Data attributes in HTML elements and creates a <markup>
 * based on each data type.
 *
 * @namespace Lungo
 * @class Attributes
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 * @author Marcin Ciunelis <marcin.ciunelis@gmail.com> || @martinciu
 */


Lungo.Attributes = (function(lng, undefined) {
    var BINDING = lng.Constants.BINDING;

    var _scope = null;

    /**
     * Initialize the <markup> data-attributes analisys
     * for a given DOM element
     *
     * @method init
     *
     * @param {Object} QuoJS <element> instance
     */
    var init = function(scope) {
        _scope = scope
        var attributes = lng.Attributes.Data;

        for (var attribute in attributes) {
            if (lng.Core.isOwnProperty(attributes, attribute)) {
                _findElements(attributes[attribute]);
            }
        }
    };

    var _findElements = function(attribute) {
        var elements = _scope.find(attribute.selector);

        for (var i = 0, len = elements.length; i < len; i++) {
            var element = lng.dom(elements[i]);
            _dataAttribute(element, attribute);
        }
    };

    var _dataAttribute = function(element, attribute) {
        var data = element.data(attribute.tag);

        if (data) {
            var html_binded = attribute.html.replace(BINDING.START + BINDING.KEY + BINDING.END, data);
            element.prepend(html_binded);
        }
    };

    return {
        init: init
    };

})(Lungo);
