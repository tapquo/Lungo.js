App.Events = (function(lng, undefined) {

    /*
    lng.ready(function() {

    });
    */

    lng.dom('#test header a.blue').tap(function(event) {
        App.Services.mockProfiles();
    });

    lng.dom('#test header a.red').tap(function(event) {
        var lista = '<li class="selectable">\
                        <img src="assets/images/avatars/1.jpg">\
                        <div class="onright">Profile nº1</div>\
                        Profile nº1<small>Description nº1</small>\
                    </li>';
        lng.dom('#list-added_list').append(lista);

        lng.View.Scroll.refresh('list-added');
    });

    lng.dom('article#list-added li').tap(function(event) {
        $$(this).remove();
        lng.View.Scroll.refresh('list-added');
    });

    //SPECIAL
    $$('section#next').on('load', function(event) {
        console.error('Load #navigation', event);
        lng.Router.article('#next', '#files');
    });

    $$('section#next').on('unload', function(event) {
        console.error('Unload', event);
    });

})(LUNGO);