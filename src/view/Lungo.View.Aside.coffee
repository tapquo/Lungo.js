###
Initialize the <articles> layout of a certain <section>

@namespace Lungo.View
@class Aside

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.View.Aside = do(lng = Lungo) ->
  ELEMENT = lng.Constants.ELEMENT
  CLASS = lng.Constants.CLASS
  ATTRIBUTE = lng.Constants.ATTRIBUTE
  DEVICE = lng.Constants.DEVICE
  QUERY = lng.Constants.QUERY
  TRANSITION = lng.Constants.TRANSITION.DURATION

  ###
  Active aside for a determinate section

  @method active

  @param  {object} Section element
  ###
  active = (section) ->
    aside_id = section.data("aside")
    current_aside = lng.Element.Cache.aside

    # Deactive
    if (current_aside and aside_id isnt current_aside.attr("id")) or aside_id is null
      current_aside.removeClass(CLASS.SHOW).removeClass CLASS.ACTIVE
      lng.Element.Cache.aside = null

    # Active
    if aside_id
      lng.Element.Cache.aside = lng.dom(ELEMENT.ASIDE + "#" + aside_id)
      lng.Element.Cache.aside.addClass CLASS.ACTIVE
      lng.View.Aside.show aside_id  unless lng.DEVICE is DEVICE.PHONE
    lng.Element.Cache.aside


  ###
  Toggle an aside element

  @method toggle

  @param  {string} Aside id
  ###
  toggle = ->
    if lng.Element.Cache.aside
      is_visible = lng.Element.Cache.aside.hasClass(CLASS.SHOW)
      if is_visible
        lng.View.Aside.hide()
      else
        lng.View.Aside.show()


  ###
  Display an aside element with a particular <section>

  @method show
  ###
  show = (aside) ->
    if lng.Element.Cache.aside?
      setTimeout (->
        lng.Element.Cache.aside.addClass CLASS.SHOW
      ), TRANSITION
      if lng.DEVICE is DEVICE.PHONE
        lng.Element.Cache.aside.addClass CLASS.SHOW
        aside_stylesheet = _asideStylesheet()
        lng.Element.Cache.section.addClass(aside_stylesheet).addClass CLASS.ASIDE


  ###
  Hide an aside element with a particular section

  @method hide
  ###
  hide = ->
    if lng.Element.Cache.aside?
      if lng.DEVICE is DEVICE.PHONE
        aside_stylesheet = _asideStylesheet()
        console.error lng.Element.Cache

        lng.Element.Cache.section.removeClass CLASS.ASIDE
        setTimeout (->
          lng.Element.Cache.aside.removeClass CLASS.SHOW
        ), TRANSITION

  ###
  @todo

  @method suscribeEvents
  ###
  draggable = ->
    MIN_XDIFF = parseInt(document.body.getBoundingClientRect().width / 3, 10)
    MIN_XDIFF = 128
    lng.dom(QUERY.HREF_ASIDE).each ->
      STARTED = false
      el = lng.dom(this)
      section = el.closest("section")
      aside = lng.dom("aside#" + el.data("aside"))
      section.swiping (gesture) ->
        unless section.hasClass("aside")
          xdiff = gesture.currentTouch.x - gesture.iniTouch.x
          ydiff = Math.abs(gesture.currentTouch.y - gesture.iniTouch.y)
          STARTED = (if STARTED then true else xdiff > 3 * ydiff and xdiff < 50)
          if STARTED
            xdiff = (if xdiff > 256 then 256 else (if xdiff < 0 then 0 else xdiff))
            aside.addClass CLASS.SHOW
            section.vendor "transform", "translateX(" + xdiff + "px)"
            section.vendor "transition-duration", "0s"
          else
            section.attr "style", ""

      section.swipe (gesture) ->
        diff = gesture.currentTouch.x - gesture.iniTouch.x
        ydiff = Math.abs(gesture.currentTouch.y - gesture.iniTouch.y)
        section.attr "style", ""
        if diff > MIN_XDIFF and STARTED
          show aside
        else
          hide aside
        STARTED = false



  _asideStylesheet = ->
    aside_stylesheet = lng.Element.Cache.aside.attr(ATTRIBUTE.CLASS)
    classes = ""

    #@todo: Refactor
    if aside_stylesheet
      classes += (if (aside_stylesheet.indexOf(CLASS.RIGHT) > -1) then CLASS.RIGHT + " " else "")
      classes += (if (aside_stylesheet.indexOf(CLASS.SMALL) > -1) then CLASS.SMALL + " " else "")
    classes

  active: active
  toggle: toggle
  show: show
  hide: hide
  draggable: draggable
