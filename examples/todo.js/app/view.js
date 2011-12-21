App.View = (function(lng, App, undefined) {

    lng.View.Template.create('pending-tmp',
        '<li id="{{id}}">\
            <a href="#">\
                <span class="icon check"></span>\
                {{name}}\
                <small>{{description}}</small>\
            </a>\
        </li>'
    );

    lng.View.Template.create('list-tmp',
        '<li id="{{id}}">\
            <a href="#">\
                <span class="icon folder"></span>\
                {{name}}\
                <small>{{description}}</small>\
            </a>\
        </li>'
    );

    var todo = function(id) {
        lng.Data.Sql.select('todo', {id:id}, function(result){
            if (result.length > 0) {
                var data = result[0];
                lng.Data.Cache.set('current_todo', data);

                $('#txtEditName').val(data.name);
                $('#txtEditDescription').val(data.description);
                $('#txtEditName').val(data.name);

                lng.Router.section('view');
            }
        });
    };

    var returnToMain = function(message, icon) {
        lng.Sugar.Growl.notify(message, 'Tap to close', icon, 'error', 5);

        //lng.Sugar.Growl.show(message, icon, true);
        App.Data.refresh();

        setTimeout(function() {
            lng.Router.back();
            lng.Sugar.Growl.hide();
        }, 1000);
    };

    var list = function(container, template, rows) {
        lng.View.Template.List.create({
            container_id: container,
            template_id: template,
            data: rows
        });
        lng.View.Element.count('a[href="#' + container + '"]', rows.length);
    };

    return{
        todo: todo,
        returnToMain: returnToMain,
        list: list
    }

})(LUNGO, App);