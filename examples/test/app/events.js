App.Events = (function(lng, undefined) {

    lng.ready(function() {

        setTimeout(function() {

            lng.View.Element.progress('#progress-normal', 50, true, 'yeah');
            lng.View.Element.progress('#progress-big', 75, true, 'yeah');
        }, 1000);
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