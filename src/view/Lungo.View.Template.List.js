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
    var SCROLL_TO = lng.Constants.SCROLL_TO;

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
     * if the configuration has property 'scroll_to' this be considered to determine the scroll position
     * the allowed values for this are "first"|"last"|"none" , if this property is not set the default value
     * is "last"", if set this property with "none" the scroll position is not set and if set this property
     * with some value not included in allowed values the scroll postion is default value.
     *
     * @method append
     *
     * @param {object} Id of the container showing the result of databinding
     *
     */
    var append = function(config) {
        var markup = lng.View.Template.markup(config.template, config.data);
        var container = _getContainer(config.el);
        
        var scroll_to = _determineScroll(config, ATTRIBUTE.LAST);
    
        container.append(markup);
        
        _scroll(config.el, scroll_to);
    };

    /**
     * Prepend a list based DataBind with a configuration object for an element <article>
     * if the config has a 'norecords' property it will display the norecords markup rather than nothing.
     * if the configuration has property 'scroll_to' this be considered to determine the scroll position
     * the allowed values for this are "first"|"last"|"none" , if this property is not set the default value
     * is "FIRST"", if set this property with "none" the scroll position is not set and if set this property
     * with some value not included in allowed values the scroll postion is default value.
     *
     * @method prepend
     *
     * @param {object} Id of the container showing the result of databinding
     */
    var prepend = function(config) {
        var markup = lng.View.Template.markup(config.template, config.data);
        var container = _getContainer(config.el);
        
        var scroll_to = _determineScroll(config, ATTRIBUTE.FIRST);
        
        container.prepend(markup);
        
        _scroll(config.el, scroll_to);
    };
    
    var _determineScroll = function(config, default_value){
      var scroll_to = undefined;
      
      if (config.scroll_to == undefined){
        //maintains compatibility with other versions
        scroll_to = default_value;
      }else if(config.scroll_to.toUpperCase() in lng.Constants.SCROLL_TO){
        scroll_to =  lng.Constants.SCROLL_TO[config.scroll_to.toUpperCase()]; 
      }else{
        scroll_to = default_value;
        lng.Core.log(2, ERROR.SCROLL_TO); 
      };
      return scroll_to;
    }

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
