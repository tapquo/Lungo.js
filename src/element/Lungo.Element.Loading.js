/**
 * Creates a loading element in any area of layout
 *
 * @namespace Lungo.Element
 * @method loading
 *
 * @param  {string}  Element query selector
 * @param  {number}  stylesheet (null for hide)
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Element.loading = function(selector, stylesheet) {
    var element = Lungo.dom(selector);

    if (element) {
        var html = null;

        if (stylesheet) {
            var binding = Lungo.Constants.BINDING.SELECTOR;
            html = Lungo.Attributes.Data.Loading.html.replace(binding, stylesheet);
        }
        element.html(html);
    }
};
