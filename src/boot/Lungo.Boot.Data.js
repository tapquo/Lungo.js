/**
 * Make an analysis of Data attributes in HTML elements and creates a <markup>
 * based on each data type.
 *
 * @namespace Lungo.Boot
 * @class Data
 *
 * @author Javier Jimenez Villar <javi@tapquo.com>  || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com>     || @pasku1
 * @author Ignacio Olalde <ina@tapquo.com>          || @piniphone
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
    var init = function(selector) {
        var el = lng.dom(selector || document.body);
        if (el.length > 0) _findDataAttributesIn(el);
    };

    var _findDataAttributesIn = function(element) {
        for (var key in lng.Attributes.Data) {
            if (lng.Core.isOwnProperty(lng.Attributes.Data, key)) {
                _findElements(element, key);
            }
        }
    };

    var _findElements = function(element, key) {
        attribute = lng.Attributes.Data[key];
        var selector = attribute.selector + "[data-" + key + "]";
        element.find(selector).each(function(index, children) {
            var el = lng.dom(children);
            _bindDataAttribute(el, el.data(key), attribute.html);
        });
    };

    var _bindDataAttribute = function(element, value, html) {
        var html_binded = html.replace(BINDING.START + BINDING.KEY + BINDING.END, value);
        element.prepend(html_binded);
    };

    return {
        init: init
    };

})(Lungo);
