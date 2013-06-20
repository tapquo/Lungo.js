###
Handles the <sections> and <articles> to show

@namespace Lungo
@class Router

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
@author Ignacio Olalde <ina@tapquo.com> || @piniphone
###


Lungo.RouterPhone = do (lng = Lungo) ->

  C                   = lng.Constants
  HASHTAG             = "#"
  _history            = []
  _animating          = false

  ###
  Navigate to a <section>.
  @method   section
  @param    {string} Id of the <section>
  ###
  section = (section_id) ->
    return false if _animating
    current = lng.Element.Cache.section
    if _notCurrentTarget current, section_id
      query = C.ELEMENT.SECTION + HASHTAG + section_id
      future = if current then current.siblings(query) else lng.dom(query)
      if future.length
        _section future, current
        lng.Router.step section_id
        do _url unless Lungo.Config.history is false
    else if lng.Element.Cache.aside then do lng.Aside.hide

  ###
  Return to previous section.
  @method   back
  ###
  back = ->
    return false if _animating
    do _removeLast
    current = lng.Element.Cache.section
    query = C.ELEMENT.SECTION + HASHTAG + history()
    future = current.siblings(query)
    if future.length
      _section future, current, true
      do _url unless Lungo.Config.history is false
      do _updateNavigationElements

  ###
  Displays the <article> in a particular <section>.
  @method   article
  @param    {string} <section> Id
  @param    {string} <article> Id
  ###
  article = (section_id, article_id, element) ->
    if _notCurrentTarget(lng.Element.Cache.article, article_id)
      lng.Router.section section_id
      target = lng.Element.Cache.section.find "##{article_id}"
      if target.length > 0
        lng.Element.Cache.article.removeClass(C.CLASS.ACTIVE).trigger C.TRIGGER.UNLOAD
        lng.Element.Cache.article = target.addClass(C.CLASS.ACTIVE).trigger(C.TRIGGER.LOAD)

        if element?.data(C.ATTRIBUTE.TITLE)?
          lng.Element.Cache.section.find(C.QUERY.TITLE).text element.data(C.ATTRIBUTE.TITLE)
        do _url unless Lungo.Config.history is false
        do _updateNavigationElements

  ###
  Triggered when <section> animation ends. Reset animation classes of section and aside
  @method   animationEnd
  @param    {eventObject}
  ###
  animationEnd = (event) ->
    section = lng.dom(event.target)
    direction = section.data(C.ATTRIBUTE.DIRECTION)
    if section.data("original-transition")
      section.data(C.TRANSITION.ATTR, section.data("original-transition"))
      section.removeAttr("data-original-transition")

    section.removeClass C.CLASS.SHOW if direction is "out" or direction is "back-out"
    section.removeAttr "data-#{C.ATTRIBUTE.DIRECTION}"
    _animating = false

  ###
  Create a new element to the browsing history based on the current section id.
  @method step
  @param  {string} Id of the section
  ###
  step = (section_id) -> _history.push section_id if section_id isnt history()

  ###
  Returns the current browsing history section id.
  @method history
  @return {string} Current section id
  ###
  history = -> _history[_history.length - 1]

  ###
  Private methods
  ###
  _section = (future, current, backward = false) ->
    callback = ->
      _show future, current, backward
      do _updateNavigationElements
    if lng.Element.Cache.aside then lng.Aside.hide callback
    else do callback

  _show = (future, current, backward) ->
    lng.Section.show current, future
    if current? then _setSectionDirections future, current, backward

  _setSectionDirections = (future, current, backward=false) ->
    if not current? or not future.length then return false
    _animating = true
    dirPrefix = if backward then "back-" else ""
    if not backward
      current.data("original-transition", current.data(C.TRANSITION.ATTR))
      current.data(C.TRANSITION.ATTR, future.data(C.TRANSITION.ATTR))
    else
      future.data("original-transition", future.data(C.TRANSITION.ATTR))
      future.data(C.TRANSITION.ATTR, current.data(C.TRANSITION.ATTR))

    future.addClass(C.CLASS.SHOW)
    future.data(C.ATTRIBUTE.DIRECTION, "#{dirPrefix}in") if future.data(C.TRANSITION.ATTR)
    if current.data(C.TRANSITION.ATTR) then current.data(C.ATTRIBUTE.DIRECTION, "#{dirPrefix}out")
    else current.removeClass(C.CLASS.SHOW)

  _notCurrentTarget = (current, id) -> current?.attr(C.ATTRIBUTE.ID) isnt id

  _url = ->
    _hashed_url = ""
    _hashed_url += "#{section}/" for section in _history
    _hashed_url += lng.Element.Cache.article.attr "id"
    setTimeout (-> window.location.hash = _hashed_url), 0

  _updateNavigationElements = ->
    article_id = lng.Element.Cache.article.attr C.ATTRIBUTE.ID
    # Active visual signal for elements
    links = lng.dom(C.QUERY.ARTICLE_ROUTER).removeClass(C.CLASS.ACTIVE)
    links.filter("[data-view-article=#{article_id}]").addClass(C.CLASS.ACTIVE)
    # Hide/Show elements in current article
    nav = lng.Element.Cache.section.find(C.QUERY.ARTICLE_REFERENCE).addClass C.CLASS.HIDE
    nav.filter("[data-article*='#{article_id}']").removeClass C.CLASS.HIDE

  _removeLast = ->
    if _history.length > 1
      _history.length -= 1

  section : section
  back    : back
  article : article
  history : history
  step    : step
  animationEnd : animationEnd
