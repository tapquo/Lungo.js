/**
 * Creates a instance of Carousel Element
 *
 * @namespace Lungo.Element
 * @class Carousel
 * @version 1.0
 *
 * @author Ignacio Olalde <ina@tapquo.com> || @piniphone
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */


Lungo.Element.Carousel = function(element, callback) {

    var _instance = {
        gestureStarted: false,
        index: 0,
        speed: 300,
        callback: callback,
        container: element,
        element: element.children[0],
        slide: undefined,
        slides: [],
        slides_length: 0,
        width: 0,
        start: {},
        isScrolling: undefined,
        deltaX: 0
    };

    var prev = function(delay) {
        if (_instance.index) _slide(_instance.index-1, _instance.speed);
    };

    var next = function(delay) {
        var index = _instance.index < _instance.slides_length - 1 ? _instance.index + 1 : 0;
        _slide(index, _instance.speed);
    };

    var position = function() {
        return _instance.index;
    };

    var refresh = function() {
        _setup();
    };

    var _setup = function() {
        _instance.slides = _instance.element.children;
        _instance.slides_length = _instance.slides.length;
        if (_instance.slides_length < 2) return null;

        _instance.width = ("getBoundingClientRect" in _instance.container) ?
                            _instance.container.getBoundingClientRect().width :
                            _instance.container.offsetWidth;

        if (!_instance.width) return null;
        _instance.element.style.width = (_instance.slides.length * _instance.width) + 'px';
        var index = _instance.slides.length;
        while (index--) {
            var el = _instance.slides[index];
            el.style.width = _instance.width + 'px';
            el.style.display = 'table-cell';
            el.style.verticalAlign = 'top';
        }
        _slide(_instance.index, 0);
        _instance.container.style.visibility = 'visible';
    };

    var _slide = function(index, duration) {
        var style = _instance.element.style;
        if (duration == undefined) {
            duration = _instance.speed;
        }
        style.webkitTransitionDuration = style.MozTransitionDuration =
        style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration =
        duration + 'ms';
        style.MozTransform = style.webkitTransform = 'translate3d(' + -(index * _instance.width) + 'px,0,0)';
        style.msTransform = style.OTransform = 'translateX(' + -(index * _instance.width) + 'px)';
        _instance.index = index;
    };

    var _handleGestures = function() {
        $$(_instance.element).swiping(function(event) {
            if(!_instance.gestureStarted) _startGesture(event);
            else _moveGesture(event);
        });
        $$(_instance.element).swipe(_handleGestureEnd);
        $$(_instance.element).on('webkitTransitionEnd', _transitionEnd, false);
        $$(_instance.element).on('msTransitionEnd', _transitionEnd, false);
        $$(_instance.element).on('oTransitionEnd', _transitionEnd, false);
        $$(_instance.element).on('transitionend', _transitionEnd, false);
        $$(window).on('resize', _setup, false);
    };

    _startGesture = function(event) {
        _instance.start = {
            pageX: event.currentTouch.x,
            pageY: event.currentTouch.y,
            time: Number(new Date())
        };
        _instance.isScrolling = undefined;
        _instance.deltaX = 0;
        _instance.element.style.MozTransitionDuration = _instance.element.style.webkitTransitionDuration = 0;
        if(typeof event.stopPropagation === "function") event.stopPropagation();
        _instance.gestureStarted = true;
    };

    _moveGesture = function(event) {
        _instance.deltaX = event.currentTouch.x - _instance.start.pageX;
        if ( typeof _instance.isScrolling == 'undefined') {
            _instance.isScrolling = !!( _instance.isScrolling || Math.abs(_instance.deltaX) < Math.abs(event.currentTouch.y - _instance.start.pageY) );
        }
        if (!_instance.isScrolling) {
            event.preventDefault();
            var factor = ((!_instance.index && _instance.deltaX > 0
                    || _instance.index == _instance.slides_length - 1
                    && _instance.deltaX < 0
                    ) ?
                    (Math.abs(_instance.deltaX) / _instance.width + 1)
                    :1);
            _instance.deltaX = _instance.deltaX / factor;
            var pos = (_instance.deltaX - _instance.index * _instance.width);
            _instance.element.style.MozTransform = _instance.element.style.webkitTransform = 'translate3d(' + pos + 'px,0,0)';
            if(typeof event.stopPropagation === "function") event.stopPropagation();
        }
    };

    var _handleGestureEnd = function() {
        if(_instance.gestureStarted) {
            var isValidSlide =
                Number(new Date()) - _instance.start.time < 250
                && Math.abs(_instance.deltaX) > 20
                || Math.abs(_instance.deltaX) > _instance.width/2;
            var isPastBounds =
                !_instance.index && _instance.deltaX > 0
                || _instance.index == _instance.slides_length - 1
                && _instance.deltaX < 0;
            if (!_instance.isScrolling) {
                _slide( _instance.index + ( isValidSlide && !isPastBounds ? (_instance.deltaX < 0 ? 1 : -1) : 0 ), _instance.speed );
            }
            if(typeof event.stopPropagation === "function") event.stopPropagation();
            _instance.gestureStarted = false;
        }
    };

    var _transitionEnd = function(event) {
        if(_instance.callback) {
            _instance.callback.apply(_instance.callback, [_instance.index, _instance.slides[_instance.index]]);
        }
    };

    _setup();
    _handleGestures();

    return {
        prev: prev,
        next: next,
        position: position,
        refresh: refresh
    };
};
