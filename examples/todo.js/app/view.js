App.View = (function(lng, App, undefined) {

    lng.View.Template.create('pending-tmp',
        '<li id="{{id}}">\
            <a href="#">\
                <span class="icon check"></span>\
                <strong>{{name}}</strong>\
                <small>{{description}}</small>\
            </a>\
        </li>'
    );

    lng.View.Template.create('list-tmp',
        '<li id="{{id}}">\
            <a href="#">\
                <span class="icon folder"></span>\
                <strong>{{name}}</strong>\
                <small>{{description}}</small>\
            </a>\
        </li>'
    );

    var todo = function(id) {
        lng.Data.Sql.select('todo', {id:id}, function(result){
            if (result){
                var data = result;
                lng.Data.Cache.set('current_todo', data);

                $('#txtEditName').val(data.name);
                $('#txtEditDescription').val(data.description);
                $('#txtEditName').val(data.name);

                lng.Router.section('view');
            }
        });
    };

    var returnToMain = function(message, icon) {
        lng.Sugar.Growl.show(message, icon, true);
        App.Data.refresh();

        setTimeout(function() {
            lng.Router.back();
            lng.Sugar.Growl.hide();
        }, 500);
    };

    return{
        todo: todo,
        returnToMain: returnToMain
    }

})(LUNGO, App);