###
Creates a instance of Carousel Element

@namespace Lungo.Element
@class Carousel
@version 1.0

@author Ignacio Olalde <ina@tapquo.com> || @piniphone
@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###


Lungo.Element.Carousel = (element, callback) ->
  _instance =
    index: 0
    speed: 300
    callback: callback
    container: element
    element: element.children[0]
    slide: undefined
    slides: []
    slides_length: 0
    width: 0
    start: {}
    isScrolling: undefined
    deltaX: 0

  prev = (delay) ->
    _slide _instance.index - 1, _instance.speed  if _instance.index

  next = (delay) ->
    if _instance.index < _instance.slides_length - 1
      _slide _instance.index + 1, _instance.speed
    else
      _slide 0, _instance.speed

  position = ->
    _instance.index

  refresh = ->
    _setup()

  _setup = ->
    _instance.slides = _instance.element.children
    _instance.slides_length = _instance.slides.length
    return null  if _instance.slides_length < 2
    _instance.width = (if ("getBoundingClientRect" of _instance.container) then _instance.container.getBoundingClientRect().width else _instance.container.offsetWidth)
    return null  unless _instance.width
    _instance.element.style.width = (_instance.slides.length * _instance.width) + "px"
    index = _instance.slides.length
    while index--
      el = _instance.slides[index]
      el.style.width = _instance.width + "px"
      el.style.display = "table-cell"
      el.style.verticalAlign = "top"
    _slide _instance.index, 0
    _instance.container.style.visibility = "visible"

  _slide = (index, duration) ->
    style = _instance.element.style
    duration = _instance.speed  if duration is undefined
    style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + "ms"
    style.MozTransform = style.webkitTransform = "translate3d(" + -(index * _instance.width) + "px,0,0)"
    style.msTransform = style.OTransform = "translateX(" + -(index * _instance.width) + "px)"
    _instance.index = index

  _handleGestures = ->
    _instance.element.addEventListener "touchstart", _touchStart, false
    _instance.element.addEventListener "touchmove", _touchMove, false
    _instance.element.addEventListener "touchend", _touchEnd, false
    _instance.element.addEventListener "webkitTransitionEnd", _transitionEnd, false
    _instance.element.addEventListener "msTransitionEnd", _transitionEnd, false
    _instance.element.addEventListener "oTransitionEnd", _transitionEnd, false
    _instance.element.addEventListener "transitionend", _transitionEnd, false
    window.addEventListener "resize", _setup, false

  _touchStart = (event) ->
    _instance.start =
      pageX: event.touches[0].pageX
      pageY: event.touches[0].pageY
      time: Number(new Date())

    _instance.isScrolling = undefined
    _instance.deltaX = 0
    _instance.element.style.MozTransitionDuration = _instance.element.style.webkitTransitionDuration = 0
    event.stopPropagation()

  _touchMove = (e) ->
    return  if e.touches.length > 1 or e.scale and e.scale isnt 1
    _instance.deltaX = e.touches[0].pageX - _instance.start.pageX
    _instance.isScrolling = !!(_instance.isScrolling or Math.abs(_instance.deltaX) < Math.abs(e.touches[0].pageY - _instance.start.pageY))  if typeof _instance.isScrolling is "undefined"
    unless _instance.isScrolling
      e.preventDefault()
      factor = ((if (not _instance.index and _instance.deltaX > 0 or _instance.index is _instance.slides_length - 1 and _instance.deltaX < 0) then (Math.abs(_instance.deltaX) / _instance.width + 1) else 1))
      _instance.deltaX = _instance.deltaX / factor
      pos = (_instance.deltaX - _instance.index * _instance.width)
      _instance.element.style.MozTransform = _instance.element.style.webkitTransform = "translate3d(" + pos + "px,0,0)"
      e.stopPropagation()

  _touchEnd = (e) ->
    isValidSlide = Number(new Date()) - _instance.start.time < 250 and Math.abs(_instance.deltaX) > 20 or Math.abs(_instance.deltaX) > _instance.width / 2
    isPastBounds = not _instance.index and _instance.deltaX > 0 or _instance.index is _instance.slides_length - 1 and _instance.deltaX < 0
    _slide _instance.index + ((if isValidSlide and not isPastBounds then ((if _instance.deltaX < 0 then 1 else -1)) else 0)), _instance.speed  unless _instance.isScrolling
    e.stopPropagation()

  _transitionEnd = (event) ->
    _instance.callback.apply _instance.callback, [_instance.index, _instance.slides[_instance.index]]  if _instance.callback

  _setup()
  _handleGestures()

  prev: prev
  next: next
  position: position
  refresh: refresh
