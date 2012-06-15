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
        DOCUMENT: document,
        WINDOW: window,
        HREF_TARGET: 'a[href][data-target]',
        HREF_TARGET_FROM_ASIDE: 'aside a[href][data-target]',
        CURRENT_SECTION: 'section.aside, section.current'
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

        lng.dom(SELECTORS.WINDOW).on(resize, _changeOrientation);
        lng.dom(SELECTORS.HREF_TARGET).touch(_loadTarget);
        lng.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).tap(_hideAsideIfNecesary);
    };

    var _changeOrientation = function(event) {
        lng.View.Resize.toolbars();
        event.preventDefault();
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

        event.preventDefault();
    };

    var _goSection = function(id) {
        _hideAsideIfNecesary();
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

        lng.Router.article(section_id, article_id, element);
    };

    var _goAside = function(element) {
        var section_id = lng.Router.History.current();
        var aside_id = element.attr(ATTRIBUTE.HREF);

        lng.Router.aside(section_id, aside_id);
    };

    var _hideAsideIfNecesary = function(event) {
        if (window.innerWidth < 768) lng.View.Aside.hide();

        if (event) event.preventDefault();
    };

    return {
        start: start
    };

})(LUNGO);