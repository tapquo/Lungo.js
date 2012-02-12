/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace LUNGO.View
 * @class Article
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Article = (function(lng, undefined) {

    var SELECTORS = {
        ARTICLE: 'article',
        SECTION: 'section',
        NAVIGATION_ITEM: 'a[href][data-target="article"]',
        REFERENCE_LINK: ' a[href][data-article]'
    };

    var CSS_CLASSES = {
        ACTIVE: 'current'
    };

    /**
     * ?
     *
     * @method show
     */
    var show = function(section_id, article_id) {
        _toggleNavItems(section_id, article_id);
        showReferenceLinks(section_id, article_id.replace('#', ''));
        _showContainer(section_id, article_id);
    };

    /**
     * ?
     *
     * @method showReferenceLinks
     */
    var showReferenceLinks = function(section_id, article_id) {
        var links = lng.dom(SELECTORS.SECTION + section_id + SELECTORS.REFERENCE_LINK);

        for (var i = 0, len = links.length; i < len; i++) {
            var link = lng.dom(links[i]);
            (link.data('article') === article_id) ? link.show() : link.hide();
        }
    };

    var _toggleNavItems = function(section_id, article_id) {
        var nav_items = lng.dom(section_id + ' ' + SELECTORS.NAVIGATION_ITEM);
        nav_items.removeClass(CSS_CLASSES.ACTIVE);

        for (var i = 0, len = nav_items.length; i < len; i++) {
            var nav_item = lng.dom(nav_items[i]);
            var nav_item_parsed_url = lng.Core.parseUrl(nav_item.attr('href'));

            if (nav_item_parsed_url === article_id) {
                nav_item.addClass(CSS_CLASSES.ACTIVE);
                _setTitle(section_id, nav_item);
            }
        }
    };

    var _showContainer = function(section_id, article_id) {
        var section_articles = section_id + ' ' + SELECTORS.ARTICLE + '.' + CSS_CLASSES.ACTIVE;
        var current_active_article_id = '#' + lng.dom(section_articles).attr('id');

        lng.dom(section_articles).removeClass(CSS_CLASSES.ACTIVE);
        lng.Fallback.androidInputs(current_active_article_id, false);

        lng.dom(article_id).addClass(CSS_CLASSES.ACTIVE);
        lng.Fallback.androidInputs(article_id, true);
    };

    var _setTitle = function(id, item) {
        var title = item.data('title');

        if (title) {
            var section_title = id + ' header .title, ' + id + ' footer .title';
            lng.dom(section_title).text(title);
        }
    };

    return {
        show: show,
        showReferenceLinks: showReferenceLinks
    };

})(LUNGO);