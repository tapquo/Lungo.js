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

    /**
     * Rezise a <scroll> element
     *
     * @method scroll
     *
     * @param {object} Object reference of a determinated <section>
     */
    var scroll = function(scroll) {
        var container = scroll.children().first();
        var child = container.children().first();

        if (lng.View.Scroll.isHorizontal(scroll)) {
            _resizeScrollContainerWidth(container, child);
        } else {
            _resizeScrollContainerHeight(scroll, container, child);
        }
    };

    /**
     * Resize all <article>s from determinated <section> based on a CSS property.
     *
     * @method article
     *
     * @param {object} Object reference of a determinated <section>
     * @param {string} Selector that refers to a section element
     * @param {string} CSS property
     * @param {string} Element reference for resizing
     */
    var article = function(section, selector, property, reference) {
        var element = section.children(selector);
        var ARTICLE = 'article';

        if (element.length > 0) {
            var reference_dimension = element[reference]();
            section.children(ARTICLE).css(property, reference_dimension + 'px');
        }
    };

    /**
     * Sets toolbars width, using total screen width
     *
     * @method toolbars
     */
    var toolbars = function() {
        var toolbar = '.toolbar nav';
        var all_toolbars = lng.Dom.query(toolbar);

        for (var i = 0, len = all_toolbars.length; i < len; i++) {
            var toolbar = lng.Dom.query(all_toolbars[i]);
            var toolbar_children = toolbar.children();
            var toolbar_children_width = (toolbar.width() / toolbar_children.length);

            toolbar_children.css('width', toolbar_children_width + 'px');
        }
    };

    var _resizeScrollContainerWidth = function(container, child) {
        var scroll_width = (container.children().length * child.width());
        container.css('width', scroll_width + 'px');
    };

    var _resizeScrollContainerHeight = function(scroll, container, child) {
        var total_children = container.children().length;
        var children_in_scroll_width = Math.floor(scroll.width() / child.width());
        var total_rows = Math.ceil(total_children / children_in_scroll_width);

        var scroll_height = (total_rows * child.height());
        container.css('height', scroll_height + 'px');
    };

    return {
        scroll: scroll,
        article: article,
        toolbars: toolbars
    };

})(LUNGO);