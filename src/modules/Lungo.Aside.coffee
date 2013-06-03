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
  show = (aside_id) ->
    aside = lng.dom("##{aside_id}")
    if aside.length
      lng.Element.Cache.aside = aside
      aside.addClass(C.CLASS.SHOW)
      lng.Element.Cache.section.data("aside-#{aside.data(C.TRANSITION.ATTR)}", "show")

  ###
  Hide an aside element with a particular section
  @method hide
  ###
  hide = (callback) ->
    aside = lng.Element.Cache.aside
    if aside
      _callback = callback
      aside_transition = aside.data(C.TRANSITION.ATTR)
      section = lng.Element.Cache.section
      section.data("aside-#{aside_transition}", "hide")

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
    aside_transition = lng.Element.Cache.aside.data C.TRANSITION.ATTR
    if section.data("aside-#{aside_transition}") is "hide"
      lng.Element.Cache.aside.removeClass(C.CLASS.SHOW)
      lng.Element.Cache.aside = null
      section.removeAttr("data-aside-#{aside_transition}")
      if _callback then _callback.call(@)
      _callback = undefined


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
