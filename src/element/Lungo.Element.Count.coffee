###
Set a counter to the element

@namespace Lungo.Element
@class count

@param  {string} Element query selector
@param  {number} Value for counter

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###


Lungo.Element.count = (selector, count) ->
  element = Lungo.dom(selector)
  if element
    element.children(".tag.count").remove()
    if count
      binding = Lungo.Constants.BINDING.SELECTOR
      html = Lungo.Attributes.count.html.replace(binding, count)
      element.append html
