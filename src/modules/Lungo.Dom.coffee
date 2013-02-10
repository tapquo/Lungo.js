###
LungoJS Dom Handler

@namespace Lungo
@class Dom

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

###
Add an event listener
@method dom
@param  {string} DOM selector
@return {Object} QuoJS instance
###
Lungo.dom = (selector) ->
  $$ selector
