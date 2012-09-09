App.Events = (function(lng, undefined) {

    //Login
    lng.dom('#btnLogin').tap(function(event) {
        lng.Router.section('main');
        App.Data.refresh();
    });

    //Create new todo
    lng.dom('#btnNewTodo').tap(function(event) {

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
    lng.dom('#done li, #pending li').tap(function(event) {
        var todo_id = lng.dom(this).attr('id');
        App.View.todo(todo_id)
    });

    //Done ToDo
    lng.dom('#btnDoneTodo').tap(function(event) {
        var current_todo = lng.Data.Cache.get('current_todo');

        App.Data.doneTodo(current_todo.id);
        App.View.returnToMain('ToDo done', 'check');
    });

    //Update ToDo
    lng.dom('#btnUpdateTodo').tap(function(event) {
        var current_todo = lng.Data.Cache.get('current_todo');
        var name = lng.dom('#txtEditName');
        var description = lng.dom('#txtEditDescription');
        var type = lng.dom('#txtNewType');

        App.Data.updateTodo(current_todo.id, {
            name: name.val(),
            description: description.val()
        });

        App.View.returnToMain('ToDo updated', 'pencil');
    });

    //Delete ToDo
    lng.dom('#btnDeleteTodo').tap(function(event) {
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
            },
            {
                name: '...No, sorry.',
                icon: 'home',
                color: 'red',
                callback: function() {
                    lng.Sugar.Growl.hide();
                }
            }
        ];
        lng.Sugar.Growl.option('Are you sure?', options);
    });

})(Lungo);
