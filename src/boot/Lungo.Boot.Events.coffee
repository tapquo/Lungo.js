###
Initialize the automatic DOM UI events

@namespace Lungo.Boot
@class Events

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###

Lungo.Boot.Events = do(lng = Lungo) ->
  C = lng.Constants
  ATTRIBUTE = lng.Constants.ATTRIBUTE
  CLASS = lng.Constants.CLASS
  ELEMENT = lng.Constants.ELEMENT
  QUERY = lng.Constants.QUERY
  SELECTORS = INPUT_CHECKBOX: "input[type=range].checkbox"

  ###
  Initializes the automatic subscription events by markup of the project.

  @method init
  ###
  init = ->
    lng.dom(C.QUERY.SECTION_ROUTER).tap _onSection
    lng.dom(C.QUERY.ARTICLE_ROUTER).tap _onArticle
    lng.dom(C.QUERY.ASIDE_ROUTER).tap _onAside
    lng.dom(C.QUERY.MENU_ROUTER).tap _onMenu


    lng.dom(QUERY.MENU_HREF).tap _closeMenu
    lng.dom(QUERY.INPUT_CHECKBOX).tap _changeCheckboxValue

  _onSection = (event) ->
    event.preventDefault()
    el = lng.dom @
    if el.data "async"
      _onAsyncSection el.data("async"), el.data("view-section")
    else
      section_id = el.data "view-section"
      if section_id isnt "back" then lng.Router.section(section_id) else lng.Router.back()

  _onAsyncSection = (url, section_id) ->
    lng.Notification.show()
    lng.Resource.load url
    lng.Boot.Data.init "##{section_id}"
    link.removeAttribute("data-async") for link in lng.dom "[data-async='#{url}']"
    setTimeout (->
      lng.Router.section section_id
      do lng.Notification.hide
    ), lng.Constants.TRANSITION.DURATION * 2

  _onArticle = (event) ->
    event.preventDefault()
    el = lng.dom @
    lng.Router.article lng.Router.History.current(), el.data("view-article"), el
    lng.Aside.hide()

  _onAside = (event) ->
    event.preventDefault()
    lng.Aside.toggle()

  _onMenu = (event) ->
    event.preventDefault()
    menu_id = lng.dom(@).data("view-menu")
    lng.dom("[data-control=menu]##{menu_id}").toggleClass CLASS.SHOW

  _closeMenu = (event) ->
    event.preventDefault()
    el = lng.dom(this)
    parent = el.parent("[data-control=menu]").removeClass(CLASS.SHOW)
    lng.dom("[data-router=menu] > .icon").attr "class", "icon " + el.data("icon")

  _changeCheckboxValue = (event) ->
    event.preventDefault()
    el = lng.dom(this)
    current_value = (if el.val() > 0 then 0 else 1)
    el.toggleClass("active").attr "value", current_value

  init: init
