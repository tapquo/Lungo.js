/**
 * Initialize the <article> element
 *
 * @namespace LUNGO.Boot
 * @class Article
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Article = (function(lng, undefined) {

    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var ELEMENT = lng.Constants.ELEMENT;
    var SELECTORS = {
        LIST_IN_ARTICLE: 'article.list, aside.list',
        SCROLL_IN_ARTICLE: '.scrollable',
        CHECKBOX_IN_ARTICLE: '.checkbox, .radio'
    };

    /**
     * Initializes the markup elements of an article
     *
     * @method init
     */
    var start = function() {
        _initElement(SELECTORS.LIST_IN_ARTICLE, _createListElement);
        _initElement(SELECTORS.SCROLL_IN_ARTICLE, _createScrollElement);
        _initElement(SELECTORS.CHECKBOX_IN_ARTICLE, _createCheckboxElement);
    };

    var _initElement = function(selector, callback) {
        var found_elements = lng.dom(selector);

        for (var i = 0, len = found_elements.length; i < len; i++) {
            var element = lng.dom(found_elements[i]);
            lng.Core.execute(callback, element);
        }
    };

    var _createListElement = function(article) {
        if (article.children().length === 0) {
            var article_id = article.attr(ATTRIBUTE.ID);
            article.append(ELEMENT.LIST);
        }
    };

    var _createScrollElement = function(scroll) {
        var scroll_id = scroll.attr(ATTRIBUTE.ID);
        lng.View.Scroll.init(scroll_id);
    };

    var _createCheckboxElement = function(checkbox) {
        checkbox.append(ELEMENT.SPAN);
    };

    return {
        start: start
    };

})(LUNGO);