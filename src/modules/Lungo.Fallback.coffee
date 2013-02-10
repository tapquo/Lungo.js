###
?

@namespace Lungo
@class Fallback

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###
Lungo.Fallback = do(lng = Lungo) ->
  fixPositionInAndroid = ->
    env = lng.Core.environment()
    _data "position", (if (env.isMobile and env.os.name is "Android" and env.os.version < "3") then "absolute" else "fixed")

  _data = (key, value) ->
    lng.dom(document.body).data key, value

  fixPositionInAndroid: fixPositionInAndroid
