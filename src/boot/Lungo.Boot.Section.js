/**
 * Initialize the <section> element
 *
 * @namespace Lungo.Boot
 * @class Section
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

Lungo.Boot.Section = (function(lng, undefined) {

    var ELEMENT = lng.Constants.ELEMENT;
    var CLASS = lng.Constants.CLASS;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;

    /**
     * Initializes all <section>s of the project
     *
     * @method init
     */
    var init = function() {
        _cacheDOMElements();
        lng.Fallback.fixPositionInAndroid();

        _initFirstSection();
    };

    var _initFirstSection = function() {
        var section = lng.dom(ELEMENT.SECTION).first().addClass(CLASS.SHOW);
        lng.Element.Cache.section = section;
        lng.Element.Cache.article = section.children(ELEMENT.ARTICLE + "." + CLASS.ACTIVE);

        var section_id = '#' + section.attr(ATTRIBUTE.ID);
        lng.Router.History.add(section_id);
    };

    var _cacheDOMElements = function() {
        lng.Element.Cache.asides = lng.dom(ELEMENT.ASIDE);
    };

    return {
        init: init
    };

})(Lungo);
