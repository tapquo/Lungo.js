App.Events = (function(lng, undefined) {

    //Login
    lng.Dom.Event.live('#btnLogin', 'TAP', function(evet) {
        lng.Router.section('main');
        App.Data.refresh();
    });

    //Create new todo
    lng.Dom.Event.live('#btnNewTodo', 'TAP', function(event) {

        var name = lng.dom('#txtNewName');
        var description = lng.dom('#txtNewDescription');
        var type = lng.dom('#txtNewType');

        App.Data.insertTodo({
            name: name.val(),
            description: description.val(),
            done: 0,
            created_at: Date('now')
        });

        name.val('');
        description.val('');

        App.View.returnToMain('ToDo created', 'check');
    });

    //View ToDo
    lng.Dom.Event.live('#done li, #pending li', 'TAP', function(event) {
        var todo_id = lng.dom(this).attr('id');
        App.View.todo(todo_id)
    });

    //Done ToDo
    lng.Dom.Event.live('#btnDoneTodo', 'TAP', function(event) {
        var current_todo = lng.Data.Cache.get('current_todo');

        App.Data.doneTodo(current_todo.id);
        App.View.returnToMain('ToDo done', 'check');
    });

    //Update ToDo
    lng.Dom.Event.live('#btnUpdateTodo', 'TAP', function(event) {
        var current_todo = lng.Data.Cache.get('current_todo');
        var name = lng.dom('#txtEditName');
        var description = lng.dom('#txtEditDescription');
        var type = lng.dom('#txtNewType');

        App.Data.updateTodo(current_todo.id, {
            name: name.val(),
            description: description.val()
        });

        App.View.returnToMain('ToDo updated', 'write');
    });

    //Delete ToDo
    lng.Dom.Event.live('#btnDeleteTodo', 'TAP', function(event) {
        var current_todo = lng.Data.Cache.get('current_todo');

        var options = [
            {
                name: '...Yes, delete it!',
                icon: 'check',
                color: 'green',
                callback: function(){
                    App.Data.removeTodo(current_todo.id);
                    App.View.returnToMain('ToDo deleted', 'trash');
                }
            }
        ];
        lng.Sugar.Growl.option('Are you sure?', options);
    });

})(LUNGO);