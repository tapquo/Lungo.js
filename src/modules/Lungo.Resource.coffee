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
  load = (resource) ->
    if lng.Core.toType(resource) is "array"
      i = 0
      len = resource.length

      while i < len
        _load resource[i]
        i++
    else
      _load resource


  ###
  ###
  _load = (resource) ->
    try
      response = _loadSyncResource(resource)
      _pushResourceInBody response
    catch error
      lng.Core.log 3, error.message

  _loadSyncResource = (url) ->
    $$.ajax
      url: url
      async: false
      dataType: "html"
      error: ->
        console.error ERROR.LOADING_RESOURCE + url


  _pushResourceInBody = (section) ->
    lng.dom(ELEMENT.BODY).append section  if lng.Core.toType(section) is "string"

  load: load
