###
Handles the <sections> and <articles> to show

@namespace Lungo
@class Router

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###

Lungo.Router = do(lng = Lungo) ->
  C        = lng.Constants
  HASHTAG  = "#"
  _history = []


  ###
  Navigate to a <section>.
  @method   section
  @param    {string} Id of the <section>
  ###
  section = (section_id) ->
    current = lng.Element.Cache.section
    if _notCurrentTarget(current, section_id)
      query = C.ELEMENT.SECTION + HASHTAG + section_id
      target = if current then current.siblings(query) else lng.dom(query)
      if target.length > 0
        if lng.DEVICE is C.DEVICE.PHONE and current?
          lng.Section.defineTransition target, current
          current.removeClass(C.CLASS.SHOW).addClass(C.CLASS.HIDE)

        lng.Section.show current, target
        lng.Router.step section_id
        do _url
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
        do _url


  ###
  Return to previous section.
  @method   back
  ###
  back = ->
    _removeLast()
    current = lng.Element.Cache.section
    query = C.ELEMENT.SECTION + HASHTAG + history()
    target = current.siblings(query)
    if lng.DEVICE is C.DEVICE.PHONE
      lng.Aside.hide()
      lng.Section.assignTransition target, target.data C.TRANSITION.ORIGIN
      current.removeClass(C.CLASS.SHOW).addClass(C.CLASS.HIDING)
      setTimeout (-> current.removeClass(C.CLASS.HIDING)), C.TRANSITION.DURATION
      if target.hasClass("aside") then lng.Aside.toggle()

    lng.Section.show current, target
    do _url
    do _updateNavigationElements


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
  _notCurrentTarget = (current, id) -> current?.attr(C.ATTRIBUTE.ID) isnt id

  _url = ->
    _hashed_url = ""
    _hashed_url += "#{section}/" for section in _history
    _hashed_url += lng.Element.Cache.article.attr "id"
    setTimeout (-> window.location.hash = _hashed_url), 0
    do _updateNavigationElements

  _updateNavigationElements = ->
    article_id = lng.Element.Cache.article.attr C.ATTRIBUTE.ID

    lng.dom(C.QUERY.ARTICLE_ROUTER).removeClass(C.CLASS.ACTIVE).filter("[data-view-article=#{article_id}]").addClass(C.CLASS.ACTIVE)

    nav = lng.Element.Cache.section.find(C.QUERY.ARTICLE_REFERENCE).addClass C.CLASS.HIDE
    nav.filter("[data-article*='#{article_id}']").removeClass C.CLASS.HIDE

  _removeLast = -> _history.length -= 1


  section: section
  article: article
  back: back
  history: history
  step: step
