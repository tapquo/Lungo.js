/**
 *
 *    /$$
 *   | $$
 *   | $$       /$$   /$$ /$$$$$$$   /$$$$$$   /$$$$$$
 *   | $$      | $$  | $$| $$__  $$ /$$__  $$ /$$__  $$
 *   | $$      | $$  | $$| $$  \ $$| $$  \ $$| $$  \ $$
 *   | $$      | $$  | $$| $$  | $$| $$  | $$| $$  | $$
 *   | $$$$$$$$|  $$$$$$/| $$  | $$|  $$$$$$$|  $$$$$$/
 *   |________/ \______/ |__/  |__/ \____  $$ \______/
 *                                  /$$  \ $$
 *                                 |  $$$$$$/
 *                                  \______/
 *
 * @copyright 2011 TapQuo Inc (c)
 * @license   http://www.github.com/tapquo/lungo/blob/master/LICENSE.txt
 * @version   1.0.4
 * @link      https://github.com/TapQuo/Lungo.js
 *
 * @author   Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author   Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

var LUNGO = LUNGO || {};

LUNGO.VERSION = '1.0.4';

LUNGO.Attributes || (LUNGO.Attributes = {});
LUNGO.Data || (LUNGO.Data = {});
LUNGO.Sugar || (LUNGO.Sugar = {});
LUNGO.View || (LUNGO.View = {});
LUNGO.Device || (LUNGO.Device = {});

/**
 * Lungo sandbox APP initialization
 *
 * @namespace LUNGO
 * @class App
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.App = (function(lng, undefined) {

     var default_config = {
         id: 1,
         name: 'lungo_app',
         version: 1.0,
         icon: ''
     };

    /**
     * Initializes all LungoJS system: setting properties for the application,
     * subscribing to automatic events, initializing sections & articles
     * and stating the title.
     *
     * @method init
     *
     * @param {object} Application configuration properties
     */
    var init = function(app_config) {
        default_config = lng.Core.mix(default_config, app_config);

        lng.Boot();
    };

    var get = function(property) {
        return default_config[property];
    };

    return {
        init: init,
        get: get
    };

})(LUNGO);

/**
 * Set environment (Desktop or Mobile) automatically, depending on the
 * environment the subscribed events wil be different.
 *
 * @namespace LUNGO
 * @class Environment
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Environment = (function(lng, undefined) {

    var MOBILE_ENVIRONMENT  = 'mobile';
    var DESKTOP_ENVIRONMENT = 'desktop';

    var _environment = DESKTOP_ENVIRONMENT;

    /**
     * Analizing if it's run in Mobile Phone and changing the type of event to subscribe.
     *
     * @method start
     */
    var start = function() {
        if (lng.Core.isMobile()) {
            _environment = MOBILE_ENVIRONMENT;
            _saveStatsInLungoJS();
        }
    };

    /**
     * Gets the current environment for LungoJS
     *
     * @method current
     *
     * @return {String} Current environment enumerator
     */
    var current = function() {
        return _environment;
    };

    /**
     * Returns whether the development environment is in desktop mode
     *
     * @method isDesktop
     *
     * @return {Boolean} True if is in DESKTOP_ENVIRONMENT
     */
    var isDesktop = function() {
        return (_environment === DESKTOP_ENVIRONMENT) ? true : false;
    };

    /**
     * Save in LungoJS.com the use of the service for further ranking
     *
     * @method _saveStatsInLungoJS
     */
    var _saveStatsInLungoJS = function() {
        lng.Service.post( 'http://www.lungojs.com/stats/', {
            name: lng.App.get('name'),
            version: lng.App.get('version'),
            icon: lng.App.get('icon')
        });
    };

    return {
        start: start,
        current: current,
        isDesktop: isDesktop
    };

})(LUNGO);

/**
 * Contains all the common functions used in Lungo.
 *
 * @namespace LUNGO
 * @class Core
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Core = (function(lng, $, undefined) {

    var ARRAY_PROTO = Array.prototype;
    var OBJ_PROTO   = Object.prototype;
    var SUPPORTED_OS = ['ios', 'android', 'blackberry', 'webos'];

    /**
     * Console system to display messages when you are in debug mode.
     *
     * @method log
     *
     * @param {number} Severity based in (1)Log, (2)Warn, (>2)Error
     * @param {string} Message to show in console
     */
    var log = function(severity, message) {
        if (lng.Environment.isDesktop()) {
            console[(severity === 1) ? 'log' : (severity === 2) ? 'warn' : 'error'](message);
        } else {
            // @todo : send to the server
        }
    };

    /**
     * Executes callbacks based on the parameters received.
     *
     * @method execute
     *
     * @param {Function} callback to execute
     */
    var execute = function() {
        var args = toArray(arguments);
        var callback = args.shift();

        if (toType(callback) === 'function') {
            callback.apply(null, args);
        }
    };

    /**
     * Creates a new function that, when called, itself calls this function in
     * the context of the provided this value, with a given sequence of arguments
     * preceding any provided when the new function was called.
     *
     * @method bind
     *
     * @param {object} object to which the 'this' can refer in the new function when the new function is called.
     * @param {Function} method A function object.
     */
    var bind = function(object, method) {
        return function() {
            return method.apply(object, toArray(arguments));
        };
    };

    /**
     * Copy from any number of objects and mix them all into a new object.
     * The implementation is simple; just loop through arguments and
     * copy every property of every object passed to the function.
     *
     * @method mix
     *
     * @param {object} arguments to mix them all into a new object.
     * @return {object} child a new object with all the objects from the arguments mixed.
     */
     var mix = function() {
        var child = child || {};
        for (var arg = 0, len = arguments.length; arg < len; arg++) {
            var argument = arguments[arg];
            for (var prop in argument) {
                if (isOwnProperty(argument, prop)) {
                    child[prop] = argument[prop];
                }
            }
        }
        return child;
    };

    /**
     * Every object descended from Object inherits the hasOwnProperty method.
     * This method can be used to determine whether an object has the specified property
     * as a direct property of that object.
     *
     * @param {object} object to test for a property's existence inside itself.
     * @param {string} property the name of the property to test.
     * @return {boolean} indicating whether the object has the specified property.
     */
    var isOwnProperty = function(object, property) {
        return OBJ_PROTO.hasOwnProperty.call(object, property);
    };

    /**
     * Determine the internal JavaScript [[Class]] of an object.
     *
     * @param {object} obj to get the real type of itself.
     * @return {string} with the internal JavaScript [[Class]] of itself.
     */
    var toType = function(obj) {
        return OBJ_PROTO.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    };

    /**
     * Convert an array-like object into a true JavaScript array.
     *
     * @param {object} obj Any object to turn into a native Array.
     * @return {object} The object is now a plain array.
     */
    var toArray = function(obj) {
        return ARRAY_PROTO.slice.call(obj, 0);
    };

    /**
     *
     *
     */
    var isMobile = function() {
        var result = false;

        for (var i = 0, len = SUPPORTED_OS.length; i < len && !result; i++) {
            var mobile_os = SUPPORTED_OS[i];
            $.os[mobile_os] && (result = true);
        }

        return result;
    };

    return {
        log: log,
        execute: execute,
        bind: bind,
        mix: mix,
        isOwnProperty: isOwnProperty,
        toType: toType,
        toArray: toArray,
        isMobile: isMobile
    };

})(LUNGO, Zepto);

/**
 * Lungo UI events Manager
 *
 * @namespace LUNGO
 * @class Event
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Events = (function(lng, undefined) {

    var EVENTS = {
        mobile: {
            TOUCH_START: 'touchstart',
            TOUCH_MOVE: 'touchmove',
            TOUCH_END: 'touchend',
            TAP: 'tap',
            DOUBLE_TAP: 'doubletap',
            ORIENTATION_CHANGE: 'orientationchange'
        },
        desktop: {
            TOUCH_START: 'mousedown',
            TOUCH_MOVE: 'mousemove',
            TOUCH_END: 'mouseup',
            TAP: 'click',
            DOUBLE_TAP: 'dblclick',
            ORIENTATION_CHANGE: 'resize'
        }
    };

    /*
    var current_environment = lng.Environment.current();
    var current_events = EVENTS[current_environment];
    */
    var current_environment = null;
    var current_events = null;


    /**
     * Returns the touch event based on an enumeration of LungoJS
     * and the current environment
     *
     * @method get
     *
     * @param  {string} Touch enumerator of LungoJS
     * @return {string} Touch event based on the current environment
     */
    var get = function(eventName) {
        return current_events[eventName];
    };

    var init = function() {
        current_environment = lng.Environment.current();
        current_events = EVENTS[current_environment];
    };

    return {
        get: get,
        init: init
    };

})(LUNGO);

/**
 * External Data & Services Manager
 *
 * @namespace LUNGO
 * @class Service
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Service = (function(lng, $, undefined) {

    /**
     * Load data from the server using a HTTP GET request.
     *
     * @method get
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} [OPTIONAL] Callback function after the request
     */
    var get = function(url, data, callback) {
        var parameters = '?';
        for (var parameter in data) {
            if (lng.Core.isOwnProperty(data, parameter)) {
                if (parameters !== '?') parameters += '&';
                parameters += parameter + '=' + data[parameter];
            }
        }
        url = url + parameters;

        _ajax('GET', url, null, callback);
    };

    /**
     * Load data from the server using a HTTP POST request.
     *
     * @method post
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} [OPTIONAL] Callback function after the request
     */
    var post = function(url, data, callback) {
        _ajax('POST', url, data, callback);
    };

    var _ajax = function(type, url, data, callback, error) {
        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: 'json',
            success: function(response) {
                if (lng.Core.toType(callback) === 'function') {
                    setTimeout(callback, 100, response);
                }
            },
            error: function(xhr, type) {
                if (error) {
                    setTimeout(error, 100, result);
                }
            }
        });
    };

    return {
        get: get,
        post: post
    };

})(LUNGO, Zepto);

/**
 * Handles the <sections> and <articles> to show
 *
 * @namespace LUNGO
 * @class Router
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Router = (function(lng, undefined) {

    var CSS_CLASSES = {
        SHOW: 'show',
        HIDE: 'hide'
    };

    /**
     * Navigate to a <section>.
     *
     * @method section
     *
     * @param {string} Id of the <section>
     */
    var section = function(section_id) {
        var section_id = (section_id.indexOf('#')) ? '#' + section_id : section_id;
        var target = 'section' + section_id;

        if (_existsTarget(target)) {
            lng.Dom.query(_getHistoryCurrent()).removeClass(CSS_CLASSES.SHOW).addClass(CSS_CLASSES.HIDE);
            lng.Dom.query(section_id).addClass(CSS_CLASSES.SHOW);

            lng.Router.History.add(section_id);
        }
    };

    /**
     * Displays the <article> in a particular <section>.
     *
     * @method article
     *
     * @param {string} <section> Id
     * @param {string} <article> Id
     */
    var article = function(section_id, article_id) {
        var target = section_id + ' article' + article_id;

        if (_existsTarget(target)) {
            lng.View.Article.show(section_id, article_id);
        }
    };

    /**
     * Return to previous section.
     *
     * @method back
     */
    var back = function() {
        lng.Dom.query(_getHistoryCurrent()).removeClass(CSS_CLASSES.SHOW);
        lng.Router.History.removeLast();

        lng.Dom.query(_getHistoryCurrent()).removeClass(CSS_CLASSES.HIDE).addClass(CSS_CLASSES.SHOW);
    };

    var _existsTarget = function(target) {
        var exists = false;

        if ($(target).length > 0) {
            exists = true;
        } else {
            lng.Core.log(3, 'Lungo.Router ERROR: The target ' + target + ' does not exists.');
        }
        return exists;
    }

    var _getHistoryCurrent = function() {
        return lng.Router.History.current();
    };

    return {
        section: section,
        article: article,
        back: back
    };

})(LUNGO);

/**
 * Stores the displayed <sections> as a historical.
 *
 * @namespace LUNGO.Router
 * @class History
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Router.History = (function(undefined) {

     var _history = [];

     /**
      * Create a new element to the browsing history based on the current section id.
      *
      * @method add
      *
      * @param  {string} Id of the section
      */
     var add = function(section_id) {
         if (section_id !== current()) {
             _history.push(section_id);
         }
     };

     /**
      * Returns the current browsing history section id.
      *
      * @method current
      *
      * @return {string} Current section id
      */
     var current = function() {
         return _history[_history.length - 1];
     };

     /**
      * Removes the current item browsing history.
      *
      * @method removeLast
      */
     var removeLast = function() {
         _history.length -= 1;
     };

    return {
        add: add,
        current: current,
        removeLast: removeLast
    };

})();

/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace LUNGO.View
 * @class Article
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Article = (function(lng, undefined) {

    var SELECTORS = {
        ARTICLE: 'article',
        NAVIGATION_ITEM: 'a'
    };

    var CSS_CLASSES = {
        ACTIVE: 'current'
    };

    var show = function(section_id, article_id) {
        var nav_items = section_id + ' ' + SELECTORS.NAVIGATION_ITEM;
        _disableNavItems(nav_items);

        var current_nav_item = lng.Dom.query(nav_items + '[href="' + article_id + '"]');
        current_nav_item.addClass(CSS_CLASSES.ACTIVE);
        _setTitle(section_id, current_nav_item);

        _showContainer(section_id, article_id);
    };

    var _disableNavItems = function(items) {
        lng.Dom.query(items).removeClass(CSS_CLASSES.ACTIVE);
    };

    var _showContainer = function(section_id, article_id) {
        var section_articles = section_id + ' ' + SELECTORS.ARTICLE;
        lng.Dom.query(section_articles).removeClass(CSS_CLASSES.ACTIVE);
        lng.Dom.query(article_id).addClass(CSS_CLASSES.ACTIVE);
    };

    var _setTitle = function(id, item) {
        var title = item.data('title');

        if (title) {
            var section_title = id + ' header .title, ' + id + ' footer .title';
            lng.Dom.query(section_title).text(title);
        }
    };

    return {
        show: show
    };

})(LUNGO);

/**
 *
 *
 * @namespace LUNGO.View
 * @class Resize
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Resize = (function(lng, undefined) {

    /**
     * Rezise a <scroll> element
     *
     * @method scroll
     *
     * @param {object} Object reference of a determinated <section>
     */
    var scroll = function(scroll) {
        var container = scroll.children().first();
        var child = container.children().first();

        if (lng.View.Scroll.isHorizontal(scroll)) {
            _resizeScrollContainerWidth(container, child);
        } else {
            _resizeScrollContainerHeight(scroll, container, child);
        }
    };

    /**
     * Resize all <article>s from determinated <section> based on a CSS property.
     *
     * @method article
     *
     * @param {object} Object reference of a determinated <section>
     * @param {string} Selector that refers to a section element
     * @param {string} CSS property
     * @param {string} Element reference for resizing
     */
    var article = function(section, selector, property, reference) {
        var element = section.children(selector);
        var ARTICLE = 'article';

        if (element.length > 0) {
            var reference_dimension = element[reference]();
            section.children(ARTICLE).css(property, reference_dimension + 'px');
        }
    };

    /**
     * Sets toolbars width, using total screen width
     *
     * @method toolbars
     */
    var toolbars = function() {
        var toolbar = '.toolbar nav';
        var all_toolbars = lng.Dom.query(toolbar);

        for (var i = 0, len = all_toolbars.length; i < len; i++) {
            var toolbar = lng.Dom.query(all_toolbars[i]);
            var toolbar_children = toolbar.children();
            var toolbar_children_width = (toolbar.width() / toolbar_children.length);

            toolbar_children.css('width', toolbar_children_width + 'px');
        }
    };

    var _resizeScrollContainerWidth = function(container, child) {
        var scroll_width = (container.children().length * child.width());
        container.css('width', scroll_width + 'px');
    };

    var _resizeScrollContainerHeight = function(scroll, container, child) {
        var total_children = container.children().length;
        var children_in_scroll_width = Math.floor(scroll.width() / child.width());
        var total_rows = Math.ceil(total_children / children_in_scroll_width);

        var scroll_height = (total_rows * child.height());
        container.css('height', scroll_height + 'px');
    };

    return {
        scroll: scroll,
        article: article,
        toolbars: toolbars
    };

})(LUNGO);

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
     * @param {String} Databinding Template Id
     * @param {Object} Data for binding
     * @param {Function} Callback when the process is complete
     */
    var binding = function(container_id, template_id, data, callback) {
        lng.View.Template.Binding.create(container_id, template_id, data, callback);
    };

    return {
        create: create,
        exists: exists,
        get: get,
        binding: binding
    };

})(LUNGO);

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
     * @param {String} Databinding Template Id
     * @param {Object} Data for binding
     * @param {Function} Callback when the process is complete
     */
    var create = function(container_id, template_id, data, callback) {
        if (lng.View.Template.exists(template_id)) {
            var template = lng.View.Template.get(template_id);
            var markup = _processData(data, template);
            _render(container_id, markup);
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

    var _render = function(container_id, markup) {
        var container = lng.Dom.query('#' + container_id);
        container.html(markup);
    };

    return {
        create: create,
        dataAttribute: dataAttribute
    };

})(LUNGO);

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
	 * if the config has a 'norecords' property it will display the norecords markup rather than nothing.
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
	};

    var _validateConfig = function() {
        var checked = false;
        var container_exists = !! lng.Dom.query(_config.container_id);
        var template_exists = lng.View.Template.exists(_config.template_id);

        if (container_exists && template_exists) {
            //@ToDo >> Refactor to other method
            lng.Dom.query("#"+_config.container_id).html('');

            var type = lng.Core.toType(_config.data);
            if (type === 'array' || type === 'object') {
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
        var list_config = { snap: 'li' };

        lng.View.Scroll.create(container_id_for_scroll, list_config);
    };

    return {
        create: create
    };

})(LUNGO);

/**
 * Wrapper of the third library iScroll
 *
 * @namespace LUNGO.View
 * @class Scroll
 * @requires Zepto
 * @requires iScroll
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Scroll = (function(lng, undefined) {

    var DEFAULT_PROPERTIES = {
        hScroll: false,
        vScroll: false,
        useTransition: true,
        momentum: true,
        lockDirection: true,
        fixedScrollbar: true,
        fadeScrollbar: true,
        hideScrollbar: true
    };

    var HORIZONTAL_CLASS = 'horizontal';

    var CACHE_KEY = 'scrolls';

    var HEADER_FOOTER_BLEEDING = 90;

    /**
     * Creates a new iScroll element.
     *
     * @method create
     *
     * @param {string} Id of the container scroll.
     * @param {object} [OPTIONAL] Properties
     */
    var create = function(id, properties) {
        if (id) {
            var scroll = lng.Dom.query('#' + id);

            //ToDo >> Refactor
            setTimeout(function() {
                if (_needScroll(scroll)) {
                    properties = _mixProperties(scroll, properties);
                    _saveScrollInCache(id, properties);
                }
            }, 100);

        } else {
            lng.Core.log(3, 'ERROR: Impossible to create a <scroll> without ID');
        }
    };

    /**
     * Update iScroll element with new <markup> content.
     *
     * @method update
     *
     * @param {string} Id of the container scroll.
     * @param {string} Markup content
     */
    var update = function(id, content) {
        var scroll = lng.Dom.query('#' + id);
        var container = scroll.children().first();

        if (container.length === 0) {
            scroll.html('<div id="' + id + '_scrl"></div>');
            container = scroll.children().first();
        }
        container.html(content);

        lng.View.Resize.scroll(scroll);
        _refresh(id);
    };

    /**
     * Removes iScroll instance.
     *
     * @method remove
     *
     * @param {string} Id of the <section>
     */
    var remove = function(id) {
        if (lng.Data.Cache.exists(CACHE_KEY)) {
            lng.Data.Cache.get(CACHE_KEY, id).destroy();
            lng.Data.Cache.remove(CACHE_KEY, id);
        }
    };

    /**
     * Removes iScroll instance.
     *
     * @method scrollIsHorizontal
     *
     * @param {Object} Id of the <section>
     */
    var isHorizontal = function(scroll) {
        return (scroll.hasClass(HORIZONTAL_CLASS)) ? true : false;
    };

    var _needScroll = function(scroll) {
        var is_necessary = false;

        var element = scroll[0];
        if (element.clientHeight < element.scrollHeight) {
            is_necessary = true;
            var child_height = element.scrollHeight + HEADER_FOOTER_BLEEDING;
            _resizeChildContainer(element, child_height);
        }

        return is_necessary;
    };

    var _resizeChildContainer = function(element, height) {
        var child_container = lng.Dom.query(element).children().first();
        child_container.css('height', height + 'px');
    };

    var _saveScrollInCache = function(id, properties) {
        _createScrollIndexInCache();

        var scroll = lng.Data.Cache.get(CACHE_KEY);
        scroll[id] = new iScroll(id, properties);
        lng.Data.Cache.set(CACHE_KEY, scroll);
    };

    var _createScrollIndexInCache = function() {
        if (!lng.Data.Cache.exists(CACHE_KEY)) {
            lng.Data.Cache.set(CACHE_KEY, {});
        }
    }

    var _mixProperties = function(scroll, properties) {
        var scroll_type = isHorizontal(scroll) ? 'hScroll' : 'vScroll';

        properties || (properties = {});
        properties[scroll_type] = true;
        properties = lng.Core.mix(DEFAULT_PROPERTIES, properties);

        return properties;
    };

    var _refresh = function(id, properties) {
        !lng.Data.Cache.get(CACHE_KEY, id) && _saveScrollInCache(id);
        lng.Data.Cache.get(CACHE_KEY, id).refresh();
    };

    return {
        create: create,
        update: update,
        remove: remove,
        isHorizontal: isHorizontal
    };

})(LUNGO);

/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace LUNGO.View
 * @class Aside
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Aside = (function(lng, undefined) {

    var toggle = function(section_id) {
        var articles = lng.Dom.query(section_id + ' article');
        articles.toggleClass('aside');
    };

    return {
        toggle: toggle
    };

})(LUNGO);

/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace LUNGO.View
 * @class Element
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.View.Element = (function(lng, undefined) {

    var SELECTORS = {
        BUBBLE: '.bubble.count'
    };
    var BINDING_START = '{{';
    var BINDING_END = '}}';


    var count = function(selector, count) {
        var element = lng.Dom.query(selector);

        if (element ) {
            if (count > 0) {
                _setBubble (element, count);
            } else {
                element.children(SELECTORS.BUBBLE).remove();
            }
        }
    };

    var _setBubble = function(element, count) {
        var bubbles = element.children(SELECTORS.BUBBLE);
        var total_bubbles = bubbles.length;

        if (total_bubbles > 0) {
            bubbles.html(count);
        } else {
            var count_html = LUNGO.Attributes.Data.Count.html;
            var html_binded = count_html.replace(BINDING_START + 'value' + BINDING_END, count);

            element.append(html_binded);
        }
    }

    return {
        count: count
    };

})(LUNGO);

/**
 * LungoJS Dom Handler
 *
 * @namespace LUNGO
 * @class Dom
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Dom = (function(lng, $, undefined) {

    /**
     * Add an event listener
     *
     * @method query
     *
     * @param  {string} <Markup> element selector
     * @return {Object} Zepto <element> instance
     */
    var query = function(selector) {
        return $(selector);
    };

    return {
        query: query
    };

})(LUNGO, Zepto);

/**
 * Lungo DOM UI events Manager
 *
 * @namespace LUNGO.Dom
 * @class Event
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Dom.Event = (function(lng, undefined) {

    /**
     * Add an event listener
     *
     * @method bind
     *
     * @param  {string} Selector that dispatches the event
     * @param  {string} Touch event name
     * @param  {Function} Callback function after the request
     */
    var bind = function(selector, event_name, callback) {
        if (_isNotSpecialEvent(selector, event_name, callback)) {
            lng.Dom.query(selector).bind(lng.Events.get(event_name), callback);
        }
    };

    /**
     * Remove bind event listener
     *
     * @method unbind
     *
     * @param  {string} Selector that dispatches the event
     * @param  {string} Touch event name
     */
    var unbind = function(selector, event_name) {
        lng.Dom.query(selector).unbind(lng.Events.get(event_name));
    };

    /**
     * Add an event listener that listens to the selector for current and future elements
     *
     * @method live
     *
     * @param  {string} Selector that dispatches the event
     * @param  {string} Touch event name
     * @param  {Function} Callback function after the request
     */
    var live = function(selector, event_name, callback) {
        if (_isNotSpecialEvent(selector, event_name, callback)) {
            lng.Dom.query(selector).live(lng.Events.get(event_name), callback);
        }
    };

    /**
     * Remove live listener
     *
     * @method die
     *
     * @param  {string} Selector that dispatches the event
     * @param  {string} Event name
     */
    var die = function(selector, event_name) {
        lng.Dom.query(selector).die(lng.Events.get(event_name));
    };

    /**
     * Add an event listener without event delegation
     *
     * @method delegate
     *
     * @param  {string} Selector that dispatches the event
     * @param  {string} Children of selector that dispatches the event
     * @param  {string} Touch event name
     * @param  {Function} Callback function after the request
     */
    var delegate = function(selector, children_selector, event_name, callback) {
        if (_isNotSpecialEvent(selector, event_name, callback)) {
            lng.Dom.query(selector).delegate(children_selector, lng.Events.get(event_name), callback);
        }
    };

    /**
     * Remove delegate event listener
     *
     * @method undelegate
     *
     * @param  {string} Selector that dispatches the event
     * @param  {string} Children of selector that dispatches the event
     */
    var undelegate = function(selector, children_selector) {
        lng.Dom.query(selector).undelegate(selector);
    };

    /**
     * Listener for DOMelement
     *
     * @method listener
     *
     * @param  {object} Selector that dispatches the event
     * @param  {string} Touch event name
     * @param  {Function} Callback function after the request
     */
    var listener = function(selector, event_name, callback) {
        selector.addEventListener(lng.Events.get(event_name), function(event) {
            setTimeout(callback, 0, event);
        }, false);
    };

    var _isNotSpecialEvent = function(selector, event_name, callback) {
        var is_special_event = false;
        /*
        var SPECIAL_EVENTS = {
            SWIPE: 'swipe',
            SWIPE_LEFT: 'swipeLeft',
            SWIPE_RIGHT: 'swipeRight',
            SWIPE_UP: 'swipeUp',
            SWIPE_DOWN: 'swipeDown',
            DOUBLE_TAP: 'doubleTap'
        };
        var special_event = SPECIAL_EVENTS[event_name];
        lng.Dom.query(selector)[special_event](callback);
        */

        switch(event_name) {
            case 'SWIPE':
                lng.Dom.query(selector).swipe(callback);
                break;
            case 'SWIPE_LEFT':
                lng.Dom.query(selector).swipeLeft(callback);
                break;
            case 'SWIPE_RIGHT':
                lng.Dom.query(selector).swipeRight(callback);
                break;
            case 'SWIPE_UP':
                lng.Dom.query(selector).swipeUp(callback);
                break;
            case 'SWIPE_DOWN':
                lng.Dom.query(selector).swipeDown(callback);
                break;
            case 'DOUBLE_TAP':
                if (lng.Environment.isDesktop()) {
                    lng.Dom.query(selector).live(lng.Events.get(event_name), callback);
                } else {
                    lng.Dom.query(selector).doubleTap(callback);
                }
                break;
            default:
                is_special_event = true;
        }

        return is_special_event;
    };

    return {
        bind: bind,
        unbind: unbind,
        live: live,
        die: die,
        delegate: delegate,
        undelegate: undelegate,
        listener: listener
    };

})(LUNGO);

/**
 * Object with data-attributes (HTML5) with a special <markup>
 *
 * @namespace LUNGO.Attributes
 * @class Data
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Attributes.Data = {
    Search: {
        tag: 'search',
        selector: '.list',
        html: '<li class="search {{value}}"><input type="search" placeholder="Search..."><a href="#" class="button" data-icon="search"></a></li>'
    },
    Count: {
        tag: 'count',
        selector: '*',
        html: '<span class="bubble count">{{value}}</span>'
    },
    Search: {
        tag: 'search',
        selector: '*',
        html: '<input type="search" placeholder="{{value}}"/><a href="#" class="button" data-icon="search"></a>'
    },
    Icon: {
        tag: 'icon',
        selector: '*',
        html: '<span class="icon {{value}}"></span>'
    },
    Image: {
        tag: 'image',
        selector: '*',
        html: '<img src="{{value}}" class="icon" />'
    },
    Title: {
        tag: 'title',
        selector: 'header, footer, article',
        html: '<h1 class="title">{{value}}</h1>'
    },
    Back: {
        tag: 'back',
        selector: 'header, footer',
        html: '<a href="#back" data-target="section" class="back onleft button icon {{value}}"></a>'
    }
};

/**
 * Temporary cache system
 *
 * @namespace LUNGO.Data
 * @class Cache
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Data.Cache = (function(lng, undefined) {

    var _cache = {};

    /**
     * Sets in the LungoJS cache system a new key/value
     *
     * @method set
     *
     * @param {string} Key for the new value
     * @param {object} Type of environment: DESKTOP_ENVIRONMENT or MOBILE_ENVIRONMENT
     */
    var set = function(key, value) {
        if (exists(key)) {
            _cache[key] = lng.Core.mix(get(key), value);
        } else {
            _cache[key] = value;
        }
    };

    /**
     * Returns the value of a given key.
     *
     * @method get
     *
     * @param {string} Key in LungoJS Cache System
     * @param {string} [OPTIONAL] Subkey in LungoJS Cache System
     * @return {object} Value
     */
    var get = function(key, value) {
        if (arguments.length === 1) {
            return _cache[key];
        } else {
            return _cache[arguments[0]][arguments[1]];
        }
    };

    /**
     * Removes the instance in LungoJs Cache System of a given key
     *
     * @method remove
     *
     * @param {string} Key in LungoJS Cache System
     * @param {string} [OPTIONAL] Subkey in LungoJS Cache System
     */
    var remove = function(key, value) {
        if (arguments.length === 1) {
            delete _cache[key];
        } else {
            delete _cache[arguments[0]][arguments[1]];
        }
    };

    /**
     * Returns the existence of a key in LungoJs Cache System
     *
     * @method exists
     *
     * @param {String} Key in LungoJS Cache System
     * @return {Boolean} true if exists, false if not
     */
    var exists = function(key) {
        return (_cache[key]) ? true : false;
    };

    return {
        set: set,
        get: get,
        remove: remove,
        exists: exists
    };

})(LUNGO);

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
            lng.Core.log(3, 'lng.Data.Sql >> Failed to connect to database.');
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
     * @param {object} Data object to insert in table
     */
    var insert = function(table, data_obj, callback) {
        var fields = '';
        var values = '';

        for (var field in data_obj) {
            if (lng.Core.isOwnProperty(data_obj, field)) {
                var value = data_obj[field];
                fields += (fields) ? ', ' + field : field;
                if (values) values += ', ';
                values += (isNaN(value)) ? '"' + value + '"' : value;
            }
        }

        execute('INSERT INTO ' + table + ' (' + fields + ') VALUES (' + values + ')');
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

        db.transaction(function(tx) {
            tx.executeSql(sql, [], function(tx, rs) {
                _callbackResponse(callback, rs);
            }, _throwError);
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

    var _throwError = function(transaction, error) {
        lng.Core.log(3, 'lng.Data.Sql >> ' + error.code + ': ' + error.message);
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

/**
 * Wrapper for using LocalStorage & SessionStorage (HTML5 Feature)
 *
 * @namespace LUNGO.Data
 * @class Storage
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Data.Storage = (function(lng, undefined) {

    return {

    };

})(LUNGO);

/**
 * Boot for a new LungoJS Application instance
 *
 * @namespace LUNGO
 * @class App
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot = (function(lng, undefined) {

    return function() {
        lng.Environment.start();

        lng.Boot.Layout.start();
        lng.Boot.Events.start();
        lng.Boot.Data.start();
        lng.Boot.Section.start();
        lng.Boot.Article.start();
    };

})(LUNGO);

/**
 * Initialize the Layout of LungoJS (if it's a mobile environment)
 *
 * @namespace LUNGO.Boot
 * @class Layout
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Boot.Layout = (function(lng, undefined) {

    var _window = null;
    var _document = null;

    /**
     * Initializes the automatic subscription events by markup of the project.
     *
     * @method init
     *
     */
    var start = function() {
        if (!lng.Environment.isDesktop()) {
            _window = window;
            _document = _window.document;

            _resizeLayout();
        }
    };

    var _resizeLayout = function() {
        if (_window.innerHeight == 356) {
            var _height = 416;

            lng.Dom.query('body').css('height', _height + 'px');
            _hideNavigationBar();
        }
    };

    var _hideNavigationBar = function() {
        if( !location.hash || !_window.addEventListener ){
            _window.scrollTo( 0, 1 );
            var scrollTop = 1,

            //reset to 0 on bodyready, if needed
            bodycheck = setInterval(function(){
                if( _document.body ){
                    clearInterval( bodycheck );
                    scrollTop = 'scrollTop' in _document.body ? _document.body.scrollTop : 1;
                    _window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                }
            }, 15 );

            _window.addEventListener( 'load', function(){
                setTimeout(function(){
                    _window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                }, 0);
            }, false );
        }
    };

    return {
        start: start
    };

})(LUNGO);

/**
 * Initialize the <article> element
 *
 * @namespace LUNGO.Boot
 * @class Article
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Article = (function(lng, undefined) {

    var SELECTORS = {
        LIST_IN_ARTICLE: 'article.list',
        SCROLL_IN_ARTICLE: '.scrollable',
        CHECKBOX_IN_ARTICLE: '.checkbox, .radio'
    };

    /**
     * Initializes the markup elements of an article
     *
     * @method init
     */
    var start = function() {
        _initElement(SELECTORS.LIST_IN_ARTICLE, _createListElement);
        _initElement(SELECTORS.SCROLL_IN_ARTICLE, _createScrollElement);
        _initElement(SELECTORS.CHECKBOX_IN_ARTICLE, _createCheckboxElement);
    };

    var _initElement = function(selector, callback) {
        var found_elements = lng.Dom.query(selector);

        for (var i = 0, len = found_elements.length; i < len; i++) {
            var element = lng.Dom.query(found_elements[i]);
            lng.Core.execute(callback, element);
        }
    };

    var _createListElement = function(article) {
        if (article.children().length === 0) {
            var article_id = article.attr('id');
            article.append('<ul id="' + article_id + '_list"></ul>');
        }
    };

    var _createScrollElement = function(scroll) {
        var scroll_id = scroll.attr('id');
        lng.View.Scroll.create(scroll_id);
    };

    var _createCheckboxElement = function(checkbox) {
        checkbox.append('<span>&nbsp;</span>');
    };

    return {
        start: start
    };

})(LUNGO);

/**
 * Make an analysis of Data attributes in HTML elements and creates a <markup>
 * based on each data type.
 *
 * @namespace LUNGO.Boot
 * @class Data
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Data = (function(lng, undefined) {

    /**
     * Initialize the <markup> data-attributes analisys
     *
     * @method init
     *
     *
     */
    var start = function() {
        var attributes = lng.Attributes.Data;

        for (var attribute in attributes) {
            if (lng.Core.isOwnProperty(attributes, attribute)) {
                _findElements(attributes[attribute]);
            }
        }
    };

    var _findElements = function(attribute) {
        var elements = lng.Dom.query(attribute.selector);

        for (var i = 0, len = elements.length; i < len; i++) {
            var element = lng.Dom.query(elements[i]);
            lng.View.Template.Binding.dataAttribute(element, attribute);
        }
    };

    return {
        start: start
    };

})(LUNGO);

/**
 * Initialize the automatic DOM UI events
 *
 * @namespace LUNGO.Boot
 * @class Events
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Events = (function(lng, undefined) {

    /**
     * Initializes the automatic subscription events by markup of the project.
     *
     * @method init
     *
     */
    var start = function() {
        var touch_move_event  = 'TOUCH_MOVE';
        var touch_start_event = 'TOUCH_START';
        var tap = 'TAP';
        var orientation_change = 'ORIENTATION_CHANGE';
        var target_selector = 'a[href][data-target]';
        var target_selector_from_aside = 'aside a[href][data-target]';

        lng.Events.init();
        lng.Dom.Event.listener(document, touch_move_event, _iScroll);
        lng.Dom.Event.listener(window, orientation_change, _changeOrientation);
        lng.Dom.Event.live(target_selector_from_aside, touch_start_event, _toggleAside);
        lng.Dom.Event.live(target_selector, tap, _loadTarget);
    };

    var _iScroll = function(event) {
        event.preventDefault();
    };

    var _changeOrientation = function(event) {
        lng.View.Resize.toolbars();
    };

    var _toggleAside = function(event) {
        var link = lng.Dom.query(this);
        var section_id =  _getParentIdOfElement(link);
        lng.View.Aside.toggle(section_id);

        event.preventDefault();
    };

    var _loadTarget = function(event) {
        var link = lng.Dom.query(this);
        _selectTarget(link);

        event.preventDefault();
    };

    var _selectTarget = function(link) {
        var target_type = link.data('target');

        switch(target_type) {
            case 'section':
                var target_id = link.attr('href');
                _goSection(target_id);
                break;

            case 'article':
                _goArticle(link);
                break;

            case 'aside':
                _goAside(link);
                break;
        }
    };

    var _goSection = function(id) {
        if (id === '#back') {
            lng.Router.back();
        } else {
            lng.Router.section(id);
        }
    };

    var _goArticle = function(element) {
        var section_id =  _getParentIdOfElement(element);
        var article_id =  element.attr('href');

        lng.Router.article(section_id, article_id);
    };

    var _goAside = function(element) {
        var section_id = _getParentIdOfElement(element);
        lng.View.Aside.toggle(section_id);
    };

    var _getParentIdOfElement = function(element) {
        var parent_id = '#' + element.parents('section').attr('id');
        return parent_id;
    };

    return {
        start: start
    };

})(LUNGO);

/**
 * Initialize the <section> element
 *
 * @namespace LUNGO.Boot
 * @class Section
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Section = (function(lng, undefined) {

    var SELECTORS = {
        ARTICLE: 'article',
        SECTION: 'section'
    };

    var ACTIVE_CLASS = 'current';

    /**
     * Initializes all <section>s of the project
     *
     * @method init
     */
    var start = function() {
        var sections = lng.Dom.query(SELECTORS.SECTION);

        _initFirstSection(sections);
        _initAllSections(sections);
        _initAllAsides();

        lng.View.Resize.toolbars();
    };

    var _initFirstSection = function(sections) {
        var first_section = sections.first();
        var first_section_id = '#' + first_section.attr('id');

        first_section.addClass(ACTIVE_CLASS);
        lng.Router.History.add(first_section_id);
    };

    var _initAllSections = function(sections) {
        for (var i = 0, len = sections.length; i < len; i++) {
            var section = lng.Dom.query(sections[i]);
            _initFirstArticle(section);
        }
    };

    var _initFirstArticle = function(section) {
        section.children(SELECTORS.ARTICLE).first().addClass(ACTIVE_CLASS);
    };

    var _initAllAsides = function() {
        lng.Dom.query('aside').addClass('show');
    };

    return {
        start: start
    };

})(LUNGO);