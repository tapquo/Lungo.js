/**
 * Initialize the <article> element
 *
 * @namespace LUNGO.Boot
 * @class Article
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Article = (function(lng, undefined) {

    var SELECTORS = {
        LIST_IN_ARTICLE: 'article.list',
        SCROLL_IN_ARTICLE: 'scroll',
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
        var found_elements = lng.Dom.query(selector);

        for (var i = 0, len = found_elements.length; i < len; i++) {
            var element = lng.Dom.query(found_elements[i]);
            lng.Core.execute(callback, element);
        }
    };

    var _createListElement = function(article) {
        if (article.children().length === 0) {
            var article_id = article.attr('id');
            article.append('<ul id="' + article_id + '_list"></ul>');
        }
    };

    var _createScrollElement = function(scroll) {
        var scroll_id = scroll.attr('id');
        lng.View.Scroll.create(scroll_id);
    };

    var _createCheckboxElement = function(checkbox) {
        checkbox.append('<span>&nbsp;</span>');
    };

    return {
        start: start
    };

})(LUNGO);