###
Wrapper for using LocalStorage & SessionStorage (HTML5 Feature)

@namespace Lungo.Data
@class Storage

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###

Lungo.Data.Storage = do (lng = Lungo) ->
  STORAGE =
    PERSISTENT: "localStorage"
    SESSION: "sessionStorage"


  ###
  Wrapper for SessionStorage
  @method persistent
  @param {string} Key
  @param {object} Value
  @return {string} If no value assigned returns the value of established key
  ###
  persistent = (key, value) -> _handler STORAGE.PERSISTENT, key, value


  ###
  Wrapper for SessionStorage
  @method session
  @param {string} Key
  @param {object} Value
  @return {string} If no value assigned returns the value of established key
  ###
  session = (key, value) -> _handler STORAGE.SESSION, key, value


  _handler = (storage, key, value) ->
    storage = window[storage]
    if value
      _saveKey storage, key, value
    else if value is null
      _removeKey storage, key
    else
      _getKey storage, key

  _saveKey = (storage, key, value) ->
    value = JSON.stringify(value)
    storage.setItem key, value

  _removeKey = (storage, key) ->
    storage.removeItem key

  _getKey = (storage, key) ->
    value = storage.getItem(key)
    JSON.parse value

  session: session
  persistent: persistent
