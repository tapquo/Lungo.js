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
        NAVIGATION_ITEM: 'a[href][data-target="article"]',
        REFERENCE_LINK: ' a[href][data-article]',
        TITLE_OF_ARTICLE: 'header .title, footer .title',
        ASIDE_REFERENCE_LIST: 'li a.current, li.current'
    };

    /**
     * ?
     *
     * @method show
     */
    var title = function(value) {
        if (value) {
            lng.Element.Current.section.find(SELECTORS.TITLE_OF_ARTICLE).text(value);
        }
        //@todo: Fallback android Inputs
        //lng.Fallback.androidInputs(current_active_article_id, false);
        //lng.Fallback.androidInputs(article_id, true);
    };

    var switchNavItems = function(article_id) {
        lng.Element.Current.section.find(SELECTORS.NAVIGATION_ITEM).removeClass(CLASS.CURRENT);

        var active_nav_items = 'a[href="' + article_id + '"][data-target="article"]';
        lng.Element.Current.section.find(active_nav_items).addClass(CLASS.CURRENT);

        if (lng.Element.Current.aside) {
            aside = lng.Element.Current.aside;

            aside.find(SELECTORS.ASIDE_REFERENCE_LIST).removeClass(CLASS.CURRENT);
            aside.find(active_nav_items).addClass(CLASS.CURRENT).parent().addClass(CLASS.CURRENT);
        }
    };

    var switchReferenceItems = function(article_id, section) {
        article_id = article_id.replace('#', '');

        var links = section.find(SELECTORS.REFERENCE_LINK);

        for (var i = 0, len = links.length; i < len; i++) {
            var link = lng.dom(links[i]);
            if (link.data(ATTRIBUTE.ARTICLE) === article_id) {
                link.show();
            } else {
                link.hide();
            }
        }
    };

    return {
        title: title,
        switchReferenceItems: switchReferenceItems,
        switchNavItems: switchNavItems
    };

})(Lungo);
