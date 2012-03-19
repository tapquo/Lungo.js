/**
 *
 *
 * @namespace LUNGO.View
 * @class Resize
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Resize = (function(lng, undefined) {

    var ATTRIBUTE = lng.Constants.ATTRIBUTE;

    /**
     * Sets toolbars width, using total screen width
     *
     * @method toolbars
     */
    var toolbars = function() {
        var toolbar = '.toolbar nav, .groupbar';
        var all_toolbars = lng.dom(toolbar);

        for (var i = 0, len = all_toolbars.length; i < len; i++) {
            var toolbar = lng.dom(all_toolbars[i]);
            var toolbar_children = toolbar.children();
            var toolbar_children_percent = 100 / toolbar.children().length;

            toolbar_children.style(ATTRIBUTE.WIDTH, toolbar_children_percent + ATTRIBUTE.PERCENT);
        }
    };

    return {
        toolbars: toolbars
    };

})(LUNGO);