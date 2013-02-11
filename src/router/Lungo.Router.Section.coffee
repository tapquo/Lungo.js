###
Initialize the <articles> layout of a certain <section>

@namespace Lungo.View
@class Section

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Section = do(lng = Lungo) ->
  C = lng.Constants

  show = (current, target) ->
    if lng.DEVICE is C.DEVICE.PHONE then _phone target else _tablet current, target

    lng.Element.Cache.section = target
    lng.Element.Cache.article = target.find "#{C.ELEMENT.ARTICLE}.#{C.CLASS.ACTIVE}"
    lng.Element.Cache.aside = lng.Aside.active target

    current.trigger C.TRIGGER.UNLOAD if current
    target.trigger C.TRIGGER.LOAD


  defineTransition = (target, current) ->
    target_transition = target.data C.ATTRIBUTE.TRANSITION
    if target_transition
      _assignTransitionOrigin current
      assignTransition current, target_transition


  assignTransition = (section, transitionName) ->
    section.data C.ATTRIBUTE.TRANSITION, transitionName


  ###
  Private methods
  ###
  _phone = (target) ->
    target.removeClass(C.CLASS.HIDE).addClass(C.CLASS.SHOW)

  _tablet = (current, target) ->
    children = current.data C.ATTRIBUTE.CHILDREN if current
    if current and (not children or children.indexOf(target.attr(C.ATTRIBUTE.ID)) is -1)
      current.addClass C.CLASS.HIDE
      setTimeout (->current.removeClass(C.CLASS.SHOW).removeClass(C.CLASS.HIDE)), C.TRANSITION.DURATION

    setTimeout (-> target.addClass(C.CLASS.SHOW)), C.TRANSITION.DURATION

  _assignTransitionOrigin = (section) ->
    section.data C.TRANSITION.ORIGIN, section.data(C.TRANSITION.ATTR)

  show: show
  defineTransition: defineTransition
  assignTransition: assignTransition
