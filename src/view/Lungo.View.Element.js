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
        BUBBLE: '.bubble'
    };
    var BINDING_START = '{{';
    var BINDING_END = '}}';


    var count = function(selector, count) {
        var element = lng.Dom.query(selector);

        if (element ) {
            if (count > 0) {
                _setBubble (element, count);
            } else {
                element.children(SELECTORS.BUBBLE).remove();
            }
        }
    };

    var _setBubble = function(element, count) {
        var bubbles = element.children(SELECTORS.BUBBLE);
        var total_bubbles = bubbles.length;

        if (total_bubbles > 0) {
            for (i=0, len = total_bubbles.length; i < len; i++) {
                bubbles.html(count);
            }
        } else {
            var count_html = LUNGO.Attributes.Data.Count.html;
            var html_binded = count_html.replace(BINDING_START + 'value' + BINDING_END, count);

            element.append(html_binded);
        }
    }

    return {
        count: count
    };

})(LUNGO);