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

    /**
     * Navigate to a <section>.
     *
     * @method section
     *
     * @param {string} Id of the <section>
     */
    var section = function(section_id) {
        var section_id = lng.Core.parseUrl(section_id);
        var current = _getHistoryCurrent();
        var target = ELEMENT.SECTION + section_id;

        if (_existsTarget(target)) {
            lng.dom(current).removeClass(CLASS.HIDE_REVOKE).removeClass(CLASS.SHOW).addClass(CLASS.HIDE);
            lng.dom(target).removeClass(CLASS.SHOW_REVOKE).addClass(CLASS.SHOW).trigger(TRIGGER.LOAD);

            lng.Router.History.add(section_id);
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
    var article = function(section_id, article_id) {
        var section_id = lng.Core.parseUrl(section_id);
        var article_id = lng.Core.parseUrl(article_id);
        var target = ELEMENT.SECTION + section_id + ' ' + ELEMENT.ARTICLE + article_id;

        if (_existsTarget(target)) {
            lng.dom(target).trigger(TRIGGER.LOAD);
            lng.View.Article.show(section_id, article_id);
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
        var section_id = lng.Core.parseUrl(section_id);
        var aside_id = lng.Core.parseUrl(aside_id);
        var target = ELEMENT.ASIDE + aside_id;

        if (_existsTarget(target)) {
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
        var current_section = ELEMENT.SECTION + _getHistoryCurrent();

        lng.dom(current_section).removeClass(CLASS.SHOW).addClass(CLASS.SHOW_REVOKE).trigger(TRIGGER.UNLOAD);
        lng.Router.History.removeLast();
        lng.dom(_getHistoryCurrent()).removeClass(CLASS.HIDE).addClass(CLASS.HIDE_REVOKE).addClass(CLASS.SHOW);
    };

    var _existsTarget = function(target) {
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