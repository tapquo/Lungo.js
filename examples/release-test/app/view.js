App.View = (function(lng, App, undefined) {

    lng.View.Template.create(
        'profile-tmp',
        '<li class="selectable {{anchor}}">\
                <img src="{{avatar}}" />\
                <div class="onright">{{name}}</div>\
                {{name}}\
                <small>{{description}}</small>\
            </a>\
        </li>'
    );

    var mockScrolls = function() {
        var markup = '';
        for (var i=0; i < 32; i++) {
            markup += '<li>'+i+'</li>';
        }

        lng.View.Scroll.update('scroll_vertical', markup);
        lng.View.Scroll.update('scroll_horizontal', markup);
    };

    return {
        mockScrolls: mockScrolls
    }


})(LUNGO, App);