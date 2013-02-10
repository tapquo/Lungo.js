###
Instance initializer

@namespace Lungo
@class Init

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###
Lungo.init = (config) ->
  Lungo.Resource.load config.resources  if config and config.resources
  Lungo.Boot.Device.init()
  Lungo.Boot.Events.init()
  Lungo.Boot.Data.init()
  Lungo.Boot.Layout.init()
