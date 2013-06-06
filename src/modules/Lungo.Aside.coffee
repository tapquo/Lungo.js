###
Initialize the <articles> layout of a certain <section>

@namespace Lungo
@class Aside

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Aside = do (lng = Lungo) ->

  C = lng.Constants
  _callback = undefined

  ###
  Display an aside element with a particular <section>
  @method show
  ###
  show = (aside_id, animate_section = true) ->
    aside = lng.dom("##{aside_id}")
    if aside.length
      lng.Element.Cache.aside = aside
      aside_transition = aside.data(C.TRANSITION.ATTR) or "left"
      aside.addClass(C.CLASS.SHOW)
      if lng.DEVICE is C.DEVICE.PHONE
        lng.Element.Cache.section.data("aside-#{aside_transition}", "show")
      else
        aside_section = lng.dom("[data-aside=#{aside_id}]")
        if aside_section.attr("id") isnt lng.Element.Cache.section.attr("id")
          lng.Element.Cache.section.addClass "shadowing"
        aside_section.removeClass("aside").addClass "asideShowing"

  ###
  Hide an aside element with a particular section
  @method hide
  ###
  hide = (callback) ->
    if lng.Element.Cache.aside
      _callback = callback
      aside_transition = lng.Element.Cache.aside.data(C.TRANSITION.ATTR) or "left"
      if lng.DEVICE is C.DEVICE.PHONE
        lng.Element.Cache.section.removeClass("aside").data("aside-#{aside_transition}", "hide")
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
      section.removeAttr("data-aside-#{aside_transition}").addClass "aside"


  ###
  @todo
  @method draggable
  ###
  draggable = ->
    MIN_XDIFF = parseInt(document.body.getBoundingClientRect().width / 3, 10)
    MIN_XDIFF = 128
    lng.dom(C.QUERY.HREF_ASIDE).each ->
      started = false
      el = lng.dom(this)
      section = el.closest("section")
      aside = lng.dom("aside#" + el.data("aside"))
      section.swiping (gesture) ->
        unless section.hasClass("aside")
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
          show aside
        else
          hide aside
        started = false


  ###
  Private methods
  ###
  _asideStylesheet = ->
    if lng.Element.Cache.aside?.hasClass(C.CLASS.RIGHT) then "#{C.CLASS.RIGHT}" else "  "

  toggle: toggle
  show: show
  hide: hide
  draggable: draggable
  animationEnd: animationEnd
