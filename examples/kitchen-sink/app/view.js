App.View = (function(lng, App, undefined) {

    lng.View.Template.create(
        'list-tmp', 
        '<li class="{{anchor}}">\
            <a href="#">\
                <div class="bubble articblue onright">{{id}} €</div>\
                <strong>{{name}}{{anchor_name}}</strong>\
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