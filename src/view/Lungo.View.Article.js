/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace Lungo.View
 * @class Article
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

Lungo.View.Article = (function(lng, undefined) {

    var ELEMENT = lng.Constants.ELEMENT;
    var CLASS = lng.Constants.CLASS;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;

    var SELECTORS = {
        NAVIGATION_ITEM: 'a[href][data-router="article"]',
        REFERENCE_LINK: ' a[href][data-article]',
        TITLE_OF_ARTICLE: 'header .title, footer .title',
        ASIDE_REFERENCE_LIST: 'li a.active, li.active'
    };

    /**
     * ?
     *
     * @method show
     */
    var title = function(value) {
        if (value) {
            lng.Element.Cache.section.find(SELECTORS.TITLE_OF_ARTICLE).text(value);
        }
    };

    var switchNavItems = function(article_id) {
        lng.Element.Cache.section.find(SELECTORS.NAVIGATION_ITEM).removeClass(CLASS.ACTIVE);

        var active_nav_items = 'a[href="' + article_id + '"][data-router="article"]';
        lng.Element.Cache.section.find(active_nav_items).addClass(CLASS.ACTIVE);

        if (lng.Element.Cache.aside) {
            aside = lng.Element.Cache.aside;

            aside.find(SELECTORS.ASIDE_REFERENCE_LIST).removeClass(CLASS.ACTIVE);
            aside.find(active_nav_items).addClass(CLASS.ACTIVE).parent().addClass(CLASS.ACTIVE);
        }
    };

    var switchReferenceItems = function(article_id, section) {
        var reference = "[data-article=" + article_id.replace('#', '') + "]";
        section.find(SELECTORS.REFERENCE_LINK).hide().siblings(reference).show();
    };

    return {
        title: title,
        switchReferenceItems: switchReferenceItems,
        switchNavItems: switchNavItems
    };

})(Lungo);
