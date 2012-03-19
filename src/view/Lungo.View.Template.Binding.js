/**
 * Lungo Data-Binding system
 *
 * @namespace LUNGO.View.Template
 * @class Binding
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Template.Binding = (function(lng, undefined) {

    var BINDING = lng.Constants.BINDING;
    var ERROR = lng.Constants.ERROR;

    /**
     * Performs databinding process for a data set and a given template
     *
     * @method create
     *
     * @param {String} Databinding Template Id
     * @param {Object} Data for binding
     */
    var create = function(template_id, data) {
        var template = lng.View.Template.get(template_id);
        return _processData(data, template);
    };

    var dataAttribute = function(element, attribute) {
        var data = element.data(attribute.tag);

        if (data) {
            var html_binded = attribute.html.replace(BINDING.START + BINDING.KEY + BINDING.END, data);
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
            lng.Core.log(3, ERROR.BINDING_DATA_TYPE);
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
            if (lng.Core.isOwnProperty(element, property) && element[property] !== null) {
                binding_field = new RegExp(BINDING.START + property + BINDING.END, 'g');
                template = template.replace(binding_field, element[property]);
            }
        }
        return _removeNoBindedProperties(template);
    };

    var _removeNoBindedProperties = function(template) {
        return template.replace(BINDING.PARSER, '');
    };

    return {
        create: create,
        dataAttribute: dataAttribute
    };

})(LUNGO);