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
    var DEVICE = lng.Constants.DEVICE;
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
        var current =  lng.Element.Cache.section;

        if (_notCurrentTarget(section_id, current)) {
            var query = ELEMENT.SECTION + section_id;
            var target = (current) ? current.siblings(query) : lng.dom(query);

            if (target.length > 0) {
                // @todo: Analize Router

                if (lng.DEVICE == DEVICE.PHONE) {
                    if (current) {
                        _defineTransition(target, current);
                        current.removeClass(CLASS.SHOW).addClass(CLASS.HIDE);
                    }
                    _showPhoneSection(target);

                } else {
                    if (current) {
                        current.addClass(CLASS.HIDE);

                        setTimeout(function() {
                            current.removeClass(CLASS.SHOW);
                        }, lng.Constants.TRANSITION.DURATION);
                    }

                    setTimeout(function() {
                        target.addClass(CLASS.SHOW);
                    }, lng.Constants.TRANSITION.DURATION);
                }

                _cacheView(current, target);

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
        article_id = lng.Core.parseUrl(article_id);

        var current =  lng.Element.Cache.article;
        if (_notCurrentTarget(article_id, current)) {
            section(section_id);
            var target = lng.Element.Cache.section.find(ELEMENT.ARTICLE + article_id);

            if (target.length > 0) {
                if (_sectionId(current) !== _sectionId(target)) {
                    current = lng.Element.Cache.section.children(ELEMENT.ARTICLE);
                }

                current.removeClass(CLASS.ACTIVE).trigger(TRIGGER.UNLOAD);
                target.addClass(CLASS.ACTIVE).trigger(TRIGGER.LOAD);

                lng.Element.Cache.article = target;

                lng.View.Article.switchNavItems(article_id);
                lng.View.Article.switchReferenceItems(article_id, lng.Element.Cache.section);

                if (element) lng.View.Article.title(element.data(ATTRIBUTE.TITLE));
            }
        }
    };

    /**
     * Return to previous section.
     *
     * @method back
     */
    var back = function() {
        var current = lng.Element.Cache.section;

        if (lng.DEVICE == DEVICE.PHONE && lng.Element.Cache.aside && lng.Element.Cache.aside.hasClass(CLASS.SHOW)) {
            lng.View.Aside.hide();
            setTimeout(function() {
                _back(current);
            }, lng.Constants.TRANSITION.DURATION);
        } else {
            _back(current);
        }
    };

    var _back = function(current) {
        current.removeClass(CLASS.SHOW).addClass(CLASS.HIDING);

        setTimeout(function() {
            current.removeClass(CLASS.HIDING);
        }, lng.Constants.TRANSITION.DURATION);

        lng.Router.History.removeLast();
        target = current.siblings(ELEMENT.SECTION + lng.Router.History.current());

        _assignTransition(target, target.data('transition-origin'));

        _showPhoneSection(target);
        _cacheView(current, target);
    };

    var _showPhoneSection = function(target) {
        target.removeClass(CLASS.HIDE).addClass(CLASS.SHOW);
    };

    var _showTabletSection = function(current, target) {
        if (current) {
            current.addClass(CLASS.HIDE);

            setTimeout(function() {
                current.removeClass(CLASS.SHOW);
            }, lng.Constants.TRANSITION.DURATION);
        }

        setTimeout(function() {
            target.addClass(CLASS.SHOW);
        }, lng.Constants.TRANSITION.DURATION + 50);
    };

    var _cacheView = function(current, target) {
        lng.Element.Cache.section = target;
        lng.Element.Cache.article = target.find(ELEMENT.ARTICLE + "." + CLASS.ACTIVE);
        lng.Element.Cache.aside = lng.View.Aside.active(target);
        _sectionTriggers(current, target);
    };

    var _notCurrentTarget = function(target, element) {
        return (!element || target !== HASHTAG_CHARACTER + element.attr('id')) ? true : false;
    };

    var _sectionId = function(element) {
        return element.parent('section').attr('id');
    };

    var _sectionTriggers = function(current, target) {
        if (current) current.trigger(TRIGGER.UNLOAD);
        target.trigger(TRIGGER.LOAD);
    };

    var _defineTransition = function(target, current) {
        target_transition = target.data('transition');
        if (target_transition) {
            _assignTransitionOrigin(current);
            _assignTransition(current, target_transition);
        }
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
        back: back
    };

})(Lungo);
