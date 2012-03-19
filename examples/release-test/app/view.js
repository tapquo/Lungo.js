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

    };

    return {
        mockScrolls: mockScrolls
    }


})(LUNGO, App);