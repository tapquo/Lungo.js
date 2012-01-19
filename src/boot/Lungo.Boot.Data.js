/**
 * Make an analysis of Data attributes in HTML elements and creates a <markup>
 * based on each data type.
 *
 * @namespace LUNGO.Boot
 * @class Data
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Data = (function(lng, undefined) {

    /**
     * Initialize the <markup> data-attributes analisys
     *
     * @method init
     *
     *
     */
    var start = function() {
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
            lng.View.Template.Binding.dataAttribute(element, attribute);
        }
    };

    return {
        start: start
    };

})(LUNGO);