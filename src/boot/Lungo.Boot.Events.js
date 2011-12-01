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

    /**
     * Initializes the automatic subscription events by markup of the project.
     *
     * @method init
     *
     */
    var start = function() {
        var touch_move_event  = 'TOUCH_MOVE';
        var touch_start_event = 'TOUCH_START';
        var orientation_change = 'ORIENTATION_CHANGE';
        var target_selector = 'a[href][data-target]';
        var target_selector_from_aside = 'ASIDE a[href][data-target]';

        lng.Dom.Event.listener(document, touch_move_event, _iScroll);
        lng.Dom.Event.listener(window, orientation_change, _changeOrientation);
        lng.Dom.Event.live(target_selector_from_aside, touch_start_event, _hideAside);
        lng.Dom.Event.live(target_selector, touch_start_event, _loadTarget);
    };

    var _iScroll = function(event_handler) {
        event_handler.preventDefault();
    };

    var _changeOrientation = function(event) {
        lng.View.Resize.toolbars();
    };

    var _hideAside = function(event) {
        event.preventDefault();

        var link = lng.Dom.query(this);
        var section_id =  _getParentIdOfElement(link);

        lng.View.Aside.toggle(section_id);
    };

    var _loadTarget = function(event) {
        event.preventDefault();

        var link = lng.Dom.query(this);
        _selectTarget(link);
    };

    var _selectTarget = function(link) {
        var target_type = link.data('target');

        switch(target_type) {
            case 'section':
                var target_id = link.attr('href');
                _goSection(target_id);
                break;

            case 'article':
                _goArticle(link);
                break;

            case 'aside':
                _goAside(link);
                break;
        }
    };

    var _goSection = function(id) {
        if (id === '#back') {
            lng.Router.back();
        } else {
            lng.Router.section(id);
        }
    };

    var _goArticle = function(element) {
        var section_id =  _getParentIdOfElement(element);
        var article_id =  element.attr('href');

        lng.Router.article(section_id, article_id);
    };

    var _goAside = function(element) {
        var section_id = _getParentIdOfElement(element);
        lng.View.Aside.toggle(section_id);
    };

    var _getParentIdOfElement = function(element) {
        var parent_id = '#' + element.parents('section').attr('id');
        return parent_id;
    };

    return {
        start: start
    };

})(LUNGO);