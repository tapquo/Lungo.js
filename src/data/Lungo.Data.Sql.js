/**
 * Wrapper for using WebSql (HTML5 feature)
 *
 * @namespace LUNGO.Data
 * @class Sql
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Data.Sql = (function(lng, undefined) {

    var ERROR = lng.Constants.ERROR;
    var CONFIG = {
        name: 'lungo_db',
        version: '1.0',
        size: 65536,
        schema: []
    };

    var db = null;

    /**
     * Initialize the SQLite storage (HTML5 Feature)
     *
     * @method init
     *
     * @param {object} Configuration for the Database
     */
    var init = function(db_config) {
        CONFIG = lng.Core.mix(CONFIG, db_config);

        db = openDatabase(CONFIG.name, CONFIG.version, CONFIG.name, CONFIG.size);
        if (db) {
            _createSchema();
        } else {
            lng.Core.log(3, ERROR.DATABASE);
        }
    };

    /**
     * Select a data set of a given table and based on a selection object
     *
     * @method select
     *
     * @param {string} Name of the table in the database
     * @param {object} [OPTIONAL] Object selection condition
     * @param {Function} Callback when the process is complete
     */
    var select = function(table, where_obj, callback) {
        var where = (where_obj) ? ' WHERE ' + _convertToSql(where_obj, 'AND') : '';

        execute('SELECT * FROM ' + table + where, function(rs) {
            var result = [];
            for (var i = 0, len = rs.rows.length; i < len; i++) {
                result.push(rs.rows.item(i));
            }

            _callbackResponse(callback, result);
        });
    };

    /**
     * Inserts a data set of a given table and based on a data object
     *
     * @method insert
     *
     * @param {string} Name of the table in the database
     * @param {object} Object (or Array of objects) to insert in table
     */
    var insert = function(table, data, callback) {
        if (lng.Core.toType(data) === 'object') {
            _insertRow(table, data);
        } else {
            for (row in data) {
                _insertRow(table, data[row]);
            }
        }
    };

    /**
     * Updates a data set of a given table and based on a data object and
     * an optional selection object
     *
     * @method update
     *
     * @param {string} Name of the table in the database
     * @param {object} Data object to update in table
     * @param {object} [OPTIONAL] Object selection condition
     */
    var update = function(table, data_obj, where_obj, callback) {
        var sql = 'UPDATE ' + table + ' SET ' + _convertToSql(data_obj, ',');
        if (where_obj) sql += ' WHERE ' + _convertToSql(where_obj, 'AND');

        execute(sql);
    };

    /**
     * Delete a data set of a given table and based on a selection object
     *
     * @method drop
     *
     * @param {string} Name of the table in the database
     * @param {object} [OPTIONAL] Object selection condition
     */
    var drop = function(table, where_obj, callback) {
        var where = (where_obj) ? ' WHERE ' + _convertToSql(where_obj, 'AND') : '';

        execute('DELETE FROM ' + table + where + ';');
    };

    /**
     * Executes a SQL statement in the SQLite storage
     *
     * @method execute
     *
     * @param {string} SQL statement
     * @param {Function} Callback when the process is complete
     */
    var execute = function(sql, callback) {
        lng.Core.log(1, 'lng.Data.Sql >> ' + sql);

        db.transaction( function(transaction) {
            transaction.executeSql(sql, [], function(transaction, rs) {
                _callbackResponse(callback, rs);
            }, function(transaction, error) {
                transaction.executedQuery = sql;
                _throwError.apply(null, arguments);
            });
        });
    };

    var _createSchema = function() {
        var schema = CONFIG.schema;
        var schema_len = schema.length;
        if (!schema_len) return;

        for (var i = 0; i < schema_len; i++) {
            var current = schema[i];

            _regenerateTable(current);
            _createTable(current.name, current.fields);
        }
    };

    var _createTable = function(table, fields) {
        var sql_fields = '';
        for (var field in fields) {
            if (lng.Core.isOwnProperty(fields, field)) {
                if (sql_fields) sql_fields += ', ';
                sql_fields += field + ' ' + fields[field];
            }
        }

        execute('CREATE TABLE IF NOT EXISTS ' + table + ' (' + sql_fields + ');');
    };

    var _regenerateTable = function(table) {
        if (table.drop === true) {
            _dropTable(table.name);
        }
    };

    var _dropTable = function(table) {
        execute('DROP TABLE IF EXISTS ' + table);
    };

    var _convertToSql = function(fields, separator) {
        var sql = '';

        for (var field in fields) {
            if (lng.Core.isOwnProperty(fields, field)) {
                var value = fields[field];
                if (sql) sql += ' ' + separator + ' ';
                sql += field + '=';
                sql += (isNaN(value)) ? '"' + value + '"' : value;
            }
        }
        return sql;
    };

    var _callbackResponse = function(callback, response) {
        if (lng.Core.toType(callback) === 'function') {
            setTimeout(callback, 100, response);
        }
    };

    var _insertRow = function(table, row) {
        var fields = '';
        var values = '';

        for (var field in row) {
            if (lng.Core.isOwnProperty(row, field)) {
                var value = row[field];
                fields += (fields) ? ', ' + field : field;
                if (values) values += ', ';
                values += (isNaN(value)) ? '"' + value + '"' : value;
            }
        }

        execute('INSERT INTO ' + table + ' (' + fields + ') VALUES (' + values + ')');
    };

    var _throwError = function(transaction, error) {
        lng.Core.log(3, 'lng.Data.Sql >> ' + error.code + ': ' + error.message + ' \n Executed query: ' + transaction.executedQuery);
    };

    return {
        init: init,
        select: select,
        insert: insert,
        update: update,
        drop: drop,
        execute: execute
    };

})(LUNGO);