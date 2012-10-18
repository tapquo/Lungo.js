/**
 * Handles the <sections> and <articles> to show
 *
 * @namespace Lungo
 * @class Router
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

Lungo.Router = (function(lng, undefined) {

    var CLASS = lng.Constants.CLASS;
    var ELEMENT = lng.Constants.ELEMENT;
    var ERROR = lng.Constants.ERROR;
    var TRIGGER = lng.Constants.TRIGGER;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var HASHTAG_CHARACTER = '#';

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
            var target = lng.Element.sections.siblings(ELEMENT.SECTION + section_id);
            if (target.length > 0) {

                target_transition = target.data('transition');
                if (target_transition) {
                    _assignTransitionOrigin(current);
                    _assignTransition(current, target_transition);
                }

                current.removeClass(CLASS.SHOW).addClass(CLASS.HIDE);
                target.addClass(CLASS.SHOW);
                lng.Element.Current.section = target;
                lng.Element.Current.article = target.find(ELEMENT.ARTICLE + '.' + CLASS.CURRENT);

                lng.Router.History.add(section_id);
                _sectionTriggers(current, target);
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
        article_id = lng.Core.parseUrl(article_id);

        var current =  lng.Element.Current.article;

        if (_notCurrentTarget(article_id, current)) {
            section(section_id);
            var target = lng.Element.Current.section.find(ELEMENT.ARTICLE + article_id);

            if (target.length > 0) {
                if (_sectionId(current) === _sectionId(target)) {
                    current.removeClass(CLASS.CURRENT);
                } else {
                    lng.Element.Current.section.children(ELEMENT.ARTICLE).removeClass(CLASS.CURRENT);
                }
                target.addClass(CLASS.CURRENT);
                lng.Element.Current.article = target;

                lng.View.Article.switchNavItems(article_id);
                lng.View.Article.switchReferenceItems(article_id, lng.Element.Current.section);

                if (element) lng.View.Article.title(element.data(ATTRIBUTE.TITLE));
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
        aside_id = lng.Core.parseUrl(aside_id);
        lng.View.Aside.toggle(aside_id);
    };

    /**
     * Return to previous section.
     *
     * @method back
     */
    var back = function() {
        var current = lng.Element.Current.section;
        current.removeClass(CLASS.SHOW);

        lng.Router.History.removeLast();
        target = lng.Element.sections.siblings(ELEMENT.SECTION + lng.Router.History.current());

        _assignTransition(target, target.data('transition-origin'));
        target.removeClass(CLASS.HIDE).addClass(CLASS.SHOW);
        lng.Element.Current.section = target;

        _sectionTriggers(current, target);
    };

    var _notCurrentTarget = function(target, element) {
        return (target !== HASHTAG_CHARACTER + element.attr('id')) ? true : false;
    };

    var _sectionId = function(element) {
        return element.parent('section').attr('id');
    };

    var _sectionTriggers = function(current, target) {
        current.trigger(TRIGGER.UNLOAD);
        target.trigger(TRIGGER.LOAD);
    };

    var _assignTransition = function(section, transitionName) {
        section.data('transition', transitionName);
    };

    var _assignTransitionOrigin = function(section) {
        section.data('transition-origin', section.data('transition'));
    };

    return {
        section: section,
        article: article,
        aside: aside,
        back: back
    };

})(Lungo);
