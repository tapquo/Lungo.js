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

    var ELEMENT = lng.Constants.ELEMENT;
    var CLASS = lng.Constants.CLASS;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var TRIGGER = lng.Constants.TRIGGER;

    var SELECTORS = {
        NAVIGATION_ITEM: 'a[href][data-target="article"]',
        REFERENCE_LINK: ' a[href][data-article]'
    };

    /**
     * ?
     *
     * @method show
     */
    var show = function(section_id, article_id, element) {
        if (element) {
            _setTitle(section_id, element);
        }
        _toggleNavItems(section_id, article_id);
        _showReferenceLinks(section_id, article_id.replace('#', ''));

        //@todo: Fallback android Inputs
        //lng.Fallback.androidInputs(current_active_article_id, false);
        //lng.Fallback.androidInputs(article_id, true);
    };

    var _showReferenceLinks = function(section_id, article_id) {
        var links = lng.dom(ELEMENT.SECTION + section_id + SELECTORS.REFERENCE_LINK);

        for (var i = 0, len = links.length; i < len; i++) {
            var link = lng.dom(links[i]);
            if (link.data(ATTRIBUTE.ARTICLE) === article_id) {
                link.show();
            } else {
                link.hide();
            }
        }
    };

    var _toggleNavItems = function(section_id, article_id) {
        var links = lng.dom(ELEMENT.SECTION + section_id + ' ' + SELECTORS.NAVIGATION_ITEM);
        links.removeClass(CLASS.CURRENT);

        active_items = ELEMENT.SECTION + section_id + ' a[href="' + article_id + '"][data-target="article"]';
        links = lng.dom(active_items);
        links.addClass(CLASS.CURRENT);
    };

    var _setTitle = function(id, item) {
        var title = item.data(ATTRIBUTE.TITLE);

        if (title) {
            var section_title = id + ' header .title, ' + id + ' footer .title';
            lng.dom(section_title).text(title);
        }
    };

    return {
        show: show
    };

})(LUNGO);
