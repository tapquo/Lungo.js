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
        NAVIGATION_ITEM: 'a'
    };

    var CSS_CLASSES = {
        ACTIVE: 'current'
    };

    var show = function(section_id, article_id) {
        var nav_items = section_id + ' ' + SELECTORS.NAVIGATION_ITEM;
        _disableNavItems(nav_items);

        var current_nav_item = lng.dom(nav_items + '[href="' + article_id + '"]');
        
        if(current_nav_item > 0) {
	        current_nav_item.addClass(CSS_CLASSES.ACTIVE);
	        _setTitle(section_id, current_nav_item);
        }
        
        _showContainer(section_id, article_id);
    };

    var _disableNavItems = function(items) {
        lng.dom(items).removeClass(CSS_CLASSES.ACTIVE);
    };

    var _showContainer = function(section_id, article_id) {
        var section_articles = section_id + ' ' + SELECTORS.ARTICLE;
        lng.dom(section_articles).removeClass(CSS_CLASSES.ACTIVE);
        lng.dom(article_id).addClass(CSS_CLASSES.ACTIVE);
    };

    var _setTitle = function(id, item) {
        var title = item.data('title');

        if (title) {
            var section_title = id + ' header .title, ' + id + ' footer .title';
            lng.dom(section_title).text(title);
        }
    };

    return {
        show: show
    };

})(LUNGO);