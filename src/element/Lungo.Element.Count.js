/**
  * Set a counter to the element
 *
 * @namespace Lungo.Element
 * @class count
 *
 * @param  {string} Element query selector
 * @param  {number} Value for counter
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Element.count = function(selector, count) {
    var element = Lungo.dom(selector);
    element.children('.bubble.count').remove();

    if (element && count) {
        var binding = Lungo.Constants.BINDING.SELECTOR;
        html = Lungo.Attributes.Data.count.html.replace(binding, count);
        element.append(html);
    }
};
