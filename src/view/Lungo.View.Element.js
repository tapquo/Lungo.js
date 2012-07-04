/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace LUNGO.View
 * @class Element
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.View.Element = (function(lng, undefined) {

    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var BINDING = lng.Constants.BINDING;
    var SELECTORS = {
        BUBBLE: '.bubble.count',
        PROGRESS_VALUE: ' .value',
        PROGRESS_PERCENTAGE: ' .value .label'
    };

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

        if (element) {
            if (count > 0) {
                _setBubble(element, count);
            } else {
                element.children(SELECTORS.BUBBLE).remove();
            }
        }
    };

    /**
     * Set a progress to the element
     *
     * @method progress
     *
     * @param  {string}  Element query selector
     * @param  {number}  Percentage
     * @param  {boolean} Show the labels: description and current percentage
     * @param  {string}  Description
     */
    var progress = function(selector, percentage, with_label) {
        var element = lng.dom(selector);

        if (element) {
            percentage += ATTRIBUTE.PERCENT;

            lng.dom(selector + SELECTORS.PROGRESS_VALUE).style(ATTRIBUTE.WIDTH, percentage);
            lng.dom(selector + SELECTORS.PROGRESS_PERCENTAGE).html((with_label) ? percentage : ATTRIBUTE.EMPTY);
        }
    };

    /**
     * Set a progress to the element
     *
     * @method loading
     *
     * @param  {string}  Element query selector
     * @param  {number}  stylesheet (null for hide)
     */
    var loading = function(selector, stylesheet) {
        var element = lng.dom(selector);

        if (element) {
            if (stylesheet) {
                _bindAttribute(element, LUNGO.Attributes.Data.Loading, stylesheet);
            }
            else {
                element.children('.loading').remove();
            }
        }
    };

    var _setBubble = function(element, count) {
        var bubbles = element.children(SELECTORS.BUBBLE);
        var total_bubbles = bubbles.length;

        if (total_bubbles > 0) {
            bubbles.html(count);
        } else {
            _bindAttribute(element, LUNGO.Attributes.Data.Count, count);
        }
    };

    var _bindAttribute = function(element, attribute, data) {
        var html_binded = attribute.html.replace(BINDING.START + BINDING.KEY + BINDING.END, data);
        element.append(html_binded);
    };

    return {
        count: count,
        progress: progress,
        loading: loading
    };

})(LUNGO);