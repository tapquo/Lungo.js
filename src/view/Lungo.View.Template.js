/**
 * Lungo Template system
 *
 * @namespace LUNGO.View
 * @class Template
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Template = (function(lng, undefined) {

    var ERROR = lng.Constants.ERROR;

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
     * @method render
     *
     * @param {String} Element selector for showing the result of databinding
     * @param {String} Databinding Template Id
     * @param {Object} Data for binding
     * @param {Function} Callback when the process is complete
     */
    var render = function(element, template_id, data, callback) {
        if (lng.View.Template.exists(template_id)) {
            var container = lng.dom(element);
            var markup = this.markup(template_id, data);
            container.html(markup);

            lng.Core.execute(callback);
        } else {
            lng.Core.log(3, ERROR.BINDING_TEMPLATE + template_id);
        }
    };

    /**
     * Performs databinding process for a data set and a given template
     *
     * @method markup
     *
     * @param {String} Databinding Template Id
     * @param {Object} Data for binding
     */
    var markup = function(template_id, data) {
        return lng.View.Template.Binding.create(template_id, data);
    };

    return {
        create: create,
        exists: exists,
        get: get,
        render: render,
        markup: markup
    };

})(LUNGO);