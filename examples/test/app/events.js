App.Events = (function(lng, undefined) {

    lng.ready(function() {
        //lng.View.Aside.toggle('.onright');

        setTimeout(function() {
            lng.View.Element.progress('#progress-normal', 50, true, 'yeah');
            lng.View.Element.progress('#progress-big', 75, true, 'yeah');

            lng.View.Element.loading('#loading-code', 'white');
        }, 1000);



    });

    //SPECIAL
    $$('section#sec-1').on('load', function(event) {
        console.error('section#sec-1 loaded', event);

        console.error('current section', lng.Element.Current.section);
        lng.Router.article('sec-1', 'nav-2');
    });


    $$('section#sec-2').on('unload', function(event) {
        console.error('section#sec-2 unloaded', event);
    });

    $$('section#sec-2').on('load', function(event) {
        console.error('section#sec-2 loaded', event);
    });

    $$('article#nav-1').on('load', function(event) {
        console.error('article#nav-1 loaded', event);
    });

    $$('article#nav-3').on('unload', function(event) {
        console.error('article#nav-1 unloaded', event);
    });

})(LUNGO);