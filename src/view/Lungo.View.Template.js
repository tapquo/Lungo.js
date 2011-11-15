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
 
LUNGO.View.Template = (function(lng, undefined) {

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

    /**
     * Performs databinding process for a data set and a given template
     *
     * @method binding
     *
     * @param {String} Id of the container showing the result of databinding
     * @param {Number} Databinding Template Id
     * @param {Object} Data for binding
     * @param {Function} Callback when the process is complete
     */
    var binding = function(container_id, id, data, callback) {
        lng.View.Template.Binding.create(container_id, id, data, callback);
    };

    return {
        create: create,
        exists: exists,
        get: get,
        binding: binding
    };

})(LUNGO);
