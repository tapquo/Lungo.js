/**
 *
 *
 * @namespace Lungo.View
 * @class Resize
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

Lungo.View.Resize = (function(lng, undefined) {

    var ATTRIBUTE = lng.Constants.ATTRIBUTE;

    /**
     * Sets toolbars width, using total screen width
     *
     * @method toolbars
     */
    var navigation = function() {
        if (!lng.Element.navigation)
            lng.Element.navigation = lng.dom('footer nav, .groupbar');

        for (var i = 0, len = lng.Element.navigation.length; i < len; i++) {
            var element = lng.dom(lng.Element.navigation[i]);
            var element_children = element.children();
            var element_children_percent = 100 / element.children().length;

            element_children.style(ATTRIBUTE.WIDTH, element_children_percent + ATTRIBUTE.PERCENT);
        }
    };

    return {
        navigation: navigation
    };

})(Lungo);
