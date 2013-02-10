###
Handles the <sections> and <articles> to show

@namespace Lungo
@class Router

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###

Lungo.Router = do(lng = Lungo) ->
  CLASS = lng.Constants.CLASS
  ELEMENT = lng.Constants.ELEMENT
  ERROR = lng.Constants.ERROR
  TRIGGER = lng.Constants.TRIGGER
  ATTRIBUTE = lng.Constants.ATTRIBUTE
  DEVICE = lng.Constants.DEVICE
  HASHTAG_CHARACTER = "#"

  ###
  Navigate to a <section>.

  @method section

  @param {string} Id of the <section>
  ###
  section = (section_id) ->
    section_id = lng.Core.parseUrl(section_id)
    current = lng.Element.Cache.section
    if _notCurrentTarget(section_id, current)
      query = ELEMENT.SECTION + section_id
      target = (if (current) then current.siblings(query) else lng.dom(query))
      if target.length > 0
        if lng.DEVICE is DEVICE.PHONE
          if current
            _defineTransition target, current
            current.removeClass(CLASS.SHOW).addClass CLASS.HIDE
          _showPhoneSection target
        else
          _showTabletSection current, target
        _cacheView current, target
        lng.Router.History.add section_id


  ###
  Return to previous section.

  @method back
  ###
  back = ->
    lng.View.Aside.hide()  if lng.DEVICE is DEVICE.PHONE and lng.Element.Cache.aside and lng.Element.Cache.aside.hasClass(CLASS.SHOW)
    lng.Router.History.removeLast()
    current = lng.Element.Cache.section
    target = current.siblings(ELEMENT.SECTION + lng.Router.History.current())
    if lng.DEVICE is DEVICE.PHONE
      current.removeClass CLASS.SHOW
      setTimeout (->
        current.removeClass CLASS.HIDING
      ), lng.Constants.TRANSITION.DURATION
      _assignTransition target, target.data("transition-origin")
      _showPhoneSection target
    else
      _showTabletSection current, target
    _cacheView current, target


  ###
  Displays the <article> in a particular <section>.

  @method article

  @param {string} <section> Id
  @param {string} <article> Id
  ###
  article = (section_id, article_id, element) ->
    article_id = lng.Core.parseUrl(article_id)
    current = lng.Element.Cache.article
    if _notCurrentTarget(article_id, current)
      section section_id
      target = lng.Element.Cache.section.find(ELEMENT.ARTICLE + article_id)
      if target.length > 0
        current = lng.Element.Cache.section.children(ELEMENT.ARTICLE)  if _sectionId(current) isnt _sectionId(target)
        current.removeClass(CLASS.ACTIVE).trigger TRIGGER.UNLOAD
        target.addClass(CLASS.ACTIVE).trigger TRIGGER.LOAD
        lng.Element.Cache.article = target
        lng.View.Article.switchNavItems article_id
        lng.View.Article.switchReferenceItems article_id, lng.Element.Cache.section
        lng.View.Article.title element.data(ATTRIBUTE.TITLE)  if element

  _showPhoneSection = (target) ->
    target.removeClass(CLASS.HIDE).addClass CLASS.SHOW

  _showTabletSection = (current, target) ->
    if current and not current.data("child")
      current.addClass CLASS.HIDE
      setTimeout (->
        current.removeClass(CLASS.SHOW).removeClass CLASS.HIDE
      ), lng.Constants.TRANSITION.DURATION
    setTimeout (->
      target.addClass CLASS.SHOW
    ), lng.Constants.TRANSITION.DURATION

  _cacheView = (current, target) ->
    lng.Element.Cache.section = target
    lng.Element.Cache.article = target.find(ELEMENT.ARTICLE + "." + CLASS.ACTIVE)
    lng.Element.Cache.aside = lng.View.Aside.active(target)
    _sectionTriggers current, target

  _notCurrentTarget = (target, element) ->
    (if (not element or target isnt HASHTAG_CHARACTER + element.attr("id")) then true else false)

  _sectionId = (element) ->
    element.parent("section").attr "id"

  _sectionTriggers = (current, target) ->
    current.trigger TRIGGER.UNLOAD  if current
    target.trigger TRIGGER.LOAD

  _defineTransition = (target, current) ->
    target_transition = target.data("transition")
    if target_transition
      _assignTransitionOrigin current
      _assignTransition current, target_transition

  _assignTransition = (section, transitionName) ->
    section.data "transition", transitionName

  _assignTransitionOrigin = (section) ->
    section.data "transition-origin", section.data("transition")

  section: section
  article: article
  back: back
