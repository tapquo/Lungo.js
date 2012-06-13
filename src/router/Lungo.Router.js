/**
 * Handles the <sections> and <articles> to show
 *
 * @namespace LUNGO
 * @class Router
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Router = (function(lng, undefined) {

    var CLASS = lng.Constants.CLASS;
    var ELEMENT = lng.Constants.ELEMENT;
    var ERROR = lng.Constants.ERROR;
    var TRIGGER = lng.Constants.TRIGGER;
    var HASHTAG_CHARACTER = '#';

    var _sections = [];

    var init = function() {
        if(!_sections) {
            _sections = lng.dom(ELEMENT.SECTION);
        }
    };

    /**
     * Navigate to a <section>.
     *
     * @method section
     *
     * @param {string} Id of the <section>
     */
    var section = function(section_id) {
        section_id = lng.Core.parseUrl(section_id);
        var current =  lng.Element.Current.section;

        if (_notCurrentTarget(section_id, current)) {
            var target = lng.dom(ELEMENT.SECTION + section_id);
            if (target) {
                current.removeClass(CLASS.SHOW).addClass(CLASS.HIDE).trigger(TRIGGER.UNLOAD);
                target.addClass(CLASS.SHOW).trigger(TRIGGER.LOAD);
                lng.Element.Current.section = target;
                lng.Router.History.add(section_id);
            }
        }
    };

    /**
     * Displays the <article> in a particular <section>.
     *
     * @method article
     *
     * @param {string} <section> Id
     * @param {string} <article> Id
     */
    var article = function(section_id, article_id, element) {
        section_id = lng.Core.parseUrl(section_id);
        article_id = lng.Core.parseUrl(article_id);
        var current =  lng.Element.Current.article;

        if (_notCurrentTarget(article_id, current)) {
            var target = lng.dom(ELEMENT.SECTION + section_id + ' ' + ELEMENT.ARTICLE + article_id);
            if (target) {
                current.removeClass(CLASS.CURRENT).trigger(TRIGGER.UNLOAD);
                target.addClass(CLASS.CURRENT).trigger(TRIGGER.LOAD);
                lng.Element.Current.article = target;

                lng.View.Article.show(section_id, article_id, element);
            }
        }
    };

    /**
     * Displays the <aside> in a particular <section>.
     *
     * @method aside
     *
     * @param {string} <section> Id
     * @param {string} <aside> Id
     */
    var aside = function(section_id, aside_id) {
        section_id = lng.Core.parseUrl(section_id);
        aside_id = lng.Core.parseUrl(aside_id);
        var target = ELEMENT.ASIDE + aside_id;

        if (_exists(target)) {
            var is_visible = lng.dom(target).hasClass(CLASS.CURRENT);
            if (is_visible) {
                lng.View.Aside.hide(section_id, aside_id);
            } else {
                lng.View.Aside.show(section_id, aside_id);
            }
        }
    };

    /**
     * Return to previous section.
     *
     * @method back
     */
    var back = function() {
        var current = lng.Element.Current.section;
        current.removeClass(CLASS.SHOW).trigger(TRIGGER.UNLOAD);

        lng.Router.History.removeLast();

        target = lng.dom(_getHistoryCurrent());
        target.removeClass(CLASS.HIDE).addClass(CLASS.SHOW);
        lng.Element.Current.section = target;
    };

    var _notCurrentTarget = function(target, element) {
        return (target !== HASHTAG_CHARACTER + element.attr('id')) ? true : false;
    };

    var _exists = function(target) {
        var exists = false;

        if (lng.dom(target).length > 0) {
            exists = true;
        } else {
            lng.Core.log(3, ERROR.ROUTER + target);
        }

        return exists;
    };

    var _getHistoryCurrent = function() {
        return lng.Router.History.current();
    };

    return {
        section: section,
        article: article,
        aside: aside,
        back: back
    };

})(LUNGO);