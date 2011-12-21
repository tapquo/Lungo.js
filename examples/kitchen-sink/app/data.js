App.Data = (function(lng, App, undefined) {

    lng.Data.Sql.init({
        name: 'lungo.js',
        version: '1.0',
        schema: [
            { name: 'demo', drop: true, fields: {
                id: 'INTEGER PRIMARY KEY',
                name: 'TEXT',
                done: 'INTEGER DEFAULT 0',
                created_at: 'DATETIME'
                }
            }
        ]
    });

})(LUNGO, App);