###
Creates a loading element in any area of layout

@namespace Lungo.Element
@method loading

@param  {string}  Element query selector
@param  {number}  stylesheet (null for hide)

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###


Lungo.Element.loading = (selector, stylesheet) ->
  element = Lungo.dom(selector)
  if element
    html = null
    if stylesheet
      binding = Lungo.Constants.BINDING.SELECTOR
      html = Lungo.Attributes.loading.html.replace(binding, stylesheet)
    element.html html
