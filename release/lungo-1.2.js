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
 * @copyright 2011-2012 TapQuo Inc (c)
 * @license   http://www.github.com/tapquo/lungo/blob/master/LICENSE.txt
 * @version   1.2
 * @link      https://github.com/TapQuo/Lungo.js
 *
 * @author   Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author   Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

var LUNGO = LUNGO || {};

LUNGO.VERSION = '1.2';

LUNGO.Attributes || (LUNGO.Attributes = {});
LUNGO.Data || (LUNGO.Data = {});
LUNGO.Sugar || (LUNGO.Sugar = {});
LUNGO.View || (LUNGO.View = {});
LUNGO.Device || (LUNGO.Device = {});
LUNGO.ready || (LUNGO.ready = Quo().ready);

/**
 * Object with data-attributes (HTML5) with a special <markup>
 *
 * @namespace LUNGO
 * @class Constants
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Constants = {

    ELEMENT: {
        SECTION: 'section',
        ARTICLE: 'article',
        ASIDE: 'aside',
        BODY: 'body',
        DIV: 'div',
        LIST: '<ul></ul>',
        SPAN: '<span>&nbsp;</span>'
    },

    CLASS: {
        ACTIVE: 'active',
        ASIDE: 'aside',
        SHOW: 'show',
        SHOW_REVOKE: 'show-revoke',
        HIDE: 'hide',
        HIDE_REVOKE: 'hide-revoke',
        CURRENT: 'current',
        RIGHT: 'onright',
        LEFT: 'onleft',
        HORIZONTAL: 'horizontal',
        FLOW: 'flow'
    },

    TRIGGER: {
        LOAD: 'load',
        UNLOAD: 'unload'
    },

    ATTRIBUTE: {
        ID: 'id',
        HREF: 'href',
        TITLE: 'title',
        ARTICLE: 'article',
        CLASS: 'class',
        WIDTH: 'width',
        HEIGHT: 'height',
        PIXEL: 'px',
        PERCENT: '%',
        TARGET: 'target',
        FIRST: 'first',
        LAST: 'last',
        EMPTY: ''
    },

    BINDING: {
        START: '{{',
        END: '}}',
        KEY: 'value',
        PARSER: /\{{.*?\}}/gi
    },

    ERROR: {
        CREATE_SCROLL: 'ERROR: Impossible to create a <scroll> without ID.',
        BINDING_DATA_TYPE: 'ERROR: Processing the type of binding data.',
        BINDING_TEMPLATE: 'ERROR: Binding Template not exists >> ',
        BINDING_LIST: 'ERROR: Processing parameters for list binding.',
        DATABASE: 'ERROR: Connecting to Data.Sql.',
        ROUTER: 'ERROR: The target does not exists >>',
        LOADING_RESOURCE: 'ERROR: Loading resource.'
    }

};

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
 * Contains all the common functions used in Lungo.
 *
 * @namespace LUNGO
 * @class Core
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Core = (function(lng, $$, undefined) {

    var ARRAY_PROTO = Array.prototype;
    var HASHTAG_CHARACTER = '#';

    /**
     * Console system to display messages when you are in debug mode.
     *
     * @method log
     *
     * @param {number} Severity based in (1)Log, (2)Warn, (>2)Error
     * @param {string} Message to show in console
     */
    var log = function(severity, message) {
        if (!lng.Core.isMobile()) {
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
        return $$.isOwnProperty(object, property);
    };

    /**
     * Determine the internal JavaScript [[Class]] of an object.
     *
     * @param {object} obj to get the real type of itself.
     * @return {string} with the internal JavaScript [[Class]] of itself.
     */
    var toType = function(obj) {
        return $$.toType(obj);
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
     * Determine if the current environment is a mobile environment
     *
     * @method isMobile
     *
     * @return {boolean} true if is mobile environment, false if not.
     */
    var isMobile = function() {
        return $$.isMobile();
    };

    /**
     * Returns information of execute environment
     *
     * @method environment
     *
     * @return {object} Environment information
     */
    var environment = function() {
        return $$.environment();
    };

    /**
     * Returns a ordered list of objects by a property
     *
     * @method orderByProperty
     *
     * @param {list} List of objects
     * @param {string} Name of property
     * @param {string} Type of order: asc (ascendent) or desc (descendent)
     * @return {list} Ordered list
     */
    var orderByProperty = function(data, property, order) {
        var order_operator = (order === 'desc') ? -1 : 1;

        return data.sort(function(a, b) {
            return (a[property] < b[property]) ? - order_operator :
                (a[property] > b[property])
                ?
                order_operator : 0;
            }
        );
    };

    /**
     * Returns a correct URL using hashtag character
     *
     * @method parseUrl
     *
     * @param {string} Url
     * @return {string} Url parsed
     */
    var parseUrl = function(href) {
        var href_hashtag = href.lastIndexOf(HASHTAG_CHARACTER);
        if (href_hashtag > 0) {
            href = href.substring(href_hashtag);
        } else if (href_hashtag === -1) {
            href = HASHTAG_CHARACTER + href ;
        }
        return href;
    };

    /**
     * Returns a Object in a list by a property value
     *
     * @method objectInListByProperty
     *
     * @param {list} List of objects
     * @param {string} Name of property
     * @param {var} Value for comparision
     * @return {object} Instance of object founded (if exists)
     */
     var findByProperty = function(list, property, value) {
        var search = null;

        for (var i = 0, len = list.length; i < len; i++) {
            var element = list[i];

            if (element[property] == value) {
                search = element;
                break;
            }
        };

        return search;
    };

    return {
        log: log,
        execute: execute,
        bind: bind,
        mix: mix,
        isOwnProperty: isOwnProperty,
        toType: toType,
        toArray: toArray,
        isMobile: isMobile,
        environment: environment,
        orderByProperty: orderByProperty,
        parseUrl: parseUrl,
        findByProperty: findByProperty
    };

})(LUNGO, Quo);

/**
 * LungoJS Dom Handler
 *
 * @namespace LUNGO
 * @class Dom
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

/**
     * Add an event listener
     *
     * @method dom
     *
     * @param  {string} <Markup> element selector
     * @return {Object} QuoJS <element> instance
*/
LUNGO.dom = function(selector) {
    return $$(selector);
};

/**
 * External Data & Services Manager
 *
 * @namespace LUNGO
 * @class Service
 * @requires QuoJS
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Service = (function(lng, $$, undefined) {

    var URL_CACHE_INDEX_KEY = 'lungojs_service_cache';
    var DATE_PATTERN = {
        MINUTE: 'minute',
        HOUR: 'hour',
        DAY: 'day'
    };

    /**
     * Load data from the server using a HTTP GET request.
     *
     * @method get
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} Callback function after the request [OPTIONAL]
     * @param  {string} Mime-Type: json, xml, html, or text [OPTIONAL]
     */
    var get = function(url, data, success, dataType) {
        return $$.get(url, data, success, dataType);
    };

    /**
     * Load data from the server using a HTTP POST request.
     *
     * @method post
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} Callback function after the request [OPTIONAL]
     * @param  {string} Mime-Type: json, xml, html, or text [OPTIONAL]
     */
    var post = function(url, data, success, dataType) {
        return $$.post(url, data, success, dataType);
    };

    /**
     * Load data from the server using a HTTP GET request.
     *
     * @method json
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {Function} [OPTIONAL] Callback function after the request
     */
    var json = function(url, data, success) {
        return $$.json(url, data, success);
    };

    /**
     * Auto-caching system with date pattern.
     *
     * @method cache
     *
     * @param  {string} Containing the URL to which the request is sent
     * @param  {object} A map or string that is sent to the server with the request
     * @param  {string} Date pattern (example: 15 minutes, 1 hour, 3 days)
     * @param  {Function} [OPTIONAL] Callback function after the request
     * @param  {string} Mime-Type: json, xml, html, or text [OPTIONAL]
     */
    var cache = function(url, data, date_pattern, callback, dataType) {
        var url_key = url + $$.serializeParameters(data);

        if (_urlCached(url_key, date_pattern)) {
            var value = lng.Data.Storage.persistent(url_key);
            if (value) {
                return callback.call(callback, value);
            }
        } else {
            return $$.get(url, data, function(result) {
                _saveServiceInCache(url_key, result);
                callback.call(callback, result);
            }, dataType);
        }
    };

    var _urlCached = function(url, date_pattern) {
        var in_cache = false;

        var url_cache_index = lng.Data.Storage.persistent(URL_CACHE_INDEX_KEY);
        if (url_cache_index) {
            var time_between = _calculateTimeSpent(url_cache_index[url]);
            in_cache = _checkIsValidPattern(time_between, date_pattern);
        }

        return in_cache;
    };

    var _calculateTimeSpent = function(url_last_access) {
        var now = new Date().getTime();
        var service_last_access = new Date(url_last_access).getTime();

        return now - service_last_access;
    };

    var _checkIsValidPattern = function(time_between, date_pattern) {
        var pattern = date_pattern.split(' ');
        var diference_time = _calculateDiferenceTime(pattern[1], time_between);

        return (diference_time < pattern[0]) ? true : false;
    };

    var _calculateDiferenceTime = function(pattern_name, time_between) {
        var diference = (time_between / 1000) / 60;

        if (pattern_name.indexOf(DATE_PATTERN.HOUR) >= 0) {
            diference = diference / 60;
        } else if (pattern_name.indexOf(DATE_PATTERN.DAY) >= 0) {
            diference = (diference / 60) / 24;
        }

        return diference;
    };

    var _saveServiceInCache = function(url, result) {
        var service_cache_index = lng.Data.Storage.persistent(URL_CACHE_INDEX_KEY) || {};
        service_cache_index[url] = new Date();

        lng.Data.Storage.persistent(URL_CACHE_INDEX_KEY, service_cache_index);
        lng.Data.Storage.persistent(url, result);
    };

    return {
        get: get,
        post: post,
        json: json,
        cache: cache,
        Settings: $$.ajaxSettings
    };

})(LUNGO, Quo);

/**
 * ?
 *
 * @namespace LUNGO
 * @class Fallback
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Fallback = (function(lng, undefined) {

    var CLASS = lng.Constants.CLASS;

    var androidButtons = function() {
    	environment = lng.Core.environment();
        if (environment.isMobile && environment.os.name === 'android') {
            lng.dom(document.body).on('touchstart', '.button', _addClassActiveToButton);
            lng.dom(document.body).on('touchend', '.button', _removeClassActiveToButton);
        }
    };

    var androidInputs = function(article_id, active) {
        environment = lng.Core.environment();
        if (environment.isMobile && environment.os.name === 'android' && environment.os.version < '4') {
            var selector = article_id + ' input, ' + article_id + ' textarea, ' + article_id + ' select';
            var input_elements = lng.dom(selector);
            for (var i = 0, len = input_elements.length; i < len; i++) {
                (active) ? _enableAndroidInput(input_elements[i]) : _disableAndroidInput(input_elements[i]);
            }
        }
    };

    var positionFixed = function(sections) {
    	environment = lng.Core.environment();
        if (environment.isMobile && environment.os.name === 'ios' && environment.os.version >= '4.2') {
            sections.style('position', 'fixed');
        }
    };

    var _enableAndroidInput = function(input) {
        input.removeAttribute('disabled');
    };

    var _disableAndroidInput = function(input) {
        input.setAttribute('disabled', 'disabled');
    };

    var _addClassActiveToButton = function(element) {
        lng.dom(this).addClass(CLASS.ACTIVE);
    };

    var _removeClassActiveToButton = function(element) {
        lng.dom(this).removeClass(CLASS.ACTIVE);
    };

    return {
    	androidButtons: androidButtons,
        androidInputs: androidInputs,
    	positionFixed: positionFixed
    }

})(LUNGO);

/**
 * Handles the <sections> and <articles> to show
 *
 * @namespace LUNGO
 * @class Router
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Router = (function(lng, undefined) {

    var CLASS = lng.Constants.CLASS;
    var ELEMENT = lng.Constants.ELEMENT;
    var ERROR = lng.Constants.ERROR;
    var TRIGGER = lng.Constants.TRIGGER;

    /**
     * Navigate to a <section>.
     *
     * @method section
     *
     * @param {string} Id of the <section>
     */
    var section = function(section_id) {
        var section_id = lng.Core.parseUrl(section_id);
        var current = _getHistoryCurrent();
        var target = ELEMENT.SECTION + section_id;

        if (_existsTarget(target)) {
            lng.dom(current).removeClass(CLASS.HIDE_REVOKE).removeClass(CLASS.SHOW).addClass(CLASS.HIDE);
            lng.dom(target).removeClass(CLASS.SHOW_REVOKE).addClass(CLASS.SHOW).trigger(TRIGGER.LOAD);

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
        var section_id = lng.Core.parseUrl(section_id);
        var article_id = lng.Core.parseUrl(article_id);
        var target = ELEMENT.SECTION + section_id + ' ' + ELEMENT.ARTICLE + article_id;

        if (_existsTarget(target)) {
            lng.dom(target).trigger(TRIGGER.LOAD);
            lng.View.Article.show(section_id, article_id);
        }
    };

    /**
     * Displays the <aside> in a particular <section>.
     *
     * @method aside
     *
     * @param {string} <section> Id
     * @param {string} <aside> Id
     */
    var aside = function(section_id, aside_id) {
        var section_id = lng.Core.parseUrl(section_id);
        var aside_id = lng.Core.parseUrl(aside_id);
        var target = ELEMENT.ASIDE + aside_id;

        if (_existsTarget(target)) {
            var is_visible = lng.dom(target).hasClass(CLASS.CURRENT);
            if (is_visible) {
                lng.View.Aside.hide(section_id, aside_id);
            } else {
                lng.View.Aside.show(section_id, aside_id);
            }
        }
    };

    /**
     * Return to previous section.
     *
     * @method back
     */
    var back = function() {
        var current_section = ELEMENT.SECTION + _getHistoryCurrent();

        lng.dom(current_section).removeClass(CLASS.SHOW).addClass(CLASS.SHOW_REVOKE).trigger(TRIGGER.UNLOAD);
        lng.Router.History.removeLast();
        lng.dom(_getHistoryCurrent()).removeClass(CLASS.HIDE).addClass(CLASS.HIDE_REVOKE).addClass(CLASS.SHOW);
    };

    var _existsTarget = function(target) {
        var exists = false;

        if (lng.dom(target).length > 0) {
            exists = true;
        } else {
            lng.Core.log(3, ERROR.ROUTER + target);
        }

        return exists;
    };

    var _getHistoryCurrent = function() {
        return lng.Router.History.current();
    };

    return {
        section: section,
        article: article,
        aside: aside,
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

    var ELEMENT = lng.Constants.ELEMENT;
    var CLASS = lng.Constants.CLASS;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var TRIGGER = lng.Constants.TRIGGER;

    var SELECTORS = {
        NAVIGATION_ITEM: 'a[href][data-target="article"]',
        REFERENCE_LINK: ' a[href][data-article]'
    };

    /**
     * ?
     *
     * @method show
     */
    var show = function(section_id, article_id) {
        _toggleNavItems(section_id, article_id);
        showReferenceLinks(section_id, article_id.replace('#', ''));
        _showContainer(section_id, article_id);
    };

    /**
     * ?
     *
     * @method showReferenceLinks
     */
    var showReferenceLinks = function(section_id, article_id) {
        var links = lng.dom(ELEMENT.SECTION + section_id + SELECTORS.REFERENCE_LINK);

        for (var i = 0, len = links.length; i < len; i++) {
            var link = lng.dom(links[i]);
            (link.data(ATTRIBUTE.ARTICLE) === article_id) ? link.show() : link.hide();
        }
    };

    var _toggleNavItems = function(section_id, article_id) {
        var nav_items = lng.dom(section_id + ' ' + SELECTORS.NAVIGATION_ITEM);
        nav_items.removeClass(CLASS.CURRENT);

        for (var i = 0, len = nav_items.length; i < len; i++) {
            var nav_item = lng.dom(nav_items[i]);
            var nav_item_parsed_url = lng.Core.parseUrl(nav_item.attr(ATTRIBUTE.HREF));

            if (nav_item_parsed_url === article_id) {
                nav_item.addClass(CLASS.CURRENT);
                _setTitle(section_id, nav_item);
            }
        }
    };

    var _showContainer = function(section_id, article_id) {
        var section_articles = section_id + ' ' + ELEMENT.ARTICLE + '.' + CLASS.CURRENT;
        var current_active_article_id = '#' + lng.dom(section_articles).attr(ATTRIBUTE.ID);

        lng.dom(section_articles).removeClass(CLASS.CURRENT).trigger(TRIGGER.UNLOAD);
        lng.Fallback.androidInputs(current_active_article_id, false);

        lng.dom(article_id).addClass(CLASS.CURRENT);
        lng.Fallback.androidInputs(article_id, true);
    };

    var _setTitle = function(id, item) {
        var title = item.data(ATTRIBUTE.TITLE);

        if (title) {
            var section_title = id + ' header .title, ' + id + ' footer .title';
            lng.dom(section_title).text(title);
        }
    };

    return {
        show: show,
        showReferenceLinks: showReferenceLinks
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

    var ATTRIBUTE = lng.Constants.ATTRIBUTE;

    /**
     * Sets toolbars width, using total screen width
     *
     * @method toolbars
     */
    var toolbars = function() {
        var toolbar = '.toolbar nav, .groupbar';
        var all_toolbars = lng.dom(toolbar);

        for (var i = 0, len = all_toolbars.length; i < len; i++) {
            var toolbar = lng.dom(all_toolbars[i]);
            var toolbar_children = toolbar.children();
            var toolbar_children_percent = 100 / toolbar.children().length;

            toolbar_children.style(ATTRIBUTE.WIDTH, toolbar_children_percent + ATTRIBUTE.PERCENT);
        }
    };

    return {
        toolbars: toolbars
    };

})(LUNGO);

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

/**
 * Wrapper of the third library iScroll
 *
 * @namespace LUNGO.View
 * @class Scroll
 * @requires iScroll
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Scroll = (function(lng, undefined) {

    var CLASS = lng.Constants.CLASS;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var ERROR = lng.Constants.ERROR;
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
    var CACHE_KEY = 'scrolls';
    var SCROLL_TIMEFRAME = 250;

    /**
     * Creates a new iScroll element.
     *
     * @method init
     *
     * @param {string} Id of the container scroll.
     * @param {object} [OPTIONAL] Properties
     */
    var init = function(id, properties) {
        if (id) {
            _render(id, properties);
        } else {
            lng.Core.log(3, ERROR.CREATE_SCROLL);
        }
    };

    /**
     * Update iScroll element with new <markup> content.
     *
     * @method html
     *
     * @param {string} Id of the container scroll.
     * @param {string} Markup content
     */
    var html = function(id, content) {
        var container = _getContainer(id);
        container.html(content);

        _render(id);
    };

    /**
     * Add <markup> content to iScroll instance
     *
     * @method append
     *
     * @param {string} Id of the container scroll.
     * @param {string} Markup content
     */
    var append = function(id, content) {
        var container = _getContainer(id);
        container.append(content);

        _render(id);
    };

    /**
     * Refresh iScroll instance.
     *
     * @method refresh
     *
     * @param {string} Id of the container scroll.
     * @param {object} [OPTIONAL] Properties
     */
    var refresh = function(id, properties) {
        _render(id, properties);
    };

    /**
     * Removes iScroll instance.
     *
     * @method remove
     *
     * @param {string} Id of the container scroll.
     */
    var remove = function(id) {
        if (lng.Data.Cache.exists(CACHE_KEY) && lng.Data.Cache.get(CACHE_KEY, id)) {
            lng.Data.Cache.get(CACHE_KEY, id).destroy();
            lng.Data.Cache.remove(CACHE_KEY, id);
        }
    };

    /**
     * Scrolls the wrapper contents to the minimum x/y coordinates
     *
     * @method first
     *
     * @param {string} Id of the <section>
     */
    var first = function(id) {
        var scroll = lng.Data.Cache.get(CACHE_KEY);
        if (scroll[id]) {
            scroll[id].scrollTo(0, 0, SCROLL_TIMEFRAME);
        }
    };

    /**
     * Scrolls the wrapper contents to the maximum x/y coordinate
     *
     * @method down
     *
     * @param {string} Id of the <section>
     */
    var last = function(id) {
        var scroll =  lng.Data.Cache.get(CACHE_KEY, id);
        if (scroll) {
            var element = lng.dom('#' + id).first();
            var content_width = 0;
            var content_height = 0;

            if (_isHorizontal(element)) {
                content_width = -(_sizeProperty(element, ATTRIBUTE.WIDTH));
            } else {
                content_height = -(_sizeProperty(element, ATTRIBUTE.HEIGHT));
            }
            scroll.scrollTo(content_width, content_height, SCROLL_TIMEFRAME);
        }
    };

    var _getContainer = function(id) {
        var scroll = lng.dom('#' + id);
        var container = scroll.children().first();

        if (container.length === 0) {
            scroll.html('<div></div>');
            container = scroll.children().first();
        }

        return container;
    };

    var _sizeProperty = function(element, property) {
        var element_content = element.children().first();
        return element_content[property]() - element[property]();
    };

    var _render = function(id, properties) {
        var scroll = lng.dom('#' + id);

        if (_needScroll(scroll, properties)) {
            properties = _mixProperties(scroll, properties);
            _saveScrollInCache(id, properties);
        } else {
            remove(id);
        }
    };

    var _needScroll = function(scroll, properties) {
        var element = scroll[0];
        var is_horizontal = _isHorizontal(lng.dom(element));

        if (is_horizontal) {
            return (element.clientWidth < element.scrollWidth);
        } else {
            return (element.clientHeight < element.scrollHeight);
        }
    };

    var _saveScrollInCache = function(id, properties) {
        _createScrollIndexInCache();

        var scroll = lng.Data.Cache.get(CACHE_KEY);
        if (!scroll[id]) {
            scroll[id] = new iScroll(id, properties);
        } else {
            scroll[id].refresh();
        }
        lng.Data.Cache.set(CACHE_KEY, scroll);
    };

    var _createScrollIndexInCache = function() {
        if (!lng.Data.Cache.exists(CACHE_KEY)) {
            lng.Data.Cache.set(CACHE_KEY, {});
        }
    };

    var _mixProperties = function(scroll, properties) {
        var scroll_type = _isHorizontal(scroll) ? 'hScroll' : 'vScroll';

        properties || (properties = {});
        properties[scroll_type] = true;
        properties = lng.Core.mix(DEFAULT_PROPERTIES, properties);

        return properties;
    };

    var _isHorizontal = function(scroll) {
        return ( scroll.hasClass(CLASS.HORIZONTAL)) ? true : false;
    };

    return {
        init: init,
        remove: remove,
        refresh: refresh,
        html: html,
        append: append,
        first: first,
        last: last
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

    var ELEMENT = lng.Constants.ELEMENT;
    var CLASS = lng.Constants.CLASS;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;

    /**
     * Display an aside element for a particular <section>
     *
     * @method show
     *
     * @param  {string} Section id
     * @param  {string} Aside id
     */
    var show = function(section_id, aside_id) {
        var aside = lng.dom(ELEMENT.ASIDE + aside_id);
        var aside_class = _classFromAside(aside);
        var section = lng.dom(ELEMENT.SECTION + section_id);

        section.addClass(aside_class).addClass(CLASS.ASIDE);
        aside.addClass(CLASS.CURRENT);
    };

    /**
     * Hide an aside element for a particular section
     *
     * @method hide
     *
     * @param  {string} Element query selector
     * @param  {string} Value for counter
     */
    var hide = function(section_id, aside_id) {
        var aside = lng.dom(ELEMENT.ASIDE + aside_id);
        var section = lng.dom(ELEMENT.SECTION + section_id);

        section.removeClass(CLASS.ASIDE).removeClass(CLASS.RIGHT);

        setTimeout(function() {
            var current_aside = ELEMENT.ASIDE + aside_id + '.' + CLASS.CURRENT;
            lng.dom(current_aside).removeClass(CLASS.CURRENT);
        }, 300);
    };

    var _classFromAside = function(aside) {
        var aside_class = aside.attr(ATTRIBUTE.CLASS);
        return aside_class || '';
    };

    return {
        show: show,
        hide: hide
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

    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var BINDING = lng.Constants.BINDING;
    var SELECTORS = {
        BUBBLE: '.bubble.count',
        PROGRESS_VALUE: ' .value',
        PROGRESS_PERCENTAGE: ' .labels span:last-child',
        PROGRESS_DESCRIPTION: ' .labels span:first-child'
    };

    /**
     * Set a counter to the element
     *
     * @method count
     *
     * @param  {string} Element query selector
     * @param  {number} Value for counter
     */
    var count = function(selector, count) {
        var element = lng.dom(selector);

        if (element) {
            if (count > 0) {
                _setBubble(element, count);
            } else {
                element.children(SELECTORS.BUBBLE).remove();
            }
        }
    };

    /**
     * Set a progress to the element
     *
     * @method progress
     *
     * @param  {string}  Element query selector
     * @param  {number}  Percentage
     * @param  {boolean} Show the labels: description and current percentage
     * @param  {string}  Description
     */
    var progress = function(selector, percentage, with_labels, description) {
        var element = lng.dom(selector);

        if (element) {
            percentage += ATTRIBUTE.PERCENT;

            lng.dom(selector + SELECTORS.PROGRESS_VALUE).style(ATTRIBUTE.WIDTH, percentage);

            _setProgressLabel(selector + SELECTORS.PROGRESS_PERCENTAGE, with_labels, percentage);
            _setProgressLabel(selector + SELECTORS.PROGRESS_DESCRIPTION, with_labels, description);
        }
    };

    var _setBubble = function(element, count) {
        var bubbles = element.children(SELECTORS.BUBBLE);
        var total_bubbles = bubbles.length;

        if (total_bubbles > 0) {
            bubbles.html(count);
        } else {
            var count_html = LUNGO.Attributes.Data.Count.html;
            var html_binded = count_html.replace(BINDING.START + BINDING.KEY + BINDING.END, count);

            element.append(html_binded);
        }
    };

    var _setProgressLabel = function(selector, with_labels, attribute) {
        lng.dom(selector).html((with_labels) ? attribute : ATTRIBUTE.EMPTY);
    };

    return {
        count: count,
        progress: progress
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
    Progress: {
        tag: 'progress',
        selector: '*',
        html: '<div class="progress" id="yeal">\
                    <span class="labels"><span></span><span></span></span>\
                    <span class="bar"><span class="value" style="width:{{value}};"><span class="glow"></span></span></span>\
                </div>'
    },
    Label: {
        tag: 'label',
        selector: 'a',
        html: '<abbr>{{value}}</abbr>'
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
        html: '<span class="title">{{value}}</span>'
    },
    Back: {
        tag: 'back',
        selector: 'header, footer',
        html: '<a href="#back" data-target="section" class="onleft button default"><span class="icon {{value}}"></span></a>'
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
            return (_cache[arguments[0]]) ? _cache[arguments[0]][arguments[1]] : undefined;
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

    var ERROR = lng.Constants.ERROR;
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
            lng.Core.log(3, ERROR.DATABASE);
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
     * @param {object} Object (or Array of objects) to insert in table
     */
    var insert = function(table, data, callback) {
        if (lng.Core.toType(data) === 'object') {
            _insertRow(table, data);
        } else {
            for (row in data) {
                _insertRow(table, data[row]);
            }
        }
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

        db.transaction( function(transaction) {
            transaction.executeSql(sql, [], function(transaction, rs) {
                _callbackResponse(callback, rs);
            }, function(transaction, error) {
                transaction.executedQuery = sql;
                _throwError.apply(null, arguments);
            });
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

    var _insertRow = function(table, row) {
        var fields = '';
        var values = '';

        for (var field in row) {
            if (lng.Core.isOwnProperty(row, field)) {
                var value = row[field];
                fields += (fields) ? ', ' + field : field;
                if (values) values += ', ';
                values += (isNaN(value)) ? '"' + value + '"' : value;
            }
        }

        execute('INSERT INTO ' + table + ' (' + fields + ') VALUES (' + values + ')');
    };

    var _throwError = function(transaction, error) {
        lng.Core.log(3, 'lng.Data.Sql >> ' + error.code + ': ' + error.message + ' \n Executed query: ' + transaction.executedQuery);
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

    var STORAGE = {
        PERSISTENT: 'localStorage',
        SESSION: 'sessionStorage'
    };

    /**
     * Wrapper for SessionStorage
     *
     * @method persistent
     *
     * @param {string} Key
     * @param {object} Value
     * @return {string} If no value assigned returns the value of established key
     */
	var persistent = function(key, value) {
        return _handler(STORAGE.PERSISTENT, key, value);
	};

    /**
     * Wrapper for SessionStorage
     *
     * @method session
     *
     * @param {string} Key
     * @param {object} Value
     * @return {string} If no value assigned returns the value of established key
     */
	var session = function(key, value) {
        return _handler(STORAGE.SESSION, key, value);
	};

    var _handler = function(storage, key, value) {
        var storage = window[storage];

        if (value) {
            _saveKey(storage, key, value);
        } else {
            return _getKey(storage, key, value);
        }
    };

    var _saveKey = function(storage, key, value) {
        value = JSON.stringify(value);
        storage.setItem(key, value);
    };

    var _getKey = function(storage, key, value) {
        value = storage.getItem(key);
        return JSON.parse(value);
    };

    return {
    	session: session,
    	persistent: persistent
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
        lng.Boot.Resources.start();
        lng.Boot.Layout.start();
        lng.Boot.Events.start();
        lng.Boot.Data.start();
        lng.Boot.Section.start();
        lng.Boot.Article.start();
        lng.Boot.Stats.start();
    };

})(LUNGO);

/**
 * Load Resources
 *
 * @namespace LUNGO.Boot
 * @class Resources
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Boot.Resources = (function(lng, $$, undefined) {

    var ELEMENT = lng.Constants.ELEMENT;
    var ERROR = lng.Constants.ERROR;

    var RESOURCE = {
        SECTION: 'sections',
        TEMPLATE: 'templates',
        SCRIPT: 'scripts'
    };

    /**
     * Start loading async sections (local & remote)
     *
     * @method start
     *
     */
    var start = function() {
        var resources = lng.App.get('resources');
        for (resource_key in resources) {
            _loadResources(resource_key, resources[resource_key]);
        }
    };

    var _loadResources = function(resource_key, resources, callback) {
        for (index in resources) {
            var url = _parseUrl(resources[index], resource_key);

            try {
                var response = _loadAsyncResource(url);
                _factoryResources(resource_key, response);
            } catch(error) {
                lng.Core.log(3, ERROR.LOADING_RESOURCE + ' ' + error);
            }
        }
    };

    var _parseUrl = function(section_url, folder) {
        return (/http/.test(section_url)) ? section_url : 'app/' + folder + '/' + section_url;
    };

    var _loadAsyncResource = function(url) {
        return $$.ajax({
            url: url,
            async: false,
            dataType: 'html',
            error: function() {
                console.error('[ERROR] Loading url', arguments);
            }
        });
    };

    var _factoryResources = function(resource_key, response) {
        switch(resource_key) {
            case RESOURCE.SECTION:
                _pushSectionInLayout(response);
                break;

            case RESOURCE.TEMPLATE:
                _createTemplate(response);
                break;

            case RESOURCE.SCRIPT:
                break;
        }
    };

    var _pushSectionInLayout = function(section) {
        if (lng.Core.toType(section) === 'string') {
            lng.dom(ELEMENT.BODY).append(section);
        }
    };

    var _createTemplate = function(markup) {
        var div = document.createElement(ELEMENT.DIV);
        div.innerHTML = markup;

        var template_id = lng.dom(div.firstChild).data('template');

        if (template_id) {
            lng.View.Template.create(template_id, markup);
        }
    };

    return {
        start: start
    };

})(LUNGO, Quo);

/**
 * Save in LungoJS.com the use of the service for further ranking
 *
 * @namespace LUNGO.Boot
 * @class Stats
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Stats = (function(lng, undefined) {

    /**
     * Analizing if it's run in Mobile Phone and changing the type of event to subscribe.
     *
     * @method start
     */
    var start = function() {
        if (lng.Core.isMobile()) {
            _saveStats();
        }
    };

    /**
     * Save in LungoJS.com the use of the service for further ranking
     *
     * @method _saveStatsInLungoJS
     */
    var _saveStats = function() {
        lng.Service.post( 'http://www.lungojs.com/stats/', {
            name: lng.App.get('name'),
            version: lng.App.get('version'),
            icon: lng.App.get('icon')
        }, function(response) {});
    };

    return {
        start: start
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

    var ELEMENT = lng.Constants.ELEMENT;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;

    /**
     * Initializes the automatic subscription events by markup of the project.
     *
     * @method init
     *
     */
    var start = function() {
        if (lng.Core.isMobile()) {
            _window = window;
            _document = _window.document;

            _resizeLayout();
        }
    };

    var _resizeLayout = function() {
        if (_window.innerHeight == 356) {
            var _height = 416;

            lng.dom(ELEMENT.BODY).style(ATTRIBUTE.HEIGHT, _height + ATTRIBUTE.PIXEL);
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

            _window.addEventListener('load', function(){
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
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Article = (function(lng, undefined) {

    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var ELEMENT = lng.Constants.ELEMENT;
    var SELECTORS = {
        LIST_IN_ARTICLE: 'article.list, aside.list',
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
        var found_elements = lng.dom(selector);

        for (var i = 0, len = found_elements.length; i < len; i++) {
            var element = lng.dom(found_elements[i]);
            lng.Core.execute(callback, element);
        }
    };

    var _createListElement = function(article) {
        if (article.children().length === 0) {
            var article_id = article.attr(ATTRIBUTE.ID);
            article.append(ELEMENT.LIST);
        }
    };

    var _createScrollElement = function(scroll) {
        var scroll_id = scroll.attr(ATTRIBUTE.ID);
        lng.View.Scroll.init(scroll_id);
    };

    var _createCheckboxElement = function(checkbox) {
        checkbox.append(ELEMENT.SPAN);
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
        var elements = lng.dom(attribute.selector);

        for (var i = 0, len = elements.length; i < len; i++) {
            var element = lng.dom(elements[i]);
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

    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var CLASS = lng.Constants.CLASS;
    var ELEMENT = lng.Constants.ELEMENT;
    var SELECTORS = {
        HREF_TARGET: 'a[href][data-target]',
        HREF_TARGET_FROM_ASIDE: 'aside a[href][data-target]'
    };

    /**
     * Initializes the automatic subscription events by markup of the project.
     *
     * @method init
     *
     */
    var start = function() {
        var touch_move_event  = 'touchmove';
        var resize = 'resize';

        //@ToDo: Error with input type="range"
        //lng.dom(document).on(touch_move_event, _iScroll);
        lng.dom(window).on(resize, _changeOrientation);
        lng.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).tap(_loadTargetFromAside);
        lng.dom(SELECTORS.HREF_TARGET).tap(_loadTarget);

        lng.Fallback.androidButtons();
    };

    var _iScroll = function(event) {
        event.preventDefault();
    };

    var _changeOrientation = function(event) {
        lng.View.Resize.toolbars();
    };

    var _loadTargetFromAside = function(event) {
        var link = lng.dom(this);
        var aside_id = '#' + link.parent(ELEMENT.ASIDE).attr(ATTRIBUTE.ID);
        var section_id = '#' + lng.dom('section.aside, section.current').first().attr(ATTRIBUTE.ID);

        if (link.data(ATTRIBUTE.TARGET) === ELEMENT.ARTICLE) {
            lng.dom(ELEMENT.ASIDE + aside_id + ' ' + SELECTORS.HREF_TARGET).removeClass(CLASS.CURRENT);
            link.addClass(CLASS.CURRENT);
        }
        _hideAsideIfNecesary(section_id, aside_id);

    };

    var _loadTarget = function(event) {
        var link = lng.dom(this);
        _selectTarget(link);

        event.preventDefault();
    };

    var _selectTarget = function(link) {
        var target_type = link.data(ATTRIBUTE.TARGET);

        switch(target_type) {
            case ELEMENT.SECTION:
                var target_id = link.attr(ATTRIBUTE.HREF);
                _goSection(target_id);
                break;

            case ELEMENT.ARTICLE:
                _goArticle(link);
                break;

            case ELEMENT.ASIDE:
                _goAside(link);
                break;
        }
    };

    var _goSection = function(id) {
        id = lng.Core.parseUrl(id);
        if (id === '#back') {
            lng.Router.back();
        } else {
            lng.Router.section(id);
        }
    };

    var _goArticle = function(element) {
        var section_id = lng.Router.History.current();
        var article_id =  element.attr(ATTRIBUTE.HREF);

        lng.Router.article(section_id, article_id);
    };

    var _goAside = function(element) {
        var section_id = lng.Router.History.current();
        var aside_id = element.attr(ATTRIBUTE.HREF);

        lng.Router.aside(section_id, aside_id);
    };

    var _hideAsideIfNecesary = function(section_id, aside_id) {
        if (window.innerWidth < 768) {
            lng.View.Aside.hide(section_id, aside_id);
        }
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
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Section = (function(lng, undefined) {

    var ELEMENT = lng.Constants.ELEMENT;
    var CLASS = lng.Constants.CLASS;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;

    /**
     * Initializes all <section>s of the project
     *
     * @method init
     */
    var start = function() {
        var sections = lng.dom(ELEMENT.SECTION);
        _initFirstSection(sections);
        _initAllSections(sections);

        lng.View.Resize.toolbars();
    };

    var _initFirstSection = function(sections) {
        var first_section = sections.first();
        var first_section_id = '#' + first_section.attr(ATTRIBUTE.ID);

        first_section.addClass(CLASS.CURRENT);
        lng.Router.History.add(first_section_id);
    };

    var _initAllSections = function(sections) {
        lng.Fallback.positionFixed(sections);

        for (var i = 0, len = sections.length; i < len; i++) {
            var section = lng.dom(sections[i]);
            _initArticles(section);
        }
    };

    var _initArticles = function(section) {
        var first_article = section.children(ELEMENT.ARTICLE).first();
        first_article.addClass(CLASS.CURRENT);

        var first_article_id = first_article.attr(ATTRIBUTE.ID);
        var section_id = '#' + section.attr(ATTRIBUTE.ID);
        lng.View.Article.showReferenceLinks(section_id, first_article_id);
    };

    return {
        start: start
    };

})(LUNGO);