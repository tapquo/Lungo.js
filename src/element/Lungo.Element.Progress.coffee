###
Set a progress to the element

@namespace Lungo.Element
@method Progress

@param  {string}  Element query selector
@param  {number}  Percentage

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###


Lungo.Element.progress = (selector, percentage) ->
  element = Lungo.dom(selector)
  if element
    percentage += Lungo.Constants.ATTRIBUTE.PERCENT
    element.find(".value").style Lungo.Constants.ATTRIBUTE.WIDTH, percentage
