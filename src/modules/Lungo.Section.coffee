###
Initialize the <articles> layout of a certain <section>

@namespace Lungo
@class Section

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Section = do (lng = Lungo) ->

  C = lng.Constants

  show = (current, target) ->
    if lng.DEVICE is C.DEVICE.PHONE then _phone target else _tablet current, target
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

  _tablet = (current, target) -> @



  show: show
