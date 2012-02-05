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

     var SELECTORS = {
        SECTION: 'section',
        ASIDE: 'aside'
    };

    var CSS_CLASSES = {
        ASIDE: 'aside',
        ACTIVE: 'current',
        ONRIGHT: 'onright'
    };

    /**
     * ?
     *
     * @method show
     *
     * @param  {string} Element query selector
     * @param  {string} Value for counter
     */
    var show = function(section_id, aside_id) {
        var aside = lng.dom(SELECTORS.ASIDE + aside_id);
        var aside_class = _classFromAside(aside);
        var section = lng.dom(SELECTORS.SECTION + section_id);

        section.addClass(aside_class).addClass(CSS_CLASSES.ASIDE);
        aside.addClass(CSS_CLASSES.ACTIVE);
    };

    /**
     * ?
     *
     * @method hide
     *
     * @param  {string} Element query selector
     * @param  {string} Value for counter
     */
    var hide = function(section_id, aside_id) {
        var aside = lng.dom(SELECTORS.ASIDE + aside_id);
        var section = lng.dom(SELECTORS.SECTION + section_id);

        section.removeClass(CSS_CLASSES.ASIDE).removeClass(CSS_CLASSES.ONRIGHT);

        setTimeout(function() {
            var current_aside = SELECTORS.ASIDE + aside_id + '.' + CSS_CLASSES.ACTIVE;
            lng.dom(current_aside).removeClass(CSS_CLASSES.ACTIVE);
        }, 300);
    };

    var _classFromAside = function(aside) {
        var aside_class = aside.attr('class');
        return aside_class || '';
    };

    return {
        show: show,
        hide: hide
    };

})(LUNGO);