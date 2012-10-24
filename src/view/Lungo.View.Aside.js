/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace Lungo.View
 * @class Aside
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.View.Aside = (function(lng, undefined) {

    var ELEMENT = lng.Constants.ELEMENT;
    var CLASS = lng.Constants.CLASS;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;

    /**
     * Toggle an aside element
     *
     * @method toggle
     *
     * @param  {string} Aside id
     */
    var toggle = function(aside_id) {
        aside = _findAside(aside_id);
        if (aside) {
            var is_visible = aside.hasClass(CLASS.SHOW);
            if (is_visible) {
                lng.View.Aside.hide();
            } else {
                lng.View.Aside.show(aside);
            }
        }
        aside = null;
    };

    /**
     * Display an aside element with a particular <section>
     *
     * @method show
     *
     * @param  {string} Aside id
     */
    var show = function(aside) {
        if (lng.Core.toType(aside) == 'string') aside = _findAside(lng.Core.parseUrl(aside));
        if (aside) {
            lng.Element.Cache.aside = aside;
            var aside_stylesheet = _asideStylesheet(aside);

            aside.addClass(CLASS.SHOW);
            lng.Element.Cache.section.addClass(aside_stylesheet).addClass(CLASS.ASIDE);
        }

        aside = null;
    };

    /**
     * Hide an aside element with a particular section
     *
     * @method hide
     */
    var hide = function() {
        var aside = lng.Element.Cache.aside;
        if (aside) {
            lng.Element.Cache.section.removeClass(CLASS.ASIDE).removeClass(CLASS.RIGHT).removeClass(CLASS.SMALL);

            var aside_stylesheet = _asideStylesheet(aside);
            if (aside_stylesheet) {
                lng.Element.Cache.section.removeClass(aside_stylesheet);
            }

            setTimeout(function() {
                aside.removeClass(CLASS.SHOW);
                lng.Element.Cache.aside = null;
            }, 250);
        }
    };

    var _findAside = function(aside_id) {
        var aside = null;
        var asides_length = lng.Element.Cache.asides.length;

        if (asides_length == 1) {
            var current_id = '#' + lng.Element.Cache.asides[0].id ;
            if (current_id == aside_id) {
                aside = lng.dom(lng.Element.Cache.asides[0]);
            }
        }
        else if (asides_length > 1) {
            aside = lng.Element.Cache.asides.siblings(ELEMENT.ASIDE + aside_id);
        }

        return aside;
    };

    var _asideStylesheet = function(aside) {
        var aside_stylesheet = aside.attr(ATTRIBUTE.CLASS);
        var classes = '';

        //@todo: Refactor
        if (aside_stylesheet) {
            classes += (aside_stylesheet.indexOf(CLASS.RIGHT) > -1) ? CLASS.RIGHT + ' ': '';
            classes += (aside_stylesheet.indexOf(CLASS.SMALL) > -1) ? CLASS.SMALL + ' ': '';
        }

        return classes;
    };

    return {
        toggle: toggle,
        show: show,
        hide: hide
    };

})(Lungo);
