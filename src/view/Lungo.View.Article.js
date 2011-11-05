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
        NAVIGATION_ITEM: 'nav a',
        HEADER_ITEM: 'header a'
    };

    var CSS_CLASSES = {
        ACTIVE: 'current'
    };

    var show = function(section_id, article_id) {
        var nav_items = section_id + ' ' + SELECTORS.NAVIGATION_ITEM;
        var header_items = section_id + ' ' + SELECTORS.HEADER_ITEM;    
        _disableItems(nav_items);
        _disableItems(header_items_items);

        var current_nav_item = lng.Dom.query(nav_items + '[href="' + article_id + '"]');
        var current_header_item = lng.Dom.query(header_items + '[data-article="' + article_id + '"]');
        var current_header_common_item = lng.Dom.query(header_items + ':not([data-article])');

        current_nav_item.addClass(CSS_CLASSES.ACTIVE);
		current_header_item.addClass(CSS_CLASSES.ACTIVE);
		current_header_common_item.addClass(CSS_CLASSES.ACTIVE);
        
        _setTitle(section_id, current_nav_item);

        _showContainer(section_id, article_id);
    };

    var _disableItems = function(items) {
        lng.Dom.query(items).removeClass(CSS_CLASSES.ACTIVE);
    };

    var _showContainer = function(section_id, article_id) {
        var section_articles = section_id + ' ' + SELECTORS.ARTICLE;
        lng.Dom.query(section_articles).removeClass(CSS_CLASSES.ACTIVE);
        lng.Dom.query(article_id).addClass(CSS_CLASSES.ACTIVE);
    };

    var _setTitle = function(id, item) {
        var title = item.data('title');

        if (title) {
            var section_title = id + ' header .title, ' + id + ' footer .title';
            lng.Dom.query(section_title).text(title);
        }
    };

    return {
        show: show
    };

})(LUNGO);