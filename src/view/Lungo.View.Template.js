/** 
 * Lungo Template system
 * 
 * @namespace LUNGO.View
 * @class Template
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */
 
LUNGO.View.Template = (function(undefined) {

    var _templates = {};

    /**
     * Create a new databinding template based on a <markup>
     *
     * @method create
     *
     * @param {String} Id of the new databinding template
     * @param {String} <markup> of the new databinding template
     */
    var create = function(id, markup) {
        _templates[id] = markup;
    };

    /**
     * Returns the existence of a certain Id databinding template
     *
     * @method exists
     *
     * @param {String} Id of the databinding template
     * @return {Boolean} true if exists, false if not.
     */
    var exists = function(id) {
        return (_templates[id]) ? true : false;
    };

    /**
     * Returns the instance of a certain Id databinding template
     *
     * @method get
     *
     * @param {String} Id of the databinding template
     * @return {String} Markup of template
     */
    var get = function(id) {
        return _templates[id];
    };

    return {
        create: create,
        exists: exists,
        get: get
    };

})();
