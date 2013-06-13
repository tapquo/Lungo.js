###
Initialize the automatic DOM UI events

@namespace Lungo.Boot
@class Events

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
@author Ignacio Olalde <ina@tapquo.com> || @piniphone
###

Lungo.Boot.Events = do (lng = Lungo) ->

  C = lng.Constants
  ATTRIBUTE = lng.Constants.ATTRIBUTE
  CLASS = lng.Constants.CLASS
  ELEMENT = lng.Constants.ELEMENT
  QUERY = lng.Constants.QUERY

  ###
  Initializes the automatic subscription events by markup of the project.

  @method init
  ###
  init = ->
    lng.dom(C.QUERY.SECTION_ROUTER_TOUCH).touch _onSection
    lng.dom(C.QUERY.SECTION_ROUTER_TAP).tap _onSection
    lng.dom(C.QUERY.ARTICLE_ROUTER_TOUCH).touch _onArticle
    lng.dom(C.QUERY.ARTICLE_ROUTER_TAP).tap _onArticle
    lng.dom(C.QUERY.ASIDE_ROUTER).touch _onAside
    lng.dom(C.QUERY.MENU_ROUTER).touch _onMenu
    lng.dom(QUERY.MENU_HREF).touch _closeMenu
    lng.dom(QUERY.CONTROL_CHECKBOX).on C.EVENT.CHANGE, _changeCheckboxValue
    for transition in C.EVENT.TRANSITION_END
      lng.dom("body").delegate C.ELEMENT.SECTION, transition, _transitionEnd
      lng.dom("body").delegate C.ELEMENT.ASIDE, transition, _transitionEnd

  _onSection = (event) ->
    event.preventDefault()
    el = lng.dom @
    if el.data "async"
      _onAsyncResource el, C.ELEMENT.SECTION
    else
      section_id = el.data "view-section"
      if section_id isnt "back" then lng.Router.section(section_id) else lng.Router.back()

  _onArticle = (event) ->
    event.preventDefault()
    el = lng.dom @
    if el.data "async"
      _onAsyncResource el, C.ELEMENT.ARTICLE
    else
      lng.Router.article lng.Router.history(), el.data("view-article"), el
      # lng.Aside.hide()

  _onAsyncResource = (el, type) ->
    url = el.data "async"
    id = el.data "view-#{type}"

    lng.Notification.show()
    if type is C.ELEMENT.ARTICLE
      section_id = lng.Element.Cache.section.attr(C.ATTRIBUTE.ID)
      lng.Resource.load url, C.ELEMENT.SECTION + "#" + section_id
    else
      lng.Resource.load url

    lng.Boot.Data.init "##{id}"
    link.removeAttribute("data-async") for link in lng.dom "[data-async='#{url}']"
    if type is C.ELEMENT.ARTICLE
      lng.Router.article section_id, id
      lng.Aside.hide()
    else
      lng.Router.section id
    do lng.Notification.hide


  _onAside = (event) ->
    do event.preventDefault
    aside_id = lng.dom(event.target).closest(C.QUERY.ASIDE_ROUTER).data "view-aside"
    lng.Aside.toggle aside_id

  _onMenu = (event) ->
    event.preventDefault()
    menu_id = lng.dom(@).data("view-menu")
    lng.dom("[data-control=menu]##{menu_id}").toggleClass CLASS.SHOW

  _closeMenu = (event) ->
    event.preventDefault()
    el = lng.dom(this)
    parent = el.parent("[data-control=menu]").removeClass(CLASS.SHOW).attr C.ATTRIBUTE.ID
    lng.dom("[data-view-menu=#{parent}] > .icon").attr "class", "icon " + el.data("icon")

  _changeCheckboxValue = (event) ->
    #@TODO >> Refactor names
    event.preventDefault()
    el = lng.dom(this)
    input = el.find "input"
    checked = input[0].checked
    input.val checked.toString()
    el.removeClass "checked"
    if checked  then el.addClass "checked"

  _transitionEnd = (event) ->
    section = lng.dom(event.target)
    hasDirection = section.data("direction")
    asideRelated = section.hasClass("asideHidding") or section.hasClass("asideShowing")
    shadowRelated = section.hasClass("shadowing") or section.hasClass("unshadowing")

    if hasDirection or asideRelated or shadowRelated then lng.Router.animationEnd event
    else lng.Aside.animationEnd event


  init: init
