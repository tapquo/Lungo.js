###
@todo

@namespace Lungo.Boot
@class Device

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Boot.Device = do(lng = Lungo) ->
  DEVICE = lng.Constants.DEVICE

  ###
  @todo
  @method init
  ###
  init = ->
    env = lng.Core.environment()
    lng.DEVICE = (if env.screen.width < 768 then DEVICE.PHONE else DEVICE.TABLET)

    body = lng.dom document.body
    body.data "device", lng.DEVICE

    if env.os then body.data "os", env.os.name.toLowerCase()
    lng.Aside.draggable() if lng.DEVICE is lng.Constants.DEVICE.PHONE

  init: init
