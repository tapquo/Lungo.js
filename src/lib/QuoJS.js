/*!
 * QuoJS 1.0.5 ~ Copyright (c) 2011, 2012 Javi Jiménez Villar (@soyjavi)
 * http://quojs.tapquo.com
 * Released under MIT license, https://raw.github.com/soyjavi/QuoJS/master/LICENSE.txt
 */

var Quo = (function() {

    var EMPTY_ARRAY = [];

    function Q(dom, selector) {
        dom = dom || EMPTY_ARRAY;
        dom.__proto__ = Q.prototype;
        dom.selector = selector || '';

        return dom;
    };

    /**
     * ?
     */
    function $$(selector) {
        if (!selector) {
          return Q();
        } else {
            var domain_selector = $$.getDomainSelector(selector);
            return Q(domain_selector, selector);
        }
    };

    /**
     * ?
     */
    $$.extend = function(target) {
        Array.prototype.slice.call(arguments, 1).forEach(function(source) {
          for (key in source) target[key] = source[key];
        })
        return target;
    };

    Q.prototype = $$.fn = {};

    return $$;
})();

window.Quo = Quo;
'$$' in window || (window.$$ = Quo);

(function($$) {

    var OBJ_PROTO   = Object.prototype;
    var EMPTY_ARRAY = [];

    /**
     * Determine the internal JavaScript [[Class]] of an object.
     *
     * @param {object} obj to get the real type of itself.
     * @return {string} with the internal JavaScript [[Class]] of itself.
     */
    $$.toType = function(obj) {
        return OBJ_PROTO.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    };

    /**
     * ?
     */
    $$.isOwnProperty = function(object, property) {
        return OBJ_PROTO.hasOwnProperty.call(object, property);
    };

    /**
     * ?
     */
    $$.getDomainSelector = function(selector) {
        var domain = null;
        var elementTypes = [1, 9, 11];

        var type = $$.toType(selector);
        if (type === 'array') {
            domain = _compact(selector);
        } else if (type === 'string') {
            domain = $$.query(document, selector);
        } else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window) {
            domain = [selector];
            selector = null;
        }

        return domain;
    };

    /**
     * ?
     */
    $$.map = function(elements, callback) {
        //@TODO: Refactor!!!
        var values = [];
        var i;
        var key;

        if ($$.toType(elements) === 'array') {
            for (i = 0; i < elements.length; i++) {
                var value = callback(elements[i], i);
                if (value != null) values.push(value);
            }
        } else {
            for (key in elements) {
                value = callback(elements[key], key);
                if (value != null) values.push(value);
            }
        }
        return _flatten(values);
    };

    /**
     * ?
     */
    $$.each = function(elements, callback) {
        var i, key;
        if ($$.toType(elements) === 'array')
            for(i = 0; i < elements.length; i++) {
                if(callback.call(elements[i], i, elements[i]) === false) return elements;
            }
        else
            for(key in elements) {
                if(callback.call(elements[key], key, elements[key]) === false) return elements;
            }
        return elements;
    };

    /**
     * ?
     */
     $$.mix = function() {
        var child = {};
        for (var arg = 0, len = arguments.length; arg < len; arg++) {
            var argument = arguments[arg];
            for (var prop in argument) {
                if ($$.isOwnProperty(argument, prop) && argument[prop] !== undefined) {
                    child[prop] = argument[prop];
                }
            }
        }
        return child;
    };

    /**
     * ?
     */
    $$.fn.forEach = EMPTY_ARRAY.forEach;

    /**
     * ?
     */
    $$.fn.indexOf = EMPTY_ARRAY.indexOf;

    /**
     * ?
     */
    $$.fn.map = function(fn){
        return $$.map(this, function(el, i){ return fn.call(el, i, el) });
    };

    /**
     * ?
     */
     /*
    $$.fn.slice = function(){
        return $$(slice.apply(this, arguments));
    };
    */

    /**
     * ?
     */
    $$.fn.instance = function(property) {
        return this.map(function() {
            return this[property];
        });
    };

    /**
     * ?
     */
    $$.fn.filter = function(selector) {
        return $$([].filter.call(this, function(element) {
            return element.parentNode && $$.query(element.parentNode, selector).indexOf(element) >= 0;
        }));
    };

    function _compact(array) {
        return array.filter(function(item) {
            return item !== undefined && item !== null
        });
    }

    function _flatten(array) {
        return array.length > 0 ? [].concat.apply([], array) : array
    }

})(Quo);

(function($$) {

    /**
     * ?
     */
    $$.fn.attr = function(name, value) {
        if ($$.toType(name) === 'string' && value === undefined) {
            return this[0].getAttribute(name);
        } else {
            return this.each(function() {
                this.setAttribute(name, value);
            });
        }
    };

    /**
     * ?
     */
    $$.fn.data = function(name, value) {
        return this.attr('data-' + name, value);
    };

    /**
     * ?
     */
    $$.fn.val = function(value) {
        if ($$.toType(value) === 'string') {
            return this.each(function() {
                this.value = value;
            });
        } else {
            return (this.length > 0 ? this[0].value : null)
        }
    };

    /**
     * ?
     */
    $$.fn.show = function() {
        return this.style("display", "block")
    };

    /**
     * ?
     */
    $$.fn.hide = function() {
        return this.style("display", "none")
    };

    /**
     * ?
     */
    $$.fn.height = function() {
        var offset = this.offset();
        return offset.height;
    };

    /**
     * ?
     */
    $$.fn.width = function() {
        var offset = this.offset();
        return offset.width;
    };

    /**
     * ?
     */
    $$.fn.offset = function() {
        var bounding = this[0].getBoundingClientRect();

        return {
            left: bounding.left + window.pageXOffset,
            top: bounding.top + window.pageYOffset,
            width: bounding.width,
            height: bounding.height
        };
    };

    /**
     * ?
     */
    $$.fn.remove = function() {
        return this.each(function() {
            if (this.parentNode != null) {
                this.parentNode.removeChild(this);
            }
        });
    };

})(Quo);

(function($$) {

    var IS_WEBKIT = /WebKit\/([\d.]+)/;
    var SUPPORTED_OS = {
        android: /(Android)\s+([\d.]+)/,
        ipad: /(iPad).*OS\s([\d_]+)/,
        iphone: /(iPhone\sOS)\s([\d_]+)/,
        blackberry: /(BlackBerry).*Version\/([\d.]+)/,
        webos: /(webOS|hpwOS)[\s\/]([\d.]+)/
    };
    var CURRENT_ENVIRONMENT = null;

    /**
     * ?
     */
    $$.isMobile = function() {
        CURRENT_ENVIRONMENT = CURRENT_ENVIRONMENT || _detectEnvironment();

        return CURRENT_ENVIRONMENT.isMobile;
    };

    /**
     * ?
     */
    $$.environment = function() {
        CURRENT_ENVIRONMENT = CURRENT_ENVIRONMENT || _detectEnvironment();

        return CURRENT_ENVIRONMENT;
    };

    /**
     * ?
     */
    $$.isOnline = function() {
        return (navigator.onLine);
    };

    var _detectEnvironment = function() {
        var user_agent = navigator.userAgent;
        var environment = {};

        environment.browser = _detectBrowser(user_agent);
        environment.os = _detectOS(user_agent);
        environment.isMobile = (environment.os) ? true : false;
        environment.screen = _detectScreen();

        return environment;
    }

    var _detectBrowser = function(user_agent) {
        var is_webkit = user_agent.match(IS_WEBKIT);

        return (is_webkit) ? is_webkit[0]: user_agent;
    }

    var _detectOS = function(user_agent) {
        var detected_os;

        for (os in SUPPORTED_OS) {
            var supported = user_agent.match(SUPPORTED_OS[os]);

            if (supported) {
                detected_os = {
                    name: (os === 'iphone' || os === 'ipad') ? 'ios' : os,
                    version: supported[2].replace('_', '.')
                }
                break;
            }
        }

        return detected_os;
    }

    var _detectScreen = function() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

})(Quo);

(function($$) {

    /**
     * ?
     */
    $$.fn.text = function(value) {
        return (!value) ?
            this[0].textContent
            :
            this.each(function() {
                this.textContent = value;
            });
    };

    /**
     * ?
     */
    $$.fn.html = function(value) {
        return ($$.toType(value) === 'string') ?
            this.each(function() {
                this.innerHTML = value;
            })
            :
            this[0].innerHTML;
    };

    /**
     * ?
     */
    $$.fn.append = function(value) {
        return this.each(function() {
            if ($$.toType(value) === 'string') {
                if (value) {
                    var div = document.createElement();
                    div.innerHTML = value;
                    this.appendChild(div.firstChild);
                }
            } else {
                this.insertBefore(value);
            }
        });
    };

    /**
     * ?
     */
    $$.fn.prepend = function(value) {
        return this.each(function() {
            if ($$.toType(value) === 'string') {
                this.innerHTML = value + this.innerHTML;
            } else {
                var parent = this.parentNode;
                parent.insertBefore(value, parent.firstChild);
            }
        });
    };

    /**
     * ?
     */
    $$.fn.empty = function() {
        return this.each(function() {
            this.innerHTML = null;
        });
    };

})(Quo);

(function($$){

    var PARENT_NODE = 'parentNode';

    /**
     * ?
     */
    $$.query = function(domain, selector) {
        var dom_elements = document.querySelectorAll(selector);
        dom_elements = Array.prototype.slice.call(dom_elements);

        return dom_elements;
    };

    /**
     * ?
     */
    $$.fn.parent = function(selector) {
        var ancestors = (selector) ? _findAncestors(this) : this.instance(PARENT_NODE);
        return _filtered(ancestors, selector);
    };

    /**
     * ?
     */
    $$.fn.siblings = function(selector) {
        var siblings_elements = this.map(function(index, element) {
            return Array.prototype.slice.call(element.parentNode.children).filter(function(child) {
                return child !== element
            });
        });

        return _filtered(siblings_elements, selector);
    };

    /**
     * ?
     */
    $$.fn.children = function(selector) {
        var children_elements = this.map(function() {
            return Array.prototype.slice.call(this.children);
        });

        return _filtered(children_elements, selector);
    };

    /**
     * ?
     */
    $$.fn.get = function(index) {
        return index === undefined ? this : this[index]
    };

    /**
     * ?
     */
    $$.fn.first = function() {
        return $$(this[0]);
    };

    /**
     * ?
     */
    $$.fn.last = function() {
        var last_element_index = this.length - 1;
        return $$(this[last_element_index]);
    };

    /**
     * ?
     */
    $$.fn.closest = function(selector, context) {
        var node = this[0];
        var candidates = $$(selector);

        if (!candidates.length) node = null;
        while (node && candidates.indexOf(node) < 0) {
            node = node !== context && node !== document && node.parentNode;
        }

        return $$(node);
    };

    /**
     * ?
     */
    $$.fn.each = function(callback) {
        this.forEach( function(el, idx) {
            callback.call(el, idx, el)
        });
        return this;
    };

    var _findAncestors = function(nodes) {
        var ancestors = []
        while (nodes.length > 0) {
            nodes = $$.map(nodes, function(node) {
                if ((node = node.parentNode) && node !== document && ancestors.indexOf(node) < 0) {
                    ancestors.push(node);
                    return node;
                }
            });
        }

        return ancestors;
    }

    var _filtered = function(nodes, selector) {
        return (selector === undefined) ? $$(nodes) : $$(nodes).filter(selector);
    }

})(Quo);

(function($){

    /**
     * ?
     */
    $.fn.addClass = function(name) {
        return this.each(function() {
            if (!_existsClass(name, this.className)) {
                this.className += ' ' + name;
            }
        });
    };

    /**
     * ?
     */
    $.fn.removeClass = function(name) {
        return this.each(function() {
            if (_existsClass(name, this.className)) {
                this.className = this.className.replace(name, ' ').replace(/\s+/gi, ' ');
            }
        });
    };

    /**
     * ?
     */
    $.fn.toggleClass = function(name) {
        return this.each(function() {
            if (_existsClass(name, this.className)) {
                this.className = this.className.replace(name, ' ');
            } else {
                this.className += ' ' + name;
            }
        });
    };

    /**
     * ?
     */
    $.fn.hasClass = function(name) {
        return _existsClass(name, this[0].className);
    }

    /**
     * ?
     */
    $.fn.style = function(property, value) {
        return (!value) ?
            this[0].style[property] || _computedStyle(this[0], property)
            :
            this.each(function() {
                this.style[property] = value;
            });
    };

    function _existsClass(name, className) {
        var classes = className.split(/\s+/g);
        return (classes.indexOf(name) >= 0);
    }

    function _computedStyle(element, property) {
        return document.defaultView.getComputedStyle(element, '')[property];
    }

})(Quo);

(function($$) {

    var DEFAULT = { TYPE: 'GET',  MIME: 'json' };
    var MIME_TYPES = {
        script: 'text/javascript, application/javascript',
        json:   'application/json',
        xml:    'application/xml, text/xml',
        html:   'text/html',
        text:   'text/plain'
    };
    var JSONP_ID = 0;

    /**
     * ?
     */
    $$.ajaxSettings = {
        type: DEFAULT.TYPE,
        async: true,
        success: {},
        error: {},
        context: null,
        dataType: DEFAULT.MIME,
        headers: {},
        xhr: function () {
            return new window.XMLHttpRequest();
        },
        crossDomain: false,
        timeout: 0
    };

    /**
     * ?
     */
    $$.ajax = function(options) {
        var settings = $$.mix($$.ajaxSettings, options);

        if (_isJsonP(settings.url)) return $$.jsonp(settings);

        var xhr = settings.xhr();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                clearTimeout(abortTimeout);
                _xhrStatus(xhr, settings);
            }
        }

        xhr.open(settings.type, settings.url, settings.async);

        _xhrHeaders(xhr, settings);

        if (settings.timeout > 0) {
            var abortTimeout = setTimeout(function() {
                _xhrTimeout(xhr, settings);
            }, settings.timeout);
        }

        xhr.send(settings.data);

        return (settings.async) ? xhr : _parseResponse(xhr, settings);
    };

    /**
     * ?
     */
    $$.jsonp = function(settings) {
        var callbackName = 'jsonp' + (++JSONP_ID);
        var script = document.createElement('script');
        var xhr = {
            abort: function() {
                $$(script).remove();
                if (callbackName in window) window[callbackName] = {};
            }
        };
        var abortTimeout;

        window[callbackName] = function(response) {
            clearTimeout(abortTimeout);
            $$(script).remove();
            delete window[callbackName];

            _xhrSuccess(response, xhr, settings);
        };

        script.src = settings.url.replace(/=\?/, '=' + callbackName);
        $$('head').append(script);

        if (settings.timeout > 0) {
            abortTimeout = setTimeout(function() {
                _xhrTimeout(xhr, settings);
            }, settings.timeout);
        }

        return xhr;
    };

    /**
     * ?
     */
    $$.get = function(url, data, success, dataType) {
        url += $$.serializeParameters(data);

        return $$.ajax({
            url: url,
            success: success,
            dataType: dataType
        });
    };

    /**
     * ?
     */
    $$.post = function(url, data, success, dataType) {
        return $$.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: success,
            dataType: dataType,
            contentType: 'application/x-www-form-urlencoded'
        });
    };

    /**
     * ?
     */
    $$.json = function(url, data, success) {
        url += $$.serializeParameters(data);

        return $$.ajax({
            url: url,
            success: success,
            dataType: DEFAULT.MIME
        });
    };

    /**
     * ?
     */
    $$.serializeParameters = function(parameters) {
        var serialize = '?';
        for (var parameter in parameters) {
            if (parameters.hasOwnProperty(parameter)) {
                if (serialize !== '?') serialize += '&';
                serialize += parameter + '=' + parameters[parameter];
            }
        }

        return (serialize === '?') ? '' : serialize;
    };

    function _xhrStatus(xhr, settings) {
        if (xhr.status === 200 || xhr.status === 0) {
            if (settings.async) {
                var response = _parseResponse(xhr, settings);
                _xhrSuccess(response, xhr, settings);
            }
        } else {
            _xhrError('QuoJS » $$.ajax', xhr, settings);
        }
    }

    function _xhrSuccess(response, xhr, settings) {
        settings.success.call(settings.context, response, xhr);
    }

    function _xhrError(type, xhr, settings) {
        settings.error.call(settings.context, type, xhr, settings);
    }

    function _xhrHeaders(xhr, settings) {
        if (settings.contentType) settings.headers['Content-Type'] = settings.contentType;
        if (settings.dataType) settings.headers['Accept'] = MIME_TYPES[settings.dataType];

        for (header in settings.headers) {
            xhr.setRequestHeader(header, settings.headers[header]);
        }
    }

    function _xhrTimeout(xhr, settings) {
        xhr.onreadystatechange = {};
        xhr.abort();
        _xhrError('QuoJS » $$.ajax : timeout exceeded', xhr, settings);
    }

    function _parseResponse(xhr, settings) {
        var response = xhr.responseText;

        if (response) {
            if (settings.dataType === DEFAULT.MIME) {
                try {
                    response = JSON.parse(response);
                }
                catch (error) {
                    response = error;
                    _xhrError('Parse Error', xhr, settings);
                }
            } else if (settings.dataType === 'xml') {
                response = xhr.responseXML;
            }
        }

        return response;
    }

    var _isJsonP = function(url) {
        return (/=\?/.test(url));
    }

})(Quo);

(function($$) {

    var SHORTCUTS = [
        'touch',
        'tap' ];
    var SHORTCUTS_EVENTS = {
        touch: 'touchstart',
        tap: 'tap' };
    var READY_EXPRESSION = /complete|loaded|interactive/;

    /**
     * ?
     */
    SHORTCUTS.forEach(function(event) {
        $$.fn[event] = function(callback) {
            $$(document.body).delegate(this.selector, SHORTCUTS_EVENTS[event], callback);
            return this;
        };
    });

    /**
     * ?
     */
    $$.fn.on = function(event, selector, callback) {
        return (selector === undefined || $$.toType(selector) === 'function') ?
            this.bind(event, selector)
            :
            this.delegate(selector, event, callback);
    };

    /**
     * ?
     */
    $$.fn.off = function(event, selector, callback){
        return (selector === undefined || $$.toType(selector) === 'function') ?
            this.unbind(event, selector)
            :
            this.undelegate(selector, event, callback);
    };

    /**
     * ?
     */
    $$.fn.ready = function(callback) {
        if (READY_EXPRESSION.test(document.readyState)) {
            callback($$);
        }
        else {
            document.addEventListener('DOMContentLoaded', function(){ callback($$) }, false);
        }
        return this;
    };

})(Quo);

(function($$) {

    var ELEMENT_ID = 1;
    var HANDLERS = {};
    var EVENT_METHODS = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped' };
    var EVENTS_DESKTOP = {
        touchstart : 'mousedown',
        touchmove: 'mousemove',
        touchend: 'mouseup',
        tap: 'click',
        doubletap: 'dblclick',
        orientationchange: 'resize' };

    /**
     * ?
     */
    $$.Event = function(type, props) {
        var event = document.createEvent('Events');
        event.initEvent(type, true, true, null, null, null, null, null, null, null, null, null, null, null, null);

        return event;
    };

    /**
     * ?
     */
    $$.fn.bind = function(event, callback) {
        return this.each(function() {
            _subscribe(this, event, callback);
        });
    };

    /**
     * ?
     */
    $$.fn.unbind = function(event, callback){
        return this.each(function() {
            _unsubscribe(this, event, callback);
        });
    };

    /**
     * ?
     */
    $$.fn.delegate = function(selector, event, callback) {
        return this.each(function(i, element) {
            _subscribe(element, event, callback, selector, function(fn) {
                return function(e) {
                    var match = $$(e.target).closest(selector, element).get(0);
                    if (match) {
                        var evt = $$.extend(_createProxy(e), {
                            currentTarget: match,
                            liveFired: element
                        });
                        return fn.apply(match, [evt].concat([].slice.call(arguments, 1)));
                    }
                }
            });
        });
    };

    /**
     * ?
     */
    $$.fn.undelegate = function(selector, event, callback){
        return this.each(function(){
            _unsubscribe(this, event, callback, selector);
        });
    };

    /**
     * ?
     */
    $$.fn.trigger = function(event) {
        if ($$.toType(event) === 'string') event = $$.Event(event);
        return this.each(function() {
            this.dispatchEvent(event);
        });
    };

    function _subscribe(element, event, callback, selector, delegate_callback) {
        event = _environmentEvent(event);

        var element_id = _getElementId(element);
        var element_handlers = HANDLERS[element_id] || (HANDLERS[element_id] = []);
        var delegate = delegate_callback && delegate_callback(callback, event);

        var handler = {
            event: event,
            callback: callback,
            selector: selector,
            proxy: _createProxyCallback(delegate, callback, element),
            delegate: delegate,
            index: element_handlers.length
        };
        element_handlers.push(handler);

        element.addEventListener(handler.event, handler.proxy, false);
    }

    function _unsubscribe(element, event, callback, selector) {
        event = _environmentEvent(event);

        var element_id = _getElementId(element);
        _findHandlers(element_id, event, callback, selector).forEach(function(handler) {
            delete HANDLERS[element_id][handler.index];
            element.removeEventListener(handler.event, handler.proxy, false);
        });
    }

    function _getElementId(element) {
        return element._id || (element._id = ELEMENT_ID++);
    }

    function _environmentEvent(event) {
        var environment_event = ($$.isMobile()) ? event : EVENTS_DESKTOP[event];

        return (environment_event) || event;
    }

    function _createProxyCallback(delegate, callback, element) {
        var callback = delegate || callback;

        var proxy = function (event) {
            var result = callback.apply(element, [event].concat(event.data));
            if (result === false) {
                event.preventDefault();
            }
            return result;
        };

        return proxy;
    }

    function _findHandlers(element_id, event, fn, selector) {
        return (HANDLERS[element_id] || []).filter(function(handler) {
            return handler
            && (!event  || handler.event == event)
            && (!fn       || handler.fn == fn)
            && (!selector || handler.selector == selector);
        });
    }

    function _createProxy(event) {
        var proxy = $$.extend({originalEvent: event}, event);

        $$.each(EVENT_METHODS, function(name, method) {
            proxy[name] = function() {
                this[method] = function(){ return true };
                return event[name].apply(event, arguments);
            };
            proxy[method] = function() { return false };
        })
        return proxy;
    }

})(Quo);

(function($$) {

    var TOUCH = {};
    var TOUCH_TIMEOUT;
    var LONGTAP_DELAY = 750;
    var GESTURES = ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'longTap'];

    /**
     * ?
     */
    GESTURES.forEach(function(event) {
        $$.fn[event] = function(callback) {
            return this.on(event, callback);
        };
    });

    /**
     * ?
     */
    $$(document).ready(function() {
        _listenTouches();
    });

    function _listenTouches() {
        var environment = $$(document.body);

        environment.bind('touchstart', _onTouchStart);
        environment.bind('touchmove', _onTouchMove);
        environment.bind('touchend', _onTouchEnd);
        environment.bind('touchcancel', _onTouchCancel);
    }

    function _onTouchStart(event) {
        var now = Date.now();
        var delta = now - (TOUCH.last || now);
        var first_touch = ($$.isMobile()) ? event.touches[0] : event;

        TOUCH_TIMEOUT && clearTimeout(TOUCH_TIMEOUT);
        TOUCH = {
            el: $$(_parentIfText(first_touch.target)),
            x1: first_touch.pageX,
            y1: first_touch.pageY,
            isDoubleTap: (delta > 0 && delta <= 250) ? true : false,
            last: now
        }
        setTimeout(_longTap, LONGTAP_DELAY);
    }

    function _onTouchMove(event) {
        var move_touch = ($$.isMobile()) ? event.touches[0] : event;
        TOUCH.x2 = move_touch.pageX;
        TOUCH.y2 = move_touch.pageY;
    }

    function _onTouchEnd(event) {
        if (TOUCH.isDoubleTap) {
            TOUCH.el.trigger('doubleTap');
            TOUCH = {};
        } else if (TOUCH.x2 > 0 || TOUCH.y2 > 0) {
            (Math.abs(TOUCH.x1 - TOUCH.x2) > 30 || Math.abs(TOUCH.y1 - TOUCH.y2) > 30)  &&
            TOUCH.el.trigger('swipe') &&
            TOUCH.el.trigger('swipe' + (_swipeDirection(TOUCH.x1, TOUCH.x2, TOUCH.y1, TOUCH.y2)));

            TOUCH.x1 = TOUCH.x2 = TOUCH.y1 = TOUCH.y2 = TOUCH.last = 0;
            TOUCH = {};
        } else {
            if (TOUCH.el !== undefined) {
                TOUCH.el.trigger('tap');
            }
            TOUCH_TIMEOUT = setTimeout(function(){
                TOUCH_TIMEOUT = null;
                TOUCH = {};
            }, 250);
        }
    }

    function _onTouchCancel(event) {
        TOUCH = {};
        clearTimeout(TOUCH_TIMEOUT);
    }

    function _parentIfText(node) {
        return 'tagName' in node ? node : node.parentNode;
    }

    function _swipeDirection(x1, x2, y1, y2) {
        var xDelta = Math.abs(x1 - x2);
        var yDelta = Math.abs(y1 - y2);

        if (xDelta >= yDelta) {
            return (x1 - x2 > 0 ? 'Left' : 'Right');
        } else {
            return (y1 - y2 > 0 ? 'Up' : 'Down');
        }
    }

    function _longTap() {
        if (TOUCH.last && (Date.now() - TOUCH.last >= LONGTAP_DELAY)) {
            TOUCH.el.trigger('longTap');
            TOUCH = {};
        }
    }

})(Quo);