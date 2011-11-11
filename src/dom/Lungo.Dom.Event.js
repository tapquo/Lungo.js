/** 
 * Lungo DOM UI events Manager
 * 
 * @namespace LUNGO.Dom
 * @class Event
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Dom.Event = (function(lng, undefined) {

    /**
     * Add an event listener
     *
     * @method bind
     *
     * @param  {string} Selector that dispatches the event
     * @param  {string} Touch event name
     * @param  {Function} Callback function after the request
     */
    var bind = function(selector, event_name, callback) {
        if (_isNotSpecialEvent(selector, event_name, callback)) {
            lng.Dom.query(selector).bind(lng.Events.get(event_name), callback);
        }
    };

    /**
     * Remove bind event listener
     *
     * @method unbind
     *
     * @param  {string} Selector that dispatches the event
     * @param  {string} Touch event name
     */
    var unbind = function(selector, event_name) {
        lng.Dom.query(selector).unbind(lng.Events.get(event_name));
    };

    /**
     * Add an event listener that listens to the selector for current and future elements
     *
     * @method live
     *
     * @param  {string} Selector that dispatches the event
     * @param  {string} Touch event name
     * @param  {Function} Callback function after the request
     */
    var live = function(selector, event_name, callback) {
        if (_isNotSpecialEvent(selector, event_name, callback)) {
            lng.Dom.query(selector).live(lng.Events.get(event_name), callback);
        }
    };

    /**
     * Remove live listener
     *
     * @method die
     *
     * @param  {string} Selector that dispatches the event
     * @param  {string} Event name
     */
    var die = function(selector, event_name) {
        lng.Dom.query(selector).die(lng.Events.get(event_name));
    };

    /**
     * Add an event listener without event delegation
     *
     * @method delegate
     *
     * @param  {string} Selector that dispatches the event
     * @param  {string} Children of selector that dispatches the event
     * @param  {string} Touch event name
     * @param  {Function} Callback function after the request
     */
    var delegate = function(selector, children_selector, event_name, callback) {
        if (_isNotSpecialEvent(selector, event_name, callback)) {
            lng.Dom.query(selector).delegate(children_selector, lng.Events.get(event_name), callback);
        }
    };

    /**
     * Remove delegate event listener
     *
     * @method undelegate
     *
     * @param  {string} Selector that dispatches the event
     * @param  {string} Children of selector that dispatches the event
     */
    var undelegate = function(selector, children_selector) {
        lng.Dom.query(selector).undelegate(selector);
    };

    /**
     * Listener for DOMelement
     *
     * @method listener
     *
     * @param  {object} Selector that dispatches the event
     * @param  {string} Touch event name
     * @param  {Function} Callback function after the request
     */
    var listener = function(selector, event_name, callback) {
        selector.addEventListener(lng.Events.get(event_name), function(event) {
            setTimeout(callback, 0, event);
        }, false);
    };

    var _isNotSpecialEvent = function(selector, event_name, callback) {
        var is_special_event = false;
        /*
        var SPECIAL_EVENTS = {
            SWIPE: 'swipe',
            SWIPE_LEFT: 'swipeLeft',
            SWIPE_RIGHT: 'swipeRight',
            SWIPE_UP: 'swipeUp',
            SWIPE_DOWN: 'swipeDown',
            DOUBLE_TAP: 'doubleTap'
        };
        var special_event = SPECIAL_EVENTS[event_name];
        lng.Dom.query(selector)[special_event](callback);
        */

        switch(event_name) {
            case 'SWIPE':
                lng.Dom.query(selector).swipe(callback);
                break;
            case 'SWIPE_LEFT':
                lng.Dom.query(selector).swipeLeft(callback);
                break;
            case 'SWIPE_RIGHT':
                lng.Dom.query(selector).swipeRight(callback);
                break;
            case 'SWIPE_UP':
                lng.Dom.query(selector).swipeUp(callback);
                break;
            case 'SWIPE_DOWN':
                lng.Dom.query(selector).swipeDown(callback);
                break;
            case 'DOUBLE_TAP':
                if (lng.Environment.isDesktop()) {
                    lng.Dom.query(selector).live(lng.Events.get(event_name), callback);
                } else {
                    lng.Dom.query(selector).doubleTap(callback);
                }
                break;
            default:
                is_special_event = true;
        }

        return is_special_event;
    };

    return {
        bind: bind,
        unbind: unbind,
        live: live,
        die: die,
        delegate: delegate,
        undelegate: undelegate,
        listener: listener
    };

})(LUNGO);