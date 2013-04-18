###
Make an analysis of Data attributes in HTML elements and creates a <markup>
based on each data type.

@namespace Lungo.Boot
@class Data

@author Javier Jimenez Villar <javi@tapquo.com>  || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com>     || @pasku1
@author Ignacio Olalde <ina@tapquo.com>          || @piniphone
###

Lungo.Boot.Data = do(lng = Lungo) ->
  BINDING = lng.Constants.BINDING

  ###
  Initialize the <markup> data-attributes analisys
  @method init
  ###
  init = (selector) ->
    el = lng.dom(selector or document.body)
    _findDataAttributesIn el if el.length > 0

  _findDataAttributesIn = (element) ->
    for key of lng.Attributes
      _findElements element, key  if lng.Core.isOwnProperty(lng.Attributes, key)

  _findElements = (element, key) ->
    attribute = lng.Attributes[key]
    selector = attribute.selector + "[data-" + key + "]"
    element.find(selector).each (index, children) ->
      el = lng.dom(children)
      _bindDataAttribute el, el.data(key), attribute.html
    _bindDataAttribute(element, element.data(key), attribute.html) if element.data(key)?

  _bindDataAttribute = (element, value, html) ->
    element.prepend html.replace(/\{\{value\}\}/g, value)

  init: init
