/**
 * Make an analysis of Data attributes in HTML elements and creates a <markup>
 * based on each data type.
 *
 * @namespace Lungo.Boot
 * @class Data
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

Lungo.Boot.Data = (function(lng, undefined) {
    var BINDING = lng.Constants.BINDING;

    /**
     * Initialize the <markup> data-attributes analisys
     *
     * @method init
     *
     *
     */
    var init = function() {
        var attributes = lng.Attributes.Data;

        for (var attribute in attributes) {
            if (lng.Core.isOwnProperty(attributes, attribute)) {
                _findElements(attributes[attribute]);
            }
        }
    };

    var _findElements = function(attribute) {
        var elements = lng.dom(attribute.selector);

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
