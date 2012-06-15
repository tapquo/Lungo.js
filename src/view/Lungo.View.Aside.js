/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace LUNGO.View
 * @class Aside
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Aside = (function(lng, undefined) {

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
        var aside = lng.Element.asides.siblings(ELEMENT.ASIDE + aside_id);
        if (aside.length > 0) {
            var is_visible = aside.hasClass(CLASS.CURRENT);
            if (is_visible) {
                lng.View.Aside.hide();
            } else {
                lng.View.Aside.show(aside_id);
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
    var show = function(aside_id) {
        var aside = lng.Element.asides.siblings(ELEMENT.ASIDE + aside_id);
        if (aside.length > 0) {
            lng.Element.Current.aside = aside;
            var aside_stylesheet = _asideStylesheet(aside);

            aside.addClass(CLASS.CURRENT);
            lng.Element.Current.section.addClass(aside_stylesheet).addClass(CLASS.ASIDE);
        }

        aside = null;
    };

    /**
     * Hide an aside element with a particular section
     *
     * @method hide
     */
    var hide = function() {
        var aside = lng.Element.Current.aside;
        if (aside) {
            var aside_stylesheet = _asideStylesheet(aside);
            lng.Element.Current.section.removeClass(CLASS.ASIDE).removeClass(aside_stylesheet);

            setTimeout(function() {
                aside.removeClass(CLASS.CURRENT);
                lng.Element.Current.aside = null;
            }, 300);
        }
    };

    var _asideStylesheet = function(aside) {
        var aside_stylesheet = aside.attr(ATTRIBUTE.CLASS);
        var classes = '';

        //@todo: Refactor
        if (aside_stylesheet) {
            classes += (aside_stylesheet.indexOf(CLASS.RIGHT) > -1) ? CLASS.RIGHT : '';
            classes += (aside_stylesheet.indexOf(CLASS.SMALL) > -1) ? CLASS.SMALL : '';
        }

        return classes;
    };

    return {
        toggle: toggle,
        show: show,
        hide: hide
    };

})(LUNGO);