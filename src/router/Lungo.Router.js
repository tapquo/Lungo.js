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

    var CSS_CLASSES = {
        SHOW: 'show',
        HIDE: 'hide',
        ACTIVE: 'current'
    };

    var ELEMENT = {
        SECTION: 'section',
        ARTICLE: 'article',
        ASIDE: 'aside'
    }

    var HASHTAG_CHARACTER = '#';

    /**
     * Navigate to a <section>.
     *
     * @method section
     *
     * @param {string} Id of the <section>
     */
    var section = function(section_id) {
        var section_id = _parseUrl(section_id);
        var target = ELEMENT.SECTION + section_id;

        if (_existsTarget(target)) {
            lng.dom(_getHistoryCurrent()).removeClass(CSS_CLASSES.SHOW).addClass(CSS_CLASSES.HIDE);
            lng.dom(target).addClass(CSS_CLASSES.SHOW).trigger('load');

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
        var section_id = _parseUrl(section_id);
        var article_id = _parseUrl(article_id);
        var target = ELEMENT.SECTION + section_id + ' ' + ELEMENT.ARTICLE + _parseUrl(article_id);

        if (_existsTarget(target)) {
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
        var section_id = _parseUrl(section_id);
        var aside_id = _parseUrl(aside_id);
        var target = ELEMENT.ASIDE + _parseUrl(aside_id);

        if (_existsTarget(target)) {
            var is_visible = lng.dom(target).hasClass(CSS_CLASSES.ACTIVE);
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
        lng.dom(_getHistoryCurrent()).removeClass(CSS_CLASSES.SHOW).trigger('unload');
        lng.Router.History.removeLast();

        lng.dom(_getHistoryCurrent()).removeClass(CSS_CLASSES.HIDE).addClass(CSS_CLASSES.SHOW);
    };

    var _parseUrl = function(href) {
        var href_hashtag = href.lastIndexOf(HASHTAG_CHARACTER);
        if (href_hashtag > 0) {
            href = href.substring(href_hashtag);
        } else if (href_hashtag === -1) {
            href = HASHTAG_CHARACTER + href ;
        }
        return href;
    };

    var _existsTarget = function(target) {
        var exists = false;

        if (lng.dom(target).length > 0) {
            exists = true;
        } else {
            lng.Core.log(3, 'Lungo.Router ERROR: The target ' + target + ' does not exists.');
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