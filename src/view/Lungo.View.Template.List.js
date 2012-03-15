/**
 * Auto generate lists based on Template and Data-Binding system
 *
 * @namespace LUNGO.View.Template
 * @class List
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Template.List = (function(lng, undefined) {

    var ERROR = lng.Constants.ERROR;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;

    /**
     * Create a list based DataBind with a configuration object for an element <article>
	 * if the config has a 'norecords' property it will display the norecords markup rather than nothing.
     *
     * @method create
     *
     * @param {object} Id of the container showing the result of databinding
     */
     var create = function(config) {
        config.container = _getContainer(config.el);

        if (_validateConfig(config)) {
            config.data = _order(config);
            _render(config);
            _scroll(config.el);
        }
	};

    /**
     * Append a list based DataBind with a configuration object for an element <article>
     * if the config has a 'norecords' property it will display the norecords markup rather than nothing.
     *
     * @method append
     *
     * @param {object} Id of the container showing the result of databinding
     */
    var append = function(config) {
        var markup = lng.View.Template.markup(config.template, config.data);
        var container = _getContainer(config.el);

        container.append(markup);
        _scroll(config.el, ATTRIBUTE.LAST);
    };

    /**
     * Prepend a list based DataBind with a configuration object for an element <article>
     * if the config has a 'norecords' property it will display the norecords markup rather than nothing.
     *
     * @method prepend
     *
     * @param {object} Id of the container showing the result of databinding
     */
    var prepend = function(config) {
        var markup = lng.View.Template.markup(config.template, config.data);
        var container = _getContainer(config.el);

        container.prepend(markup);
        _scroll(config.el, ATTRIBUTE.FIRST);
    };

    var _validateConfig = function(config) {
        var checked = false;
        var container_exists = !! config.container.length > 0;
        var template_exists = lng.View.Template.exists(config.template);

        if (container_exists && template_exists) {
            var type = lng.Core.toType(config.data);
            if (type === 'array' || type === 'object') {
                checked = true;
            }
        } else {
            lng.Core.log(3, ERROR.BINDING_LIST);
        }

        return checked;
    };

    var _getContainer = function(element) {
        return lng.dom(element).children().first();
    }

    var _order = function(config) {
        if (config.order && config.order.field && config.order.type) {
            config.data = lng.Core.orderByProperty(config.data, config.order.field, config.order.type);
        }
        return config.data;
    };

    var _render = function(config) {
        lng.View.Template.render(config.container.selector, config.template, config.data);
    };

    var _scroll = function(element, direction) {
        var element_id = lng.dom(element).attr(ATTRIBUTE.ID);

        lng.View.Scroll.init(element_id);
        if (direction) {
            lng.View.Scroll[(direction === ATTRIBUTE.FIRST) ? ATTRIBUTE.FIRST : ATTRIBUTE.LAST](element_id);
        }
    };

    return {
        create: create,
        append: append,
        prepend: prepend
    };

})(LUNGO);