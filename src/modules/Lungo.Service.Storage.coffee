Lungo.Service.Storage = do(lng = Lungo) ->
    STORAGE =
       PERSISTENT: 'localStorage'
       SESSION: 'sessionStorage'

    persistent = (key,value) ->
        _handler STORAGE.PERSISTENT, key, value

    session = (key,value) ->
        _handler STORAGE.SESSION, key, value
    
    _handler = (storage,key,value) -> 
        storage=window[storage]
        if value
            _saveKey storage, key, value
        else if value is null
            _removeKey storage, key
        else
             _getKey storage, key 

    _saveKey = (storage, key, value) ->
        storage.setItem key, JSON.stringify(value)

    _removeKey = (storage, key) ->
        storage.removeItem key

    _getKey = (storage, key) ->
        return JSON.parse storage.getItem(key)

    session: session
    persistent: persistent
