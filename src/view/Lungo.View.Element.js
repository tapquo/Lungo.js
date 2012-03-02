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
        PROGRESS_PERCENTAGE: ' .labels span:last-child',
        PROGRESS_DESCRIPTION: ' .labels span:first-child'
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
    var progress = function(selector, percentage, with_labels, description) {
        var element = lng.dom(selector);

        if (element) {
            percentage += ATTRIBUTE.PERCENT;

            lng.dom(selector + SELECTORS.PROGRESS_VALUE).style(ATTRIBUTE.WIDTH, percentage);

            _setProgressLabel(selector + SELECTORS.PROGRESS_PERCENTAGE, with_labels, percentage);
            _setProgressLabel(selector + SELECTORS.PROGRESS_DESCRIPTION, with_labels, description);
        }
    };

    var _setBubble = function(element, count) {
        var bubbles = element.children(SELECTORS.BUBBLE);
        var total_bubbles = bubbles.length;

        if (total_bubbles > 0) {
            bubbles.html(count);
        } else {
            var count_html = LUNGO.Attributes.Data.Count.html;
            var html_binded = count_html.replace(BINDING.START + BINDING.KEY + BINDING.END, count);

            element.append(html_binded);
        }
    };

    var _setProgressLabel = function(selector, with_labels, attribute) {
        lng.dom(selector).html((with_labels) ? attribute : ATTRIBUTE.EMPTY);
    };

    return {
        count: count,
        progress: progress
    };

})(LUNGO);