###
Initialize the Layout of LungoJS (if it's a mobile environment)

@namespace Lungo.Boot
@class Layout

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Boot.Layout = do(lng = Lungo) ->
  C       = lng.Constants
  HASHTAG = "#"


  ###
  Initializes all <section> & <article> of the project
  @method init
  ###
  init = ->
    lng.Fallback.fixPositionInAndroid()
    if Lungo.Config.history and window.location.hash?.length >= 2
      do _initSectionbyUrl
    else
      do _initSection

    _initElement C.QUERY.LIST_IN_ELEMENT, _createListElement
    _initElement C.QUERY.ELEMENT_SCROLLABLE, _scrollFix


  ###
  Private methods
  ###
  _initSectionbyUrl = ->
    history = window.location.hash.replace(HASHTAG, "").split("/")
    section_id = history[history.length - 2]
    article_id = history[history.length - 1]
    if history.length > 2
      history.length -= 2
      lng.Router.step section for section in history
    lng.Router.section section_id
    lng.Router.article section_id, article_id

  _initSection = ->
    section = lng.dom(C.ELEMENT.SECTION).first()
    lng.Router.section section.attr(C.ATTRIBUTE.ID) if section

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
      element_id = element.attr(C.ATTRIBUTE.ID)
      element.append C.ELEMENT.LIST

  _scrollFix = (element) ->
    element[0].addEventListener "touchstart", ((event) ->
      scrollTop = @scrollTop
      @scrollTop = 1  if scrollTop <= 1
      @scrollTop = @scrollHeight - @offsetHeight - 1 if scrollTop + @offsetHeight >= @scrollHeight
    ), false

  init: init
