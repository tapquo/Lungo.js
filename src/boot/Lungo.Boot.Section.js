/**
 * Initialize the <section> element
 *
 * @namespace LUNGO.Boot
 * @class Section
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Section = (function(lng, undefined) {

    var ELEMENT = lng.Constants.ELEMENT;
    var CLASS = lng.Constants.CLASS;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;

    /**
     * Initializes all <section>s of the project
     *
     * @method init
     */
    var start = function() {
        var sections = lng.dom(ELEMENT.SECTION);
        _initFirstSection(sections);
        _initAllSections(sections);

        lng.View.Resize.toolbars();
    };

    var _initFirstSection = function(sections) {
        var first_section = sections.first();
        var first_section_id = '#' + first_section.attr(ATTRIBUTE.ID);

        first_section.addClass(CLASS.CURRENT);
        lng.Router.History.add(first_section_id);
    };

    var _initAllSections = function(sections) {
        lng.Fallback.positionFixed(sections);

        for (var i = 0, len = sections.length; i < len; i++) {
            var section = lng.dom(sections[i]);
            _initArticles(section);
        }
    };

    var _initArticles = function(section) {
        var first_article = section.children(ELEMENT.ARTICLE).first();
        first_article.addClass(CLASS.CURRENT);

        var first_article_id = first_article.attr(ATTRIBUTE.ID);
        var section_id = '#' + section.attr(ATTRIBUTE.ID);
        lng.View.Article.showReferenceLinks(section_id, first_article_id);
    };

    return {
        start: start
    };

})(LUNGO);