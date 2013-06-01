Lungo - *Cross-Device Framework*
================================

## 3.2.2 SQL
HTML5 provides the users with a database API. Lungo.Data.Sql is a wrapper for WebSQL to work with this APIs in the easiest way.


### 3.2.2.1 .init()
Initializes the SQLite storage. 

**PARAMETERS**

```
object:		Object with the database configuration.
```

**EXAMPLE**

```
var CONFIG = {
    name: 'lungo_db',         //Name of the database
    version: '1.0',           //Version of the database
    size: 65536,              //Size of the database
    schema: [                 //Database schema
        {
            name: 'demo',     //Table name
            drop: true,       //Drop existing content on init
            fields: {         //Table fields
              id: 'INTEGER PRIMARY KEY',
              name: 'TEXT',
              description: 'TEXT',
              type: 'STRING',
              done: 'INTEGER DEFAULT 0',
              created_at: 'DATETIME'
            }
        },
        {
            name: 'twitter',
            fields:{
                id: 'INTEGER PRIMARY KEY',
                name: 'TEXT',
                account: 'TEXT'
            }
        }
    ]
};
Lungo.Data.Sql.init(CONFIG);
```


### 3.2.2.2 insert()
Inserts a data set in the given table. 

**PARAMETERS**

```
string:		Name of the table that will store the entry.
object:		Object or array of objects to store.
```

**EXAMPLE**

```
var accounts = [
    {
        id : 0,
        name : 'lungo',
        account: 'lungojs'
    },{
        id : 1,
        name : 'quojs',
        account: 'quojs'
    }
];

Lungo.Data.Sql.insert('twitter', accounts);
```


### 3.2.2.3 select()
Makes a selection query using a data set on the given table 

**PARAMETERS**

```
string:		Name of the table to search into.
object:		[OPTIONAL] Search condition.
function:	Callback function.
```
This method **return** the function which will do the action on the object.

**EXAMPLE**

```
var showInfo = function(data){
    for(var i = 0, len = data.length; i < len; i++){
        var text = "The account " + data[i].account;
        text += " name is " + data[i].name;
        console.log(text);

};

Lungo.Data.Sql.select('twitter', {account: 'Lungojs'}, showInfo);
```


### 3.2.2.4 update()
Updates an entry in a given table based on a data object and an optional selection object. 

**PARAMETERS**

```
string:		Name of the table to update entry.
object:		Object data used to update the entry.
object:		[OPTIONAL] Object selection condition.
```
This method **return** an object with the mix done.

**EXAMPLE**

```
var account = {name: 'Quo'};

Lungo.Data.Sql.update('twitter', account, {account: 'quojs'});
```


### 3.2.2.5 drop()
Deletes an entry in a given table based on a selection object. 

**PARAMETERS**

```
string:		Name of the table to delete entry.
object:		Object search condition.
```
This method **return** boolean indicating if property exists.

**EXAMPLE**

```
Lungo.Data.Sql.drop('twitter', {account: 'quojs'});
```


### 3.2.2.6 execute()
Executes a SQL statement in the WebSQL storage. 

**PARAMETERS**

```
string		SQL statement.
function:	[OPTIONAL] The callback that gets a SqlResultSet
```
This method **return** a string with the internal JavaScript [[Class]]

**EXAMPLE**

```
Lungo.Data.Sql.execute('SELECT * FROM twitter', function(result){
    //result is a SqlResultSet
});

//Another example:
var sql = 'UPDATE twitter SET name = "quojs" WHERE account = "quojs"';
Lungo.Data.Sql.execute(sql);
```
