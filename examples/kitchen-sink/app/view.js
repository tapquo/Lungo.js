App.View = (function(lng, App, undefined) {

    lng.View.Template.create(
        'profile-tmp',
        '<li class="{{anchor}}">\
                <img src="{{avatar}}" />\
                <div class="onright">{{name}}</div>\
                {{name}}\
                <small>{{description}}</small>\
            </a>\
        </li>'
    );

    var scroll_mockup = function(){
        var _markup = '';
        for (var i=0; i < 32; i++) {
            _markup += '<li>'+i+'</li>';
        }

        lng.View.Scroll.update('scroll_vertical', _markup);
        lng.View.Scroll.update('scroll_horizontal', _markup);
    }

    return{
        scroll_mockup: scroll_mockup
    }

})(LUNGO, App);