/** 
 * Lungo UI events Manager
 * 
 * @namespace LUNGO
 * @class Event
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Events = (function(lng, undefined) {

    var EVENTS = {
        mobile: {
            TOUCH_START: 'touchstart',
            TOUCH_MOVE: 'touchmove',
            TOUCH_END: 'touchend',
            TAP: 'tap',
            DOUBLE_TAP: 'doubletap',
            ORIENTATION_CHANGE: 'orientationchange',
            SWIPE:'swipe',
            SWIPE_LEFT:'swipeLeft',
            SWIPE_RIGHT:'swipeRight',
            SWIPE_UP: 'swipeUp',
            SWIPE_DOWN:'swipeDown'
        },
        desktop: {
            TOUCH_START: 'click',
            TOUCH_MOVE: 'click',
            TOUCH_END: 'click',
            TAP: 'click',
            DOUBLE_TAP: 'dblclick',
            ORIENTATION_CHANGE: 'orientationchange'
        }
    };

    /**
     * Returns the touch event based on an enumeration of LungoJS
     * and the current environment
     *
     * @method get
     *
     * @param  {string} Touch enumerator of LungoJS
     * @return {string} Touch event based on the current environment
     */
    var get = function(eventName) {
        var current_environment = lng.Environment.current();
        var current_events = EVENTS[current_environment];
        return current_events[eventName];
    };

    return {
        get: get
    };

})(LUNGO);
