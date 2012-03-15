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