App.Events = (function(lng, undefined) {

    lng.ready(function() {
        App.Services.mockProfiles();

        lng.View.Aside.show('#kitchen-sink', '#kitchen-sink-scroll');
        lng.View.Element.progress('.progress', 10, true, 'Downloading 1/5...');
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

    lng.dom('section#navigation-index article a').tap(function(event) {
        var type_of_transition = lng.dom(this).attr('class') || 'normal';

        lng.dom('section#navigation-index').removeClass('pop').removeClass('flow').addClass(type_of_transition);

        setTimeout(function() {
            lng.Router.section('navigation-' + type_of_transition);
        }, 100);
    });

    //List.Append & List.prepend
    lng.dom('section#lists header .onright a').tap(function(event) {
        var param = {
            el: '#list-dinamic',
            template: 'profile-tmp',
            data: {
                name: 'Dinamic item list',
                description: '@soyjavi'
            }
        };

        if ($$(this).hasClass('prepend')) {
            lng.View.Template.List.append(param);
        } else {
            lng.View.Template.List.prepend(param);
        }
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