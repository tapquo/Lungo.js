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
        var events_selector   = 'a[href][data-target]';

        lng.Dom.Event.bind(document, touch_move_event, _iScroll);
        lng.Dom.Event.bind(window, orientation_change, _changeOrientation);
        lng.Dom.Event.live(events_selector, touch_start_event, _loadLayout);
    };

    var _iScroll = function(event) {
        event.preventDefault();
    };

    var _changeOrientation = function(event) {
        lng.View.Resize.toolbars();
    };

    var _loadLayout = function(event) {
        event.preventDefault();

        var link = lng.Dom.query(this);
        var target_id = link.attr('href');
        var target_type = link.data('target');

        (target_type === 'section') ? _goSection(target_id) : _goArticle(link);
    };

    var _goSection = function(id) {
        if (id === '#back') {
            lng.Router.back();
        } else {
            lng.Router.section(id);
        }
    };

    var _goArticle = function(element) {
        var section_id =  '#' + element.parents('section').attr('id');
        var article_id =  element.attr('href');

        lng.Router.article(section_id, article_id);
    };

    return {
        start: start
    };

})(LUNGO);