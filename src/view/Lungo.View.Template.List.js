/** 
 * Auto generate lists based on Template and Data-Binding system
 * 
 * @namespace LUNGO.View.Template
 * @class List
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Template.List = (function(lng, undefined) {

    var _config = null;

    /**
     * Create a list based DataBind with a configuration object for an element <article>
     *
     * @method create
     *
     * @param {object} Id of the container showing the result of databinding
     */
    var create = function(config) {
        _config = config;
        _config.container_id += '_list';

        if (_validateConfig()) {
            _order();
            // @ToDo >> _group();
            _render();
            _createScroll();
        }
		else if(config.hasOwnProperty('norecords') && _config.data.length === 0){
			lng.View.Template.Binding.forcerender(_config.container_id,_config.norecords)
		}

    };

    var _validateConfig = function() {
        var checked = false;
        var container_exists = !! lng.Dom.query(_config.container_id);

        if (container_exists) {
            //@ToDo >> Refactor to other method
            lng.Dom.query("#"+_config.container_id).html('');

            var template_exists = lng.View.Template.exists(_config.template_id);
            if (template_exists && _config.data.length) {
                checked = true;
            }
        }

        return checked;
    };

    var _order = function() {
        var order_field = _config.order_field;
        var order_type  = (_config.order_type === 'desc') ? -1 : 1;

        if (order_field && order_type) {
            _config.data.sort(function(a, b) {
                return (a[order_field] < b[order_field]) ? - order_type :
                       (a[order_field] > b[order_field]) ? order_type : 0;
            });
        }
    };

    // @ToDo >> group list by property
    var _group = function() {
    };

    var _render = function() {
        lng.View.Template.Binding.create(_config.container_id, _config.template_id, _config.data);
    };

    var _createScroll = function() {
        var container_id_for_scroll = lng.Dom.query('#' + _config.container_id).parent().attr('id');
        var list_config = {snap:'li'};

        lng.View.Scroll.create(container_id_for_scroll, list_config);
    };

    return {
        create: create
    };

})(LUNGO);
