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
        lng.Element.sections = lng.dom(ELEMENT.SECTION);
        _initFirstSection();
        _initAllSections();

        lng.View.Resize.toolbars();
    };

    var _initFirstSection = function() {
        var first_section = lng.Element.sections.first();
        lng.Element.Current.section = first_section;

        var first_section_id = '#' + first_section.attr(ATTRIBUTE.ID);
        first_section.addClass(CLASS.CURRENT);
        lng.Router.History.add(first_section_id);
    };

    var _initAllSections = function() {
        lng.Fallback.positionFixed(lng.Element.sections);

        for (var i = 0, len = lng.Element.sections.length; i < len; i++) {
            _initArticles(i);
        }
    };

    var _initArticles = function(section_index) {
        var section = lng.dom(lng.Element.sections[section_index]);

        var first_article = section.children(ELEMENT.ARTICLE).first();
        if (!lng.Element.Current.article) {
            lng.Element.Current.article = first_article;
        }
        first_article.addClass(CLASS.CURRENT);

        var first_article_id = first_article.attr(ATTRIBUTE.ID);
        var section_id = '#' + section.attr(ATTRIBUTE.ID);
        //@todo: tenemos que inicializar la seccion actual
        //lng.View.Article.showReferenceLinks(section_id, first_article_id);
    };

    return {
        start: start
    };

})(LUNGO);