App.Events = (function(lng, undefined) {

    lng.ready(function() {
        App.Services.mockProfiles();
    });

    lng.dom('#event_touchstart').touch(function(event) { alert("touchstart!"); });
    //OR
    //lng.dom('#event_touchstart').on('touchstart', function(event) { alert("TOUCH_START!"); });
    lng.dom('#event_touchend').on('touchend', function(event) { alert("touchend!");  });
    lng.dom('#event_touchmove').on('touchmove' , function(event) { alert("touchmove!"); });

    //Tap Methods
    lng.dom('#event_tap').tap(function(event) { alert("tap!"); });
    //OR
    //lng.dom('#event_tap').on('tap', function(event) { alert("TAP!"); });
    lng.dom('#event_doubletap').doubleTap(function(event) { alert("doubleTap!"); });
    lng.dom('#event_longtap').longTap(function(event) { alert("longTap!"); });

    //Swipe Methods
    lng.dom('#swipe').swipe(function(event) { alert("swipe!"); });
    lng.dom('#swipe_left').swipeLeft(function(event) { alert("swipeLeft!"); });
    lng.dom('#swipe_right').swipeRight(function(event) { alert("swipeRight!"); });
    lng.dom('#swipe_up').swipeUp(function(event) { alert("swipeUp!"); });
    lng.dom('#swipe_down').swipeDown(function(event) { alert("swipeDown!"); });

    lng.dom('a[href="#scrolls"]').on('tap', function(event) {
        App.View.mockScrolls();
    });


    //SPECIAL
    $$('section#navigation').on('load', function(event) {
        console.error('Load #navigation', event);
    });

    $$('section#navigation').on('unload', function(event) {
        console.error('Unload', event);
    });

    $$('article#authors').on('load', function(event) {
        console.error('loaded article');
    });

})(LUNGO);