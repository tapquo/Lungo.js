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

                lng.dom('#txtEditName').val(data.name);
                lng.dom('#txtEditDescription').val(data.description);
                lng.dom('#txtEditName').val(data.name);

                lng.Router.section('view');
            }
        });
    };

    var returnToMain = function(message, icon) {
        lng.Sugar.Growl.show(message, 'Please wait...', icon, true, 2);
        App.Data.refresh();

        setTimeout(function() {
            lng.Router.back();
            lng.Sugar.Growl.hide();
        }, 2000);
    };

    var list = function(container, template, rows) {
        lng.View.Template.List.create({
            el: container,
            template: template,
            data: rows
        });
        lng.View.Element.count('a[href="' + container + '"]', rows.length);
    };

    return{
        todo: todo,
        returnToMain: returnToMain,
        list: list
    }

})(Lungo, App);
