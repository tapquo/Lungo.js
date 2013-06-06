###
Instance initializer

@namespace Lungo
@class Init

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###
Lungo.init = (config) ->
  Lungo.Config = config
  Lungo.Resource.load config.resources if config and config.resources
  do Lungo.Boot.Device.init
  isPhone = Lungo.DEVICE is Lungo.Constants.DEVICE.PHONE
  Lungo.Router = if isPhone then Lungo.RouterPhone else Lungo.RouterTablet
  do Lungo.Boot.Events.init
  do Lungo.Boot.Data.init
  do Lungo.Boot.Layout.init
