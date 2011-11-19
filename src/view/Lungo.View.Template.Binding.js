/** 
 * Lungo Data-Binding system
 * 
 * @namespace LUNGO.View.Template
 * @class Binding
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */
 
LUNGO.View.Template.Binding = (function(lng, undefined) {

    var BINDING_START = '{{';
    var BINDING_END = '}}';
    var BINDING_PARSER = /\{{.*?\}}/gi;

    /**
     * Performs databinding process for a data set and a given template
     *
     * @method create
     *
     * @param {String} Id of the container showing the result of databinding
     * @param {Number} Databinding Template Id
     * @param {Object} Data for binding
     * @param {Function} Callback when the process is complete
     */
    var create = function(container_id, id, data, callback) {
        if (lng.View.Template.exists(id)) {
            var template = lng.View.Template.get(id);
            var markup = _processData(data, template);
            _render(container_id, markup);
            lng.Core.execute(callback);
        } else {
            lng.Core.log(3, 'lng.View.Template.binding: id ' + id + ' not exists');
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
		var regex;
        for (var property in element) {
            if (lng.Core.isOwnProperty(element, property)) {
				regex = new RegExp(BINDING_START + property + BINDING_END, "g");
				template = template.replace(regex,element[property]);
            }
        }
        return _removeNoBindedProperties(template);
    };

    var _removeNoBindedProperties = function(template) {
        return template.replace(BINDING_PARSER, '');
    };

    var _render = function(container_id, markup) {
        var container = lng.Dom.query('#' + container_id);
        container.html(markup);
    };

    return {
        create: create,
        dataAttribute: dataAttribute
    };

})(LUNGO);
