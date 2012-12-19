/**
 * Initialize the Layout of LungoJS (if it's a mobile environment)
 *
 * @namespace Lungo.Boot
 * @class Layout
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Boot.Layout = (function(lng, undefined) {

    var ELEMENT = lng.Constants.ELEMENT;
    var CLASS = lng.Constants.CLASS;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var QUERY = lng.Constants.QUERY;

    /**
     * Initializes all <section> & <article> of the project
     *
     * @method init
     *
     */
    var init = function() {
        lng.Element.Cache.asides = lng.dom(ELEMENT.ASIDE);
        lng.Fallback.fixPositionInAndroid();

        _initFirstSection();
        _initArticleElement(QUERY.LIST_IN_ARTICLE, _createListElement);
        _initArticleElement(QUERY.ARTICLE_SCROLLABLE, _scrollFix);
    };

    var _initFirstSection = function() {
        var section = lng.dom(ELEMENT.SECTION).first().addClass(CLASS.SHOW);
        lng.Element.Cache.section = section;
        lng.Element.Cache.article = section.children(ELEMENT.ARTICLE + "." + CLASS.ACTIVE);

        var section_id = '#' + section.attr(ATTRIBUTE.ID);
        lng.Router.History.add(section_id);
    };

    var _initArticleElement = function(selector, callback) {
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


    var _scrollFix = function(article) {
        article[0].addEventListener('touchstart', function(event) {
            scrollTop = this.scrollTop;
            if(scrollTop <= 1) {
                this.scrollTop = 1;
            }
            if(scrollTop + this.offsetHeight >= this.scrollHeight) {
                this.scrollTop = this.scrollHeight - this.offsetHeight - 1;
            }
        }, false);
    };

    return {
        init: init
    };

})(Lungo);
