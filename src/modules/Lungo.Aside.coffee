###
Initialize the <articles> layout of a certain <section>

@namespace Lungo
@class Aside

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Aside = do (lng = Lungo) ->

  C = lng.Constants
  _callback = undefined
  _customAsideAnimation = undefined

  ###
  Display an aside element with a particular <section>
  @method show
  ###
  show = (aside_id, animate_section = true, fromX = 0) ->
    aside = lng.dom("##{aside_id}")
    if aside.length and not _alreadyOpen(aside_id)
        lng.Element.Cache.aside = aside
        if lng.DEVICE is C.DEVICE.PHONE
          aside_transition = aside.data(C.TRANSITION.ATTR) or "left"
          aside.addClass(C.CLASS.SHOW)
          if fromX then _phoneCustomAnimation fromX, false
          else lng.Element.Cache.section.data("aside-#{aside_transition}", "show")
        else
          aside.addClass(C.CLASS.SHOW)
          aside_section = lng.dom("[data-aside=#{aside_id}][data-children]")
          if aside_section.attr("id") isnt lng.Element.Cache.section?.attr("id")
            lng.Element.Cache.section.addClass "shadowing"
            childs = aside_section.data("children").split(" ")
            for child in childs
              child = lng.dom(C.ELEMENT.SECTION + "#" + child)
              if child.hasClass(C.CLASS.SHOW) then child.addClass "shadowing"

          aside_section.removeClass("aside").addClass "asideShowing"

  ###
  Shows a fixed aside (not able to hide cause section have not children)
  @method hide
  ###
  showFix = (aside_id) ->
    aside = lng.dom("##{aside_id}")
    if aside.length
      lng.Element.Cache.aside = aside
      aside.addClass(C.CLASS.SHOW).addClass("box")

  ###
  Hide an aside element with a particular section
  @method hide
  ###
  hide = (callback, fromX) ->
    if lng.Element.Cache.aside
      _callback = callback
      aside_transition = lng.Element.Cache.aside.data(C.TRANSITION.ATTR) or "left"
      if lng.DEVICE is C.DEVICE.PHONE
        lng.Element.Cache.section.removeClass("aside").removeClass("aside-right")
        if fromX then _phoneCustomAnimation fromX, true
        else lng.Element.Cache.section.data("aside-#{aside_transition}", "hide")
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
  toggle = (aside) ->
    if lng.Element.Cache.aside then do lng.Aside.hide
    else lng.Aside.show aside

  ###
  Triggered when <aside> animation ends.
  @method   animationEnd
  @param    {object} event
  ###
  animationEnd = (event) ->
    section = lng.dom(event.target)
    aside_transition = lng.Element.Cache.aside.data(C.TRANSITION.ATTR) or "left"
    if section.data("aside-#{aside_transition}") is "hide"
      lng.Element.Cache.aside.removeClass(C.CLASS.SHOW)
      lng.Element.Cache.aside = null
      section.removeAttr("data-aside-#{aside_transition}")
      if _callback then _callback.call _callback
      _callback = undefined
    else
      className = if aside_transition.indexOf("right") is -1 then "aside" else "aside-right"
      section.removeAttr("style").removeAttr("data-aside-#{aside_transition}").addClass(className)
    if _customAsideAnimation
      _customAsideAnimation.remove()
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
        ydiff = Math.abs(gesture.currentTouch.y - gesture.iniTouch.y)
        section.attr "style", ""
        if diff > MIN_XDIFF and started
          show(aside.attr("id"), true, gesture.currentTouch.x)
        else hide
        started = false


  ###
  Private methods
  ###
  _alreadyOpen = (aside_id) ->
    return lng.Element.Cache.aside?.attr("id") is aside_id

  _asideStylesheet = ->
    if lng.Element.Cache.aside?.hasClass(C.CLASS.RIGHT) then "#{C.CLASS.RIGHT}" else "  "

  _phoneCustomAnimation = (fromX, hide=false) ->
    if hide then kfStyle = document.createTextNode("""
        @-webkit-keyframes asideCustomKF {
          0%   { -webkit-transform: translateX(#{fromX}px); }
          40%  { -webkit-transform: translateX(#{fromX + 8}px); }
          100% { -webkit-transform: translateX(0); }
        }""")
    else kfStyle = document.createTextNode("""
        @-webkit-keyframes asideCustomKF {
          0%   { -webkit-transform: translateX(#{fromX}px); }
          60%  { -webkit-transform: translateX(#{C.ASIDE.NORMAL + 8}px); }
          100% { -webkit-transform: translateX(#{C.ASIDE.NORMAL}px); }
        }""")
    _customAsideAnimation = document.createElement('style')
    _customAsideAnimation.type = 'text/css'
    _customAsideAnimation.appendChild(kfStyle)
    document.getElementsByTagName("head")[0].appendChild(_customAsideAnimation)
    lng.Element.Cache.section.style("-webkit-animation-name", "asideCustomKF")



  toggle: toggle
  show: show
  showFix: showFix
  hide: hide
  draggable: draggable
  animationEnd: animationEnd
