###
Handles the <sections> and <articles> to show

@namespace Lungo
@class Router

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###

Lungo.Router = do(lng = Lungo) ->
  C       = lng.Constants
  HASHTAG = "#"


  ###
  Navigate to a <section>.
  @method   section
  @param    {string} Id of the <section>
  ###
  section = (section_id) ->
    section_id = lng.Core.parseUrl(section_id)
    current = lng.Element.Cache.section
    if _notCurrentTarget(section_id, current)
      query = C.ELEMENT.SECTION + section_id
      target = if current then current.siblings(query) else lng.dom(query)
      if target.length > 0
        if lng.DEVICE is C.DEVICE.PHONE
          if current?
            lng.Section.defineTransition target, current
            current.removeClass(C.CLASS.SHOW).addClass(C.CLASS.HIDE)

        lng.Section.show current, target
        lng.Router.History.add section_id


  ###
  Displays the <article> in a particular <section>.
  @method   article
  @param    {string} <section> Id
  @param    {string} <article> Id
  ###
  article = (section_id, article_id, element) ->
    article_id = lng.Core.parseUrl(article_id)
    current = lng.Element.Cache.article
    if _notCurrentTarget(article_id, current)
      section section_id
      target = lng.Element.Cache.section.find(C.ELEMENT.ARTICLE + article_id)
      if target.length > 0
        current = lng.Element.Cache.section.children(C.ELEMENT.ARTICLE)  if _sectionId(current) isnt _sectionId(target)
        current.removeClass(C.CLASS.ACTIVE).trigger C.TRIGGER.UNLOAD
        target.addClass(C.CLASS.ACTIVE).trigger C.TRIGGER.LOAD
        lng.Element.Cache.article = target
        lng.Article.switchNavItems article_id
        lng.Article.switchReferenceItems article_id, lng.Element.Cache.section
        lng.Article.title element.data(C.ATTRIBUTE.TITLE)  if element


  ###
  Return to previous section.
  @method   back
  ###
  back = ->
    lng.Router.History.removeLast()

    current = lng.Element.Cache.section
    target = current.siblings(C.ELEMENT.SECTION + lng.Router.History.current())
    if lng.DEVICE is C.DEVICE.PHONE
      lng.Aside.hide() if lng.Element.Cache.aside and lng.Element.Cache.aside.hasClass(C.CLASS.SHOW)

      lng.Section.assignTransition target, target.data C.TRANSITION.ORIGIN
      current.removeClass(C.CLASS.SHOW).addClass(C.CLASS.HIDING)
      setTimeout (-> current.removeClass(C.CLASS.HIDING)), C.TRANSITION.DURATION

    lng.Section.show current, target


  ###
  Private methods
  ###
  _notCurrentTarget = (target, element) ->
    (if (not element or target isnt HASHTAG + element.attr(C.ATTRIBUTE.ID)) then true else false)

  _sectionId = (element) ->
    element.parent(C.ELEMENT.SECTION).attr C.ATTRIBUTE.ID

  section: section
  article: article
  back: back
