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
        _initFirstSection();
        _initAllSections();
        _initAllAsides();

        lng.View.Resize.toolbars();
    };

    var _initFirstSection = function() {
        var first_section = lng.Element.sections.first();
        lng.Element.Current.section = first_section;
        lng.Element.Current.article = first_section.children(ELEMENT.ARTICLE).first();

        var first_section_id = '#' + first_section.attr(ATTRIBUTE.ID);
        first_section.addClass(CLASS.CURRENT);
        lng.Router.History.add(first_section_id);
    };

    var _initAllSections = function() {
        //@todo: position fixed
        //lng.Fallback.positionFixed(lng.Element.sections);

        for (var i = 0, len = lng.Element.sections.length; i < len; i++) {
            _initArticles(i);
        }
    };

    var _initAllAsides = function() {
        var aside = null;
        for (var i = 0, len = lng.Element.asides.length; i < len; i++) {
            aside = lng.dom(lng.Element.asides[i]);
            aside.children(ELEMENT.ARTICLE).addClass(CLASS.CURRENT);
        }
    };

    var _initArticles = function(section_index) {
        var section = lng.dom(lng.Element.sections[section_index]);

        var first_article = section.children(ELEMENT.ARTICLE).first();
        first_article.addClass(CLASS.CURRENT);

        var first_article_id = first_article.attr(ATTRIBUTE.ID);
        if (first_article_id) lng.View.Article.switchReferenceItems(first_article_id, section);
    };

    var _cacheDOMElements = function() {
        lng.Element.sections = lng.dom(ELEMENT.SECTION);
        lng.Element.asides = lng.dom(ELEMENT.ASIDE);
        // @todo: WTF?
        // lng.Element.toolbars = lng.dom(ELEMENT.ASIDE);
    };

    return {
        init: init
    };

})(Lungo);
