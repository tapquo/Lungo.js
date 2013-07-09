###
Initialize the <articles> layout of a certain <section>

@namespace Lungo
@class Aside

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Aside = do (lng = Lungo) ->

  C = lng.Constants
  _callback = undefined
  CUSTOM_KF_SHOW = "__customKFShow__"
  CUSTOM_KF_HIDE = "__customKFHide__"
  ANIMATION_DURATION = "300ms"
  _customAsideAnimation = undefined
  _kfPrefix = ''
  lng.ready ->
    isMoz = lng.Core.environment().browser.match(/mozilla|firefox/gi)?.length > 0
    _kfPrefix = if isMoz then '' else '-webkit-'

  ###
  Display an aside element
  @method show

  @param    {string} <aside> Id
  ###
  show = (aside_id, fixed = false, fromX = -1) ->
    aside = lng.dom("##{aside_id}")
    if aside.length
      unless _alreadyOpen(aside_id)
        unless fixed
          # not fixed
          lng.Element.Cache.aside = aside
          if lng.DEVICE is C.DEVICE.PHONE
            aside.addClass(C.CLASS.SHOW)
            unless fromX is -1
              animationValue = _createCustomAnimation(fromX) + " " + ANIMATION_DURATION
              lng.Element.Cache.section.style "#{_kfPrefix}animation", animationValue
            else
              aside_transition = aside.data(C.TRANSITION.ATTR) or "left"
              lng.Element.Cache.section.data("aside-#{aside_transition}", "show")
          else
            aside.addClass(C.CLASS.SHOW)
            aside_section = lng.dom("[data-aside=#{aside_id}][data-children]")
            if aside_section.attr("id") isnt lng.Element.Cache.section?.attr("id")
              lng.Element.Cache.section.addClass "shadowing"
              childs = aside_section.data("children")
              childs = childs.split(" ")
              for child in childs
                child = lng.dom(C.ELEMENT.SECTION + "#" + child)
                if child.length and child.hasClass(C.CLASS.SHOW) then child.addClass "shadowing"

            aside_section.removeClass("aside").addClass "asideShowing"
        else
          # fixed
          lng.Element.Cache.aside = aside
          aside.addClass(C.CLASS.SHOW).addClass("box")

  ###
  Hide current aside element
  @method hide
  @param    {function} Callback
  ###
  hide = (callback, fromX=null) ->
    if lng.Element.Cache.aside or fromX
      _callback = callback
      aside_transition = lng.Element.Cache.aside?.data(C.TRANSITION.ATTR) or "left"
      if lng.DEVICE is C.DEVICE.PHONE
        if fromX > 0
          lng.Element.Cache.section.removeClass("aside").removeClass("aside-right")
          animationValue = _createCustomAnimation(fromX, true) + " " + ANIMATION_DURATION
          lng.Element.Cache.section.style "#{_kfPrefix}animation", animationValue
        else
          lng.Element.Cache.section.removeClass("aside").removeClass("aside-right")
          lng.Element.Cache.section.data("aside-#{aside_transition}", "hide")
      else
        lng.dom(".aside").removeClass("aside").addClass("asideHidding")
        lng.Element.Cache.aside = null
        if callback then callback.call callback
        lng.dom(".shadow").removeClass("shadow").addClass("unshadowing")
    else if callback then callback.call callback

  ###
  Toggle an aside element
  @method toggle
  @param  {string} Aside id
  ###
  toggle = (aside) -> if lng.Element.Cache.aside then @hide() else @show aside

  ###
  Triggered when <aside> animation ends.
  @method   animationEnd
  @param    {object} event
  ###
  animationEnd = (event) ->
    section = lng.dom(event.target)
    aside_transition = lng.Element.Cache.aside?.data(C.TRANSITION.ATTR) or "left"
    if section.data("aside-#{aside_transition}") is "hide"
      lng.Element.Cache.aside.removeClass(C.CLASS.SHOW)
      lng.Element.Cache.aside = null
      section.removeAttr("data-aside-#{aside_transition}")
      if _callback then _callback.call _callback
      _callback = undefined
    else
      if section.style("#{_kfPrefix}animation").indexOf(CUSTOM_KF_HIDE) is -1
        className = if aside_transition.indexOf("right") is -1 then "aside" else "aside-right"
        section.addClass(className)
      section.removeAttr("style").removeAttr("data-aside-#{aside_transition}")

    if _customAsideAnimation
      section.removeAttr("style")
      _customAsideAnimation.parentNode.removeChild(_customAsideAnimation)
      _customAsideAnimation = undefined

  ###
  @todo
  @method draggable
  ###
  draggable = ->
    return false unless lng.DEVICE is C.DEVICE.PHONE
    MIN_XDIFF = 96
    lng.dom(C.QUERY.HREF_ASIDE).each ->
      started = false
      el = lng.dom(this)
      section = el.closest("section")
      aside = lng.dom("aside#" + el.data("aside"))
      section.swiping (gesture) ->
        gesture.originalEvent.preventDefault()
        unless section.hasClass("aside") or section.hasClass("aside-right")
          xdiff = gesture.currentTouch.x - gesture.iniTouch.x
          ydiff = Math.abs(gesture.currentTouch.y - gesture.iniTouch.y)
          started = (if started then true else xdiff > 3 * ydiff and xdiff < 50)
          if started
            xdiff = (if xdiff > 256 then 256 else (if xdiff < 0 then 0 else xdiff))
            aside.addClass C.CLASS.SHOW
            section.vendor "transform", "translateX(#{xdiff}px)"
            section.vendor "transition-duration", "0s"
          else
            section.attr "style", ""

      section.swipe (gesture) ->
        diff = gesture.currentTouch.x - gesture.iniTouch.x
        diff = 256 if diff > 256
        ydiff = Math.abs(gesture.currentTouch.y - gesture.iniTouch.y)
        section.attr "style", ""
        if diff > MIN_XDIFF and started
          show(aside.attr("id"), false, diff)
        else
          if started then hide(undefined, diff)
          else hide()
        started = false


  ###
  Private methods
  ###
  _alreadyOpen = (aside_id) ->
    return lng.Element.Cache.aside?.attr("id") is aside_id

  _asideStylesheet = ->
    if lng.Element.Cache.aside?.hasClass(C.CLASS.RIGHT) then "#{C.CLASS.RIGHT}" else " "

  _createCustomAnimation = (x, forClose=false) ->
    animationName = if forClose then CUSTOM_KF_HIDE else CUSTOM_KF_SHOW
    _customAsideAnimation = document.createElement('style')
    _customAsideAnimation.type = 'text/css'
    unless forClose
      rule = """
        @#{_kfPrefix}keyframes #{animationName} {
          0%   { #{_kfPrefix}transform: translateX(#{x}px); }
          60%  { #{_kfPrefix}transform: translateX(262px);  }
          100% { #{_kfPrefix}transform: translateX(256px);  }
        }
      """
    else
      rule = """
        @#{_kfPrefix}keyframes #{animationName} {
          0%   { #{_kfPrefix}transform: translateX(#{x}px); }
          100% { #{_kfPrefix}transform: translateX(0);      }
        }
      """
    _customAsideAnimation.appendChild(document.createTextNode(rule))
    document.getElementsByTagName("head")[0].appendChild(_customAsideAnimation)
    return animationName


  show        : show
  hide        : hide
  toggle      : toggle
  draggable   : draggable
  animationEnd: animationEnd
