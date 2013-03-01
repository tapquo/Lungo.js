###
Temporary cache system

@namespace Lungo
@class Cache

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###

Lungo.Cache = do(lng = Lungo) ->
  _cache = {}

  ###
  Sets in the LungoJS cache system a new key/value
  @method set
  @param {string} Key for the new value
  @param {object} Type of environment: DESKTOP_ENVIRONMENT or MOBILE_ENVIRONMENT
  ###
  set = (key, value) ->
    if exists(key)
      _cache[key] = lng.Core.mix(get(key), value)
    else
      _cache[key] = value


  ###
  Returns the value of a given key.
  @method get
  @param {string} Key in LungoJS Cache System
  @param {string} [OPTIONAL] Subkey in LungoJS Cache System
  @return {object} Value
  ###
  get = (key, value) ->
    if arguments.length is 1
      _cache[key]
    else
      (if (_cache[arguments[0]]) then _cache[arguments[0]][arguments[1]] else undefined)


  ###
  Removes the instance in LungoJs Cache System of a given key
  @method remove
  @param {string} Key in LungoJS Cache System
  @param {string} [OPTIONAL] Subkey in LungoJS Cache System
  ###
  remove = (key, value) ->
    if arguments.length is 1
      delete _cache[key]
    else
      delete _cache[arguments[0]][arguments[1]]


  ###
  Returns the existence of a key in LungoJs Cache System
  @method exists
  @param {String} Key in LungoJS Cache System
  @return {Boolean} true if exists, false if not
  ###
  exists = (key) ->
    (if (_cache[key]) then true else false)

  set: set
  get: get
  remove: remove
  exists: exists
