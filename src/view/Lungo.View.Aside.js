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
        var aside_class = _classFromAside(aside);
        var section = lng.dom(ELEMENT.SECTION + section_id);

        section.addClass(aside_class).addClass(CLASS.ASIDE);
        aside.addClass(CLASS.CURRENT);
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
        var section = lng.dom(ELEMENT.SECTION + section_id);

        section.removeClass(CLASS.ASIDE).removeClass(CLASS.RIGHT);

        setTimeout(function() {
            var current_aside = ELEMENT.ASIDE + aside_id + '.' + CLASS.CURRENT;
            lng.dom(current_aside).removeClass(CLASS.CURRENT);
        }, 300);
    };

    var _classFromAside = function(aside) {
        var aside_class = aside.attr(ATTRIBUTE.CLASS);
        return aside_class || '';
    };

    return {
        show: show,
        hide: hide
    };

})(LUNGO);