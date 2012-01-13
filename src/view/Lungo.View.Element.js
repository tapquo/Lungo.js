/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace LUNGO.View
 * @class Element
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.View.Element = (function(lng, undefined) {

    var SELECTORS = {
        BUBBLE: '.bubble.count'
    };
    var BINDING_START = '{{';
    var BINDING_END = '}}';

    /**
     * Set a counter to the element
     *
     * @method count
     *
     * @param  {string} Element query selector
     * @param  {number} Value for counter
     */
    var count = function(selector, count) {
        var element = lng.dom(selector);

        if (element ) {
            if (count > 0) {
                _setBubble(element, count);
            } else {
                element.children(SELECTORS.BUBBLE).remove();
            }
        }
    };

    var _setBubble = function(element, count) {
        var bubbles = element.children(SELECTORS.BUBBLE);
        var total_bubbles = bubbles.length;

        if (total_bubbles > 0) {
            bubbles.html(count);
        } else {
            var count_html = LUNGO.Attributes.Data.Count.html;
            var html_binded = count_html.replace(BINDING_START + 'value' + BINDING_END, count);

            element.append(html_binded);
        }
    };

    return {
        count: count
    };

})(LUNGO);