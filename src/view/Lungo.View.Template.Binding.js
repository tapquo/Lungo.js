/**
 * Lungo Data-Binding system
 *
 * @namespace LUNGO.View.Template
 * @class Binding
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Template.Binding = (function(lng, $$, undefined) {

    var BINDING_START = '{{';
    var BINDING_END = '}}';
    var BINDING_PARSER = /\{{.*?\}}/gi;

    /**
     * Performs databinding process for a data set and a given template
     *
     * @method create
     *
     * @param {String} Id of the container showing the result of databinding
     * @param {String} Databinding Template Id
     * @param {Object} Data for binding
     * @param {Function} Callback when the process is complete
     */
    var create = function(container_id, template_id, data, callback) {
      _compileAndRender($$.fn.html, container_id, template_id, data, callback);
    };

    /**
     * Performs databinding process for a data set and a given template
     *
     * @method append
     *
     * @param {String} Id of the container showing the result of databinding
     * @param {String} Databinding Template Id
     * @param {Object} Data for binding
     * @param {Function} Callback when the process is complete
     */
    var append = function(container_id, template_id, data, callback) {
      _compileAndRender($$.fn.append, container_id, template_id, data, callback);
    };

    var _compileAndRender = function(dom_fnc, container_id, template_id, data, callback) {
        if (lng.View.Template.exists(template_id)) {
            var template = lng.View.Template.get(template_id);
            var markup = _processData(data, template);
            _render(dom_fnc, container_id, markup);
            lng.Core.execute(callback);
        } else {
            lng.Core.log(3, 'lng.View.Template.binding: id ' + template_id + ' not exists');
        }
    };

    var dataAttribute = function(element, attribute) {
        var data = element.data(attribute.tag);

        if (data) {
            var html_binded = attribute.html.replace(BINDING_START + 'value' + BINDING_END, data);
            element.prepend(html_binded);
        }
    };

    var _processData = function(data, template) {
        var data_type = lng.Core.toType(data);

        if (data_type === 'array') {
            return _bindPropertiesInMultiplesElements(data, template);
        } else if (data_type === 'object') {
            return _bindProperties(data, template);
        } else {
            lng.Core.log(3, 'View.Template ERROR >> No type defined.');
        }
    };

    var _bindPropertiesInMultiplesElements = function(elements, template) {
        var markup = '';
        for (var i = 0, len = elements.length; i < len; i++) {
            markup += _bindProperties(elements[i], template);
        }
        return markup;
    };

    var _bindProperties = function(element, template) {
        var binding_field;
        for (var property in element) {
            if (lng.Core.isOwnProperty(element, property)) {
                binding_field = new RegExp(BINDING_START + property + BINDING_END, 'g');
                template = template.replace(binding_field, element[property]);
            }
        }
        return _removeNoBindedProperties(template);
    };

    var _removeNoBindedProperties = function(template) {
        return template.replace(BINDING_PARSER, '');
    };

    var _render = function(dom_fnc, container_id, markup) {
        var container = lng.dom('#' + container_id);
        dom_fnc.call(container, markup);
    };

    return {
        create: create,
        append: append,
        dataAttribute: dataAttribute
    };

})(LUNGO, Quo);
