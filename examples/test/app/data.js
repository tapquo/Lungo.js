App.Data = (function(lng, App, undefined) {


    lng.Data.Sql.init({
        name: 'lungo.js',
        version: '1.0',
        schema: [
            { name: 'test', drop: true, fields: {
                id: 'INTEGER PRIMARY KEY',
                name: 'TEXT',
                done: 'INTEGER DEFAULT 0',
                created_at: 'DATETIME'
                }
            }
        ]
    });

    lng.Data.Sql.insert('test', {name:'javi', done:'1'});

    lng.Data.Sql.insert('test',
        [
            {name:'aitor', done:'1'},
            {name:'iker', done:'1'}
        ]
    );


})(LUNGO, App);