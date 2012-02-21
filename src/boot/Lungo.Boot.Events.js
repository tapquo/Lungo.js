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
        var resize = 'resize';
        var target_selector = 'a[href][data-target]';
        var target_selector_from_aside = 'aside a[href][data-target]';

        //@ToDo: Error with input type="range"
        //lng.dom(document).on(touch_move_event, _iScroll);
        lng.dom(window).on(resize, _changeOrientation);
        lng.dom(target_selector_from_aside).tap(_loadTargetFromAside);
        lng.dom(target_selector).tap(_loadTarget);

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
        var aside_id = '#' + link.parent('aside').attr('id');
        var section_id = '#' + lng.dom('section.aside, section.current').first().attr('id');

        if (link.data('target') === 'article') {
            lng.dom('aside' + aside_id + ' a[href][data-target]').removeClass('current');
            link.addClass('current');
        }
        _hideAsideIfNecesary(section_id, aside_id);

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
        section_id = lng.Router.History.current();
        var article_id =  element.attr('href');

        lng.Router.article(section_id, article_id);
    };

    var _goAside = function(element) {
        var section_id = lng.Router.History.current();
        var aside_id = element.attr('href');
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