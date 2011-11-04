/** 
 * Handles the <sections> and <articles> to show
 * 
 * @namespace LUNGO
 * @class Router
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Router = (function(lng, undefined) {

    var CSS_CLASSES = {
        SHOW: 'show',
        HIDE: 'hide'
    };

    /**
     * Navigate to a <section>.
     *
     * @method section
     *
     * @param {string} Id of the <section>
     */
    var section = function(section_id) {
        section_id = (section_id.indexOf('#')) ? '#' + section_id : section_id;

        lng.Dom.query(_getHistoryCurrent()).removeClass(CSS_CLASSES.SHOW).addClass(CSS_CLASSES.HIDE);
        lng.Dom.query(section_id).addClass(CSS_CLASSES.SHOW);

        lng.Router.History.add(section_id);
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
        lng.View.Article.show(section_id, article_id);
    };

    /**
     * Return to previous section.
     *
     * @method back
     */
    var back = function() {
        lng.Dom.query(_getHistoryCurrent()).removeClass(CSS_CLASSES.SHOW);
        lng.Router.History.removeLast();

        lng.Dom.query(_getHistoryCurrent()).removeClass(CSS_CLASSES.HIDE).addClass(CSS_CLASSES.SHOW);
    };

    var _getHistoryCurrent = function() {
        return lng.Router.History.current();
    };

    return {
        section: section,
        article: article,
        back: back
    };

})(LUNGO);