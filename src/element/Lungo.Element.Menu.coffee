###
Set a progress to the element

@namespace Lungo.Element
@method Menu

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###


Lungo.Element.Menu = do (lng = Lungo) ->

  C = lng.Constants


  ###
  Displays the <data-control-menu> with a determinate Id
  @method   show
  @param    {string} <data-control-menu> Id
  ###
  show = (id) ->
    element = @_instance id
    if element then element.addClass C.CLASS.SHOW

  ###
  Hides the <data-control-menu> with a determinate Id
  @method   hide
  @param    {string} <data-control-menu> Id
  ###
  hide = (id) ->
    element = @_instance id
    if element then element.removeClass C.CLASS.SHOW

  ###
  Toggles the <data-control-menu> with a determinate Id
  @method   toggle
  @param    {string} <data-control-menu> Id
  ###
  toggle = (id) ->
    element = @_instance id
    if element
      if element.hasClass C.CLASS.SHOW then @show id else @hide id

  _instance: (id) -> Lungo.dom "#{C.CONTROL.MENU}##{id}"

  show  : show
  hide  : hide
  toggle: toggle
