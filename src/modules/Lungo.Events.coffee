###
Event Manager (with delegates)

@namespace Lungo
@class Events

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Events = do(lng = Lungo) ->

  SPACE_CHAR = " "

  init = (events) ->
    for event of events
      index_of = event.indexOf(SPACE_CHAR)
      if index_of > 0
        event_name = event.substring(0, index_of)
        element = event.substring(index_of + 1)
        lng.dom(document.body).delegate element, event_name, events[event]

  init: init
