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
        var touch_move_event  = 'touchmove';
        var orientation_change = 'orientationchange';
        var target_selector = 'a[href][data-target]';
        var target_selector_from_aside = 'aside a[href][data-target]';

        lng.dom(document).on(touch_move_event, _iScroll);
        lng.dom(window).on(orientation_change, _changeOrientation);
        lng.dom(target_selector_from_aside).tap(_toggleAside);
        lng.dom(target_selector).tap(_loadTarget);
    };

    var _iScroll = function(event) {
        event.preventDefault();
    };

    var _changeOrientation = function(event) {
        lng.View.Resize.toolbars();
    };

    var _toggleAside = function(event) {
        var link = lng.dom(this);
        var section_id =  _getParentIdOfElement(link);
        lng.View.Aside.toggle(section_id);

        event.preventDefault();
    };

    var _loadTarget = function(event) {
        var link = lng.dom(this);
        _selectTarget(link);

        event.preventDefault();
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
                
            case 'rewind':
                var target_id = link.attr('href');
                _goRewind(target_id);
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

    var _goRewind = function(id) {
        lng.Router.rewind(id);
    }

    var _getParentIdOfElement = function(element) {
        var parent_id = '#' + element.parent('section').attr('id');
        return parent_id;
    };

    return {
        start: start
    };

})(LUNGO);
