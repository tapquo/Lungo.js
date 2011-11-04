App.Data = (function(lng, App, undefined) {

    //CONFIG: Data.Sql
    lng.Data.Sql.init({
        name: 'todo.js',
        version: '1.0',
        schema: [
            { name: 'todo', drop: false, fields: {  
                id: 'INTEGER PRIMARY KEY',
                name: 'TEXT',
                description: 'TEXT',
                type: 'STRING',
                done: 'INTEGER DEFAULT 0',
                created_at: 'DATETIME' 
                }
            },
            { name: 'types', drop: false, fields: {
                id: 'INTEGER PRIMARY KEY',
                name: 'TEXT'
                }
            },
        ]
    });

    var refresh = function() {
        _pendingTodos();
        _doneTodos();
    };

    var insertTodo = function(data) {
        lng.Data.Sql.insert('todo', data);
    };

    var removeTodo = function(id) {
        lng.Data.Sql.drop('todo', {id:id});
    };

    var updateTodo = function(id, data) {
        lng.Data.Sql.update('todo', data, {id:id});
    };

    var doneTodo = function(id) {
        lng.Data.Sql.update('todo', {done:1}, {id:id});
    };

    var _pendingTodos = function() {
        lng.Data.Sql.select('todo', {done:0}, function(result){
            lng.View.Template.List.create({
                container_id: 'pending',
                template_id: 'pending-tmp',
                data: result
            });
        });
    };

    var _doneTodos = function() {
        lng.Data.Sql.select('todo', {done:1}, function(result){
            lng.View.Template.List.create({
                container_id: 'done',
                template_id: 'list-tmp',
                data: result
            });
        });
    };

    refresh();

    return {
        refresh: refresh,
        insertTodo: insertTodo,
        removeTodo: removeTodo,
        updateTodo: updateTodo,
        doneTodo: doneTodo
    }
    
})(LUNGO, App);