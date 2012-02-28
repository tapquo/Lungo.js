/**
 * Initialize the automatic DOM UI events
 *
 * @namespace LUNGO.Boot
 * @class Events
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Events = (function(lng, undefined) {

    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var CLASS = lng.Constants.CLASS;
    var ELEMENT = lng.Constants.ELEMENT;
    var SELECTORS = {
        HREF_TARGET: 'a[href][data-target]',
        HREF_TARGET_FROM_ASIDE: 'aside a[href][data-target]'
    };

    /**
     * Initializes the automatic subscription events by markup of the project.
     *
     * @method init
     *
     */
    var start = function() {
        var touch_move_event  = 'touchmove';
        var resize = 'resize';

        //@ToDo: Error with input type="range"
        //lng.dom(document).on(touch_move_event, _iScroll);
        lng.dom(window).on(resize, _changeOrientation);
        lng.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).tap(_loadTargetFromAside);
        lng.dom(SELECTORS.HREF_TARGET).tap(_loadTarget);

        lng.Fallback.androidButtons();
    };

    var _iScroll = function(event) {
        event.preventDefault();
    };

    var _changeOrientation = function(event) {
        lng.View.Resize.toolbars();
    };

    var _loadTargetFromAside = function(event) {
        var link = lng.dom(this);
        var aside_id = '#' + link.parent(ELEMENT.ASIDE).attr(ATTRIBUTE.ID);
        var section_id = '#' + lng.dom('section.aside, section.current').first().attr(ATTRIBUTE.ID);

        if (link.data(ATTRIBUTE.TARGET) === ELEMENT.ARTICLE) {
            lng.dom(ELEMENT.ASIDE + aside_id + ' ' + SELECTORS.HREF_TARGET).removeClass(CLASS.CURRENT);
            link.addClass(CLASS.CURRENT);
        }
        _hideAsideIfNecesary(section_id, aside_id);

    };

    var _loadTarget = function(event) {
        var link = lng.dom(this);
        _selectTarget(link);

        event.preventDefault();
    };

    var _selectTarget = function(link) {
        var target_type = link.data(ATTRIBUTE.TARGET);

        switch(target_type) {
            case ELEMENT.SECTION:
                var target_id = link.attr(ATTRIBUTE.HREF);
                _goSection(target_id);
                break;

            case ELEMENT.ARTICLE:
                _goArticle(link);
                break;

            case ELEMENT.ASIDE:
                _goAside(link);
                break;
        }
    };

    var _goSection = function(id) {
        id = lng.Core.parseUrl(id);
        if (id === '#back') {
            lng.Router.back();
        } else {
            lng.Router.section(id);
        }
    };

    var _goArticle = function(element) {
        var section_id = lng.Router.History.current();
        var article_id =  element.attr(ATTRIBUTE.HREF);

        lng.Router.article(section_id, article_id);
    };

    var _goAside = function(element) {
        var section_id = lng.Router.History.current();
        var aside_id = element.attr(ATTRIBUTE.HREF);

        lng.Router.aside(section_id, aside_id);
    };

    var _hideAsideIfNecesary = function(section_id, aside_id) {
        if (window.innerWidth < 768) {
            lng.View.Aside.hide(section_id, aside_id);
        }
    };

    return {
        start: start
    };

})(LUNGO);