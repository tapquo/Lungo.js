###
Load Resources

@namespace Lungo
@class Resource

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###


Lungo.Resource = do(lng = Lungo, $$ = Quo) ->
  ELEMENT = lng.Constants.ELEMENT
  ERROR = lng.Constants.ERROR

  ###
  Start loading async sections (local & remote)

  @method start
  ###
  load = (resource, container) ->
    if lng.Core.toType(resource) is "array"
      i = 0
      len = resource.length

      while i < len
        _load resource[i]
        i++
    else
      _load resource, container


  ###
  @todo
  ###
  _load = (resource, container) ->
    try
      _pushResourceInBody _loadSyncResource(resource), container
    catch error
      lng.Core.log 3, error.message

  _loadSyncResource = (url) ->
    $$.ajax
      url: url
      async: false
      dataType: "html"
      error: ->
        console.error ERROR.LOADING_RESOURCE + url

  _pushResourceInBody = (markup, container) ->
    if lng.Core.toType(markup) is "string"
      container = (if container then container else ELEMENT.BODY)
      lng.dom(container).append markup

  load: load
