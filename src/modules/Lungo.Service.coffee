###
External Data & Services Manager

@namespace Lungo
@class Service
@requires QuoJS

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###

Lungo.Service = do(lng = Lungo, $$ = Quo) ->
  URL_CACHE_INDEX_KEY = "lungojs_service_cache"
  DATE_PATTERN =
    MINUTE: "minute"
    HOUR: "hour"
    DAY: "day"


  ###
  Load data from the server using a HTTP GET request.

  @method get

  @param  {string} Containing the URL to which the request is sent
  @param  {object} A map or string that is sent to the server with the request
  @param  {Function} Callback function after the request [OPTIONAL]
  @param  {string} Mime-Type: json, xml, html, or text [OPTIONAL]
  ###
  get = (url, data, success, dataType) ->
    $$.get url, data, success, dataType


  ###
  Load data from the server using a HTTP POST request.

  @method post

  @param  {string} Containing the URL to which the request is sent
  @param  {object} A map or string that is sent to the server with the request
  @param  {Function} Callback function after the request [OPTIONAL]
  @param  {string} Mime-Type: json, xml, html, or text [OPTIONAL]
  ###
  post = (url, data, success, dataType) ->
    $$.post url, data, success, dataType


  ###
  Load data from the server using a HTTP GET request.

  @method json

  @param  {string} Containing the URL to which the request is sent
  @param  {object} A map or string that is sent to the server with the request
  @param  {Function} [OPTIONAL] Callback function after the request
  ###
  json = (url, data, success) ->
    $$.json url, data, success


  ###
  Auto-caching system with date pattern.

  @method cache

  @param  {string} Containing the URL to which the request is sent
  @param  {object} A map or string that is sent to the server with the request
  @param  {string} Date pattern (example: 15 minutes, 1 hour, 3 days)
  @param  {Function} [OPTIONAL] Callback function after the request
  @param  {string} Mime-Type: json, xml, html, or text [OPTIONAL]
  ###
  cache = (url, data, date_pattern, callback, dataType) ->
    url_key = url + $$.serializeParameters(data)
    if _urlCached(url_key, date_pattern)
      value = lng.Data.Storage.persistent(url_key)
      callback.call callback, value  if value
    else
      $$.get url, data, ((result) ->
        _saveServiceInCache url_key, result
        callback.call callback, result
      ), dataType

  _urlCached = (url, date_pattern) ->
    in_cache = false
    url_cache_index = lng.Data.Storage.persistent(URL_CACHE_INDEX_KEY)
    if url_cache_index
      time_between = _calculateTimeSpent(url_cache_index[url])
      in_cache = _checkIsValidPattern(time_between, date_pattern)
    in_cache

  _calculateTimeSpent = (url_last_access) ->
    now = new Date().getTime()
    service_last_access = new Date(url_last_access).getTime()
    now - service_last_access

  _checkIsValidPattern = (time_between, date_pattern) ->
    pattern = date_pattern.split(" ")
    diference_time = _calculateDiferenceTime(pattern[1], time_between)
    (if (diference_time < pattern[0]) then true else false)

  _calculateDiferenceTime = (pattern_name, time_between) ->
    diference = (time_between / 1000) / 60
    if pattern_name.indexOf(DATE_PATTERN.HOUR) >= 0
      diference = diference / 60
    else diference = (diference / 60) / 24  if pattern_name.indexOf(DATE_PATTERN.DAY) >= 0
    diference

  _saveServiceInCache = (url, result) ->
    service_cache_index = lng.Data.Storage.persistent(URL_CACHE_INDEX_KEY) or {}
    service_cache_index[url] = new Date()
    lng.Data.Storage.persistent URL_CACHE_INDEX_KEY, service_cache_index
    lng.Data.Storage.persistent url, result

  get: get
  post: post
  json: json
  cache: cache
  Settings: $$.ajaxSettings
