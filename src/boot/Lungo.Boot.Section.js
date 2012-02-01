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

    var SELECTORS = {
        ARTICLE: 'article',
        SECTION: 'section'
    };

    var ACTIVE_CLASS = 'current';

    /**
     * Initializes all <section>s of the project
     *
     * @method init
     */
    var start = function() {
        var sections = lng.dom(SELECTORS.SECTION);

        _initFirstSection(sections);
        _initAllSections(sections);
        _initAllAsides();

        lng.View.Resize.toolbars();
    };

    var _initFirstSection = function(sections) {
        var first_section = sections.first();
        var first_section_id = '#' + first_section.attr('id');

        first_section.addClass(ACTIVE_CLASS);
        lng.Router.History.add(first_section_id);
    };

    var _initAllSections = function(sections) {
        if (lng.Core.isMobile()) {
            _setPositionFixedInIOS(sections);
        }

        for (var i = 0, len = sections.length; i < len; i++) {
            var section = lng.dom(sections[i]);
            _initArticles(section);
        }
    };

    var _initArticles = function(section) {
        var articles = section.children(SELECTORS.ARTICLE);

        _calculateArticleHeight(section, articles);

        var first_article = articles.first();
        first_article.addClass(ACTIVE_CLASS);

        var first_article_id = first_article.attr('id');
        var section_id = '#' + section.attr('id');
        lng.View.Article.showReferenceLinks(section_id, first_article_id);
    };

    var _calculateArticleHeight = function(section, articles) {
        var footer =  section.children('footer');
        var header = section.children('header');

        var articles_height = window.innerHeight;
        if (footer.length > 0) {
            articles_height -= footer.height();
        }
        if (header.length > 0) {
            articles_height -= header.height();
        }

        articles.style('height', articles_height + 'px');
    }

    var _initAllAsides = function() {
        lng.dom('aside').addClass('show');
    };

    var _setPositionFixedInIOS = function(sections) {
        var environment = lng.Core.environment();

        if (environment.os.name === 'ios' && environment.os.version >= '4.') {
            sections.style('position', 'fixed');
        }
    }

    return {
        start: start
    };

})(LUNGO);