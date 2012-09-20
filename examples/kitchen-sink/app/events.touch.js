
Lungo.Events.init({
    'tap section#touchevents [data-event=tap]': App.eventConsole,
    'doubleTap section#touchevents [data-event=doubleTap]': App.eventConsole,
    'hold section#touchevents [data-event=hold]': App.eventConsole,

    'swipe section#touchevents [data-event=swipe]': App.eventConsole,
    'swipeLeft section#touchevents [data-event=swipeLeft]': App.eventConsole,
    'swipeUp section#touchevents [data-event=swipeUp]': App.eventConsole,
    'swipeRight section#touchevents [data-event=swipeRight]': App.eventConsole,
    'swipeDown section#touchevents [data-event=swipeDown]': App.eventConsole,
    'swiping section#touchevents [data-event=swiping]': App.eventConsole,

    'rotate section#touchevents [data-event=rotate]': App.eventConsole,
    'rotateLeft section#touchevents [data-event=rotateLeft]': App.eventConsole,
    'rotateRight section#touchevents [data-event=rotateRight]': App.eventConsole,
    'rotating section#touchevents [data-event=rotating]': App.eventConsole,

    'pinch section#touchevents [data-event=pinch]': App.eventConsole,
    'pinchIn section#touchevents [data-event=pinchIn]': App.eventConsole,
    'pinchOut section#touchevents [data-event=pinchOut]': App.eventConsole,
    'pinching section#touchevents [data-event=pinching]': App.eventConsole,

    'drag section#touchevents [data-event=drag]': App.eventConsole

});

