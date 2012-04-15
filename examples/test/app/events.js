App.Events = (function(lng, undefined) {

    lng.ready(function() {

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