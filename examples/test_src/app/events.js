App.Events = (function(lng, undefined) {

    lng.Dom.Event.live('#event_touchstart', 'TOUCH_START', function(event) {
        alert("TOUCH_START!");
    });
    
    lng.Dom.Event.live('#event_touchend', 'TOUCH_END', function(event) {
        alert("TOUCH_END!");
    });
    
    lng.Dom.Event.live('#event_touchmove', 'TOUCH_MOVE', function(event) {
        alert("TOUCH_MOVE!");
    });
    
    lng.Dom.Event.live('#event_tap', 'TAP', function(event) {
        alert("TAP!");
    });
    
    lng.Dom.Event.live('#event_doubletap', 'DOUBLE_TAP', function(event) {
        alert("DOUBLE_TAP!");
    });
    
    lng.Dom.Event.live('#swipe', 'SWIPE', function(event) {
        alert("SWIPE!");
    });
    
    lng.Dom.Event.live('#swipe_left', 'SWIPE_LEFT', function(event) {
        alert("SWIPE_LEFT!");
    });
    
    lng.Dom.Event.live('#swipe_right', 'SWIPE_RIGHT', function(event) {
        alert("SWIPE_RIGHT!");
    });
    
    lng.Dom.Event.live('#swipe_up', 'SWIPE_UP', function(event) {
        alert("SWIPE_UP!");
    });
    
    lng.Dom.Event.live('#swipe_down', 'SWIPE_DOWN', function(event) {
        alert("SWIPE_DOWN!");
    });

    lng.Dom.Event.delegate('body', '#load_list', 'TAP', function(event) {
        App.Services.getMockList();
    });

    lng.Dom.Event.live('#load_scroll_mocks', 'TAP', function(event) {
        App.View.scroll_mockup();
    });

})(LUNGO);