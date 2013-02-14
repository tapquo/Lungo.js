###
Stores the displayed <sections> as a historical.

@namespace Lungo.Router
@class History

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###

Lungo.Router.History = do (lng = Lungo) ->
  _history = []

  ###
  Create a new element to the browsing history based on the current section id.
  @method add
  @param  {string} Id of the section
  ###
  add = (section_id) ->
    _history.push section_id if section_id isnt current()

  ###
  Returns the current browsing history section id.
  @method current
  @return {string} Current section id
  ###
  current = ->
    _history[_history.length - 1]


  ###
  Removes the current item browsing history.
  @method removeLast
  ###
  removeLast = ->
    _history.length -= 1

  ###
  @todo
  ###
  url = ->
    _url = ""
    _url += "#{section}/" for section in _history
    _url += lng.Element.Cache.article.attr "id"
    setTimeout (-> window.location.hash = _url), 0


  add: add
  current: current
  removeLast: removeLast
  url: url
