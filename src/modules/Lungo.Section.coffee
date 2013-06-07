###
Initialize the <articles> layout of a certain <section>

@namespace Lungo
@class Section

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Section = do (lng = Lungo) ->

  C = lng.Constants

  show = (current, target, backward=false) ->
    if lng.DEVICE is C.DEVICE.PHONE then _phone target else _tablet current, target, backward
    lng.Element.Cache.section = target

    active_article = target.find "#{C.ELEMENT.ARTICLE}.#{C.CLASS.ACTIVE}"
    if active_article.length is 0
      active_article = target.find(C.ELEMENT.ARTICLE).first().addClass(C.CLASS.ACTIVE)

    lng.Element.Cache.article = active_article
    current.trigger C.TRIGGER.UNLOAD if current
    target.trigger C.TRIGGER.LOAD

  ###
  Private methods
  ###
  _phone = (target) ->
    target.addClass(C.CLASS.SHOW)

  _tablet = (current, target, backward) ->
    target.addClass(C.CLASS.SHOW)
    if not _targetIsChildren target
      same_aside = _targetHasSameAside target
      # console.error "Same aside --> ", same_aside
      current?.removeClass(C.CLASS.SHOW)
      lng.Element.Cache.aside?.removeClass("show").removeClass("box")
      lng.Element.Cache.aside = undefined

  _targetIsChildren = (target) ->
    children = lng.Element.Cache.section?.data("children")
    return false unless children
    target_id = target.attr "id"
    return children.indexOf(target_id) isnt -1

  _targetHasSameAside = (target) ->
    current_aside_id = lng.Element.Cache.aside?.attr("id")
    return false unless current_aside_id
    return current_aside_id is target.data("aside")


  show: show
