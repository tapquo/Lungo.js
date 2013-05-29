###
Handles the <sections> and <articles> to show

@namespace Lungo
@class Router

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###

Lungo.Router = do (lng = Lungo) ->

  C                   = lng.Constants
  HASHTAG             = "#"
  ANIMATIONEND_EVENTS = ["animationend", "webkitAnimationEnd", "oanimationend", "MSAnimationEnd"]
  _history            = []
  _outPage            = undefined
  _inPage             = undefined
  _animating          = false


  ###
  Navigate to a <section>.
  @method   section
  @param    {string} Id of the <section>
  ###
  section = (section_id) ->
    if _animating then return
    _outPage = lng.Element.Cache.section
    if _notCurrentTarget(_outPage, section_id)
      query = C.ELEMENT.SECTION + HASHTAG + section_id
      _inPage = if _outPage then _outPage.siblings(query) else lng.dom(query)
      if _inPage.length > 0
        if lng.DEVICE is C.DEVICE.PHONE and _outPage?
          outClass = _inPage.data(C.ATTRIBUTE.TRANSITION) + "Out"
          inClass = _inPage.data(C.ATTRIBUTE.TRANSITION) + "In"
          _outPage.addClass(outClass).addClass("show")
          _inPage.addClass(inClass).addClass("show")
          do _bindAnimationEnd

        lng.Section.show _outPage, _inPage
        lng.Router.step section_id
        do _url unless Lungo.Config.history is false
        do _updateNavigationElements


  ###
  Return to previous section.
  @method   back
  ###
  back = ->
    if _animating then return
    do _removeLast
    _outPage = lng.Element.Cache.section
    query = C.ELEMENT.SECTION + HASHTAG + history()
    _inPage = _outPage.siblings(query)
    if lng.DEVICE is C.DEVICE.PHONE
      do lng.Aside.hide
      outClass = _outPage.data(C.ATTRIBUTE.TRANSITION) + "OutBack"
      inClass = _outPage.data(C.ATTRIBUTE.TRANSITION) + "InBack"
      _outPage.addClass(outClass).addClass("show")
      _inPage.addClass(inClass).addClass("show")
      do _bindAnimationEnd
      if _inPage.hasClass("aside") then lng.Aside.toggle()

    lng.Section.show _outPage, _inPage
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

  _updateNavigationElements = ->
    article_id = lng.Element.Cache.article.attr C.ATTRIBUTE.ID

    lng.dom(C.QUERY.ARTICLE_ROUTER).removeClass(C.CLASS.ACTIVE).filter("[data-view-article=#{article_id}]").addClass(C.CLASS.ACTIVE)

    nav = lng.Element.Cache.section.find(C.QUERY.ARTICLE_REFERENCE).addClass C.CLASS.HIDE
    nav.filter("[data-article*='#{article_id}']").removeClass C.CLASS.HIDE

  _removeLast = -> _history.length -= 1

  _bindAnimationEnd = ->
    _animating = true
    document.addEventListener(ev, _transitionEnd) for ev in ANIMATIONEND_EVENTS

  _unbindAnimationEnd = ->
    document.removeEventListener(ev, _transitionEnd) for ev in ANIMATIONEND_EVENTS

  _transitionEnd = ->
    _outPage.attr "class", ""
    _inPage.attr "class", "show"
    _outPage = undefined
    _inPage = undefined
    do _unbindAnimationEnd
    _animating = false


  section : section
  back    : back
  article : article
  history : history
  step    : step
