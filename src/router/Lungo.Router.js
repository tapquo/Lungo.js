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
        var section_id = _normalized_section_id(section_id);
        var target = 'section' + section_id;

        if (_existsTarget(target)) {
            lng.dom(_getHistoryCurrent()).removeClass(CSS_CLASSES.SHOW).addClass(CSS_CLASSES.HIDE);
            lng.dom(section_id).addClass(CSS_CLASSES.SHOW);

            lng.Router.History.add(section_id);
        }
    };
    
    var rewind = function(section_id) {
      var section_id = _normalized_section_id(section_id);
      var target = 'section' + section_id;
      if (_existsTarget(target)) {
        while(_getHistoryCurrent() != section_id) {
          back();
        }
      }
    }

    var _normalized_section_id = function(section_id) {
      return (section_id.indexOf('#')) ? '#' + section_id : section_id;
    }

    /**
     * Displays the <article> in a particular <section>.
     *
     * @method article
     *
     * @param {string} <section> Id
     * @param {string} <article> Id
     */
    var article = function(section_id, article_id) {
        var target = section_id + ' article' + article_id;

        if (_existsTarget(target)) {
            lng.View.Article.show(section_id, article_id);
        }
    };

    /**
     * Return to previous section.
     *
     * @method back
     */
    var back = function() {
        lng.dom(_getHistoryCurrent()).removeClass(CSS_CLASSES.SHOW);
        lng.Router.History.removeLast();

        lng.dom(_getHistoryCurrent()).removeClass(CSS_CLASSES.HIDE).addClass(CSS_CLASSES.SHOW);
    };

    var _existsTarget = function(target) {
        var exists = false;

        if (lng.dom(target).length > 0) {
            exists = true;
        } else {
            lng.Core.log(3, 'Lungo.Router ERROR: The target ' + target + ' does not exists.');
        }
        return exists;
    }

    var _getHistoryCurrent = function() {
        return lng.Router.History.current();
    };

    return {
        section: section,
        article: article,
        back: back,
        rewind: rewind
    };

})(LUNGO);
