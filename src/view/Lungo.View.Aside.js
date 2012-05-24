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
     * Display an aside element for a particular <section>
     *
     * @method show
     *
     * @param  {string} Section id
     * @param  {string} Aside id
     */
    var show = function(section_id, aside_id) {
        var aside = lng.dom(ELEMENT.ASIDE + aside_id);
        var aside_class = _asideClass(aside);
        var section = lng.dom(ELEMENT.SECTION + section_id);

        aside.addClass(CLASS.CURRENT);
        section.addClass(aside_class).addClass(CLASS.ASIDE);
    };

    /**
     * Hide an aside element for a particular section
     *
     * @method hide
     *
     * @param  {string} Element query selector
     * @param  {string} Value for counter
     */
    var hide = function(section_id, aside_id) {
        var aside = lng.dom(ELEMENT.ASIDE + aside_id);
        var aside_class = _asideClass(aside);
        var section = lng.dom(ELEMENT.SECTION + section_id);

        section.removeClass(CLASS.ASIDE).removeClass(aside_class);

        setTimeout(function() {
            aside.removeClass(CLASS.CURRENT);
        }, 300);
    };

    var _asideClass = function(aside) {
        var aside_class = aside.attr(ATTRIBUTE.CLASS);
        var classes = ''

        //@todo: Refactor
        if (aside_class) {
            classes += (aside_class.indexOf(CLASS.RIGHT) > -1) ? CLASS.RIGHT : '';
            classes += (aside_class.indexOf(CLASS.SMALL) > -1) ? CLASS.SMALL : '';
        }

        return classes;
    };

    return {
        show: show,
        hide: hide
    };

})(LUNGO);