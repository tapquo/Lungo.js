###
Initialize the automatic DOM UI events

@namespace Lungo.Boot
@class Events

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###

Lungo.Boot.Events = do(lng = Lungo) ->
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
    lng.dom(QUERY.HREF_ROUTER).tap _loadTarget
    lng.dom(QUERY.MENU_HREF).tap _closeMenu
    lng.dom(QUERY.INPUT_CHECKBOX).tap _changeCheckboxValue

  _loadTarget = (event) ->
    event.preventDefault()
    link = lng.dom(this)
    if link.data("async")
      _loadAsyncTarget link
    else
      _selectTarget link

  _changeCheckboxValue = (event) ->
    event.preventDefault()
    el = lng.dom(this)
    current_value = (if el.val() > 0 then 0 else 1)
    el.toggleClass("active").attr "value", current_value

  _closeMenu = (event) ->
    event.preventDefault()
    el = lng.dom(this)
    parent = el.parent("[data-control=menu]").removeClass(CLASS.SHOW)
    lng.dom("[data-router=menu] > .icon").attr "class", "icon " + el.data("icon")

  _loadAsyncTarget = (link) ->
    lng.Notification.show()
    lng.Resource.load link.data("async")
    link[0].removeAttribute "data-async"
    lng.Boot.Data.init link.attr(ATTRIBUTE.HREF)
    setTimeout (->
      _selectTarget link
      lng.Notification.hide()
    ), lng.Constants.TRANSITION.DURATION * 2

  _selectTarget = (link) ->
    lng.View.Aside.hide()  if link.closest(ELEMENT.ASIDE).length > 0
    target_type = link.data(ATTRIBUTE.ROUTER)
    target_id = link.attr(ATTRIBUTE.HREF)
    switch target_type
      when ELEMENT.SECTION
        _goSection target_id
      when ELEMENT.ARTICLE
        _goArticle link
      when ELEMENT.ASIDE
        lng.View.Aside.toggle()
      when ELEMENT.MENU
        _goMenu target_id

  _goSection = (id) ->
    id = lng.Core.parseUrl(id)
    if id is "#back"
      lng.Router.back()
    else
      lng.Router.section id

  _goArticle = (element) ->
    section_id = lng.Router.History.current()
    article_id = element.attr(ATTRIBUTE.HREF)
    lng.Router.article section_id, article_id, element

  _goMenu = (id) ->
    lng.dom("[data-control=menu]" + id).toggleClass CLASS.SHOW

  init: init
