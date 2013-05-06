###
Creates a instance of Pull & Refresh Element

@namespace Lungo.Element
@class Pull
@version 1.0

@author Ignacio Olalde <ina@tapquo.com> || @piniphone
@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###


Lungo.Element.Pull = (element_selector, config_data) ->
  REFRESHING_HEIGHT = 68
  MAX_HEIGHT = 80
  ANIMATION_TIME = 300
  CURRENT_DISTANCE = 0
  REFRESHING = false
  ELEMENT = $$(element_selector)
  CONTAINER = ELEMENT.siblings("div[data-control=\"pull\"]")
  CONFIG = undefined
  CONFIG_BASE =
    onPull: "Pull down to refresh"
    onRelease: "Release to..."
    onRefresh: "Loading..."
    callback: undefined

  CONFIG = Lungo.Core.mix(CONFIG_BASE, config_data)

  hide = ->
    _moveElementTo 0, true
    setTimeout (->
      REFRESHING = false
      CONTAINER.attr "class", ""
      ELEMENT[0].removeEventListener "touchmove", _blockGestures, true
    ), ANIMATION_TIME
    CURRENT_DISTANCE = 0

  _moveElementTo = (posY, animate) ->
    newPos = (if posY > MAX_HEIGHT then MAX_HEIGHT else posY)
    if animate then ELEMENT.addClass "pull" else ELEMENT.removeClass "pull"
    ELEMENT.style "-webkit-transform", "translate(0, " + (newPos) + "px)"
    if animate
      setTimeout (->
        ELEMENT.removeClass "pull"
      ), ANIMATION_TIME

  _refreshStart = (event) ->
    REFRESHING = true
    ELEMENT[0].addEventListener "touchmove", _blockGestures, true
    _setContainerTitle CONFIG.onRefresh
    _setContainerLoading true
    _moveElementTo REFRESHING_HEIGHT, true
    CONFIG.callback.apply this  if CONFIG.callback

  _setContainerTitle = (title) ->
    CONTAINER.find("strong").html title

  _setContainerLoading = (op) ->
    if op then CONTAINER.addClass "refresh" else CONTAINER.removeClass "refresh"

  _setContainerOnPulling = (op) ->
    if op then CONTAINER.addClass "rotate" else CONTAINER.removeClass "rotate"

  _blockGestures = (touchEvent) -> touchEvent.preventDefault()

  _handlePulling = (event) ->
    _moveElementTo CURRENT_DISTANCE, false
    _setContainerLoading false
    if CURRENT_DISTANCE > REFRESHING_HEIGHT
      _setContainerTitle CONFIG.onRelease
      _setContainerOnPulling true
    else
      _setContainerTitle CONFIG.onPull
      _setContainerOnPulling false

  _handlePullEnd = (event) ->
    if CURRENT_DISTANCE > REFRESHING_HEIGHT then do _refreshStart else do hide
    @

  _getTouchY = (event) ->
    if $$.isMobile() then event.touches[0].pageY else event.pageY

  (->
    STARTED = false
    INI_Y = 0
    ELEMENT.bind("touchstart", (event) ->
      if ELEMENT[0].scrollTop <= 1
        STARTED = true
        INI_Y = _getTouchY event
      true
    ).bind("touchmove", (event) ->
      if not REFRESHING and STARTED
        current_y = _getTouchY event
        CURRENT_DISTANCE = current_y - INI_Y
        if CURRENT_DISTANCE >= 0
          _handlePulling event
          do event.preventDefault
      true
    ).bind "touchend", ->
      if STARTED then _handlePullEnd()
      STARTED = false
      true

  )()

  hide: hide