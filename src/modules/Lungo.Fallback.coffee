###
?

@namespace Lungo
@class Fallback

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###
Lungo.Fallback = do(lng = Lungo) ->

  fixPositionInAndroid = ->
    env = lng.Core.environment()
    position = if env.isMobile and env.os.name is "Android" and env.os.version < "3" then "absolute" else "fixed"
    lng.dom(document.body).data "position", position

  fixPositionInAndroid: fixPositionInAndroid
