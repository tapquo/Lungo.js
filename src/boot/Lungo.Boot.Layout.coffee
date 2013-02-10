###
Initialize the Layout of LungoJS (if it's a mobile environment)

@namespace Lungo.Boot
@class Layout

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Boot.Layout = do(lng = Lungo) ->
  ELEMENT = lng.Constants.ELEMENT
  CLASS = lng.Constants.CLASS
  ATTRIBUTE = lng.Constants.ATTRIBUTE
  QUERY = lng.Constants.QUERY

  ###
  Initializes all <section> & <article> of the project
  @method init
  ###
  init = ->
    lng.Fallback.fixPositionInAndroid()
    _initFirstSection()
    _initElement QUERY.LIST_IN_ELEMENT, _createListElement
    _initElement QUERY.ELEMENT_SCROLLABLE, _scrollFix

  _initFirstSection = ->
    section = lng.dom(ELEMENT.SECTION).first()
    lng.Router.section section.attr("id")  if section

  _initElement = (selector, callback) ->
    found_elements = lng.dom(selector)
    i = 0
    len = found_elements.length

    while i < len
      element = lng.dom(found_elements[i])
      lng.Core.execute callback, element
      i++

  _createListElement = (element) ->
    if element.children().length is 0
      element_id = element.attr(ATTRIBUTE.ID)
      element.append ELEMENT.LIST

  _scrollFix = (element) ->
    element[0].addEventListener "touchstart", ((event) ->
      scrollTop = @scrollTop
      @scrollTop = 1  if scrollTop <= 1
      @scrollTop = @scrollHeight - @offsetHeight - 1  if scrollTop + @offsetHeight >= @scrollHeight
    ), false

  init: init
