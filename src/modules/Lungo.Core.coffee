###
Contains all the common functions used in Lungo.

@namespace Lungo
@class Core

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
@author Guillermo Pascual <pasku@tapquo.com> || @pasku1
###

Lungo.Core = do(lng = Lungo, $$ = Quo) ->
  ARRAY_PROTO = Array::

  ###
  Console system to display messages when you are in debug mode.
  @method log
  @param  {number} Severity based in (1)Log, (2)Warn, (>2)Error
  @param  {string} Message to show in console
  ###
  log = (severity, message) ->
    unless lng.Core.isMobile()
      console[(if (severity is 1) then "log" else (if (severity is 2) then "warn" else "error"))] message


  ###
  Executes callbacks based on the parameters received.
  @method execute
  @param  {Function} callback to execute
  ###
  execute = ->
    args = toArray(arguments)
    callback = args.shift()
    callback.apply null, args  if toType(callback) is "function"


  ###
  Creates a new function that, when called, itself calls this function in
  the context of the provided this value, with a given sequence of arguments
  preceding any provided when the new function was called.
  @method bind
  @param  {object} object to which the 'this' can refer in the new function when the new function is called.
  @param  {Function} method A function object.
  ###
  bind = (object, method) ->
    ->
      method.apply object, toArray(arguments)


  ###
  Copy from any number of objects and mix them all into a new object.
  The implementation is simple; just loop through arguments and
  copy every property of every object passed to the function.
  @method mix
  @param  {object} arguments to mix them all into a new object.
  @return {object} child a new object with all the objects from the arguments mixed.
  ###
  mix = ->
    child = child or {}
    arg = 0
    len = arguments.length

    while arg < len
      argument = arguments[arg]
      for prop of argument
        child[prop] = argument[prop]  if isOwnProperty(argument, prop)
      arg++
    child


  ###
  Every object descended from Object inherits the hasOwnProperty method.
  This method can be used to determine whether an object has the specified property
  as a direct property of that object.
  @param  {object} object to test for a property's existence inside itself.
  @param  {string} property the name of the property to test.
  @return {boolean} indicating whether the object has the specified property.
  ###
  isOwnProperty = (object, property) ->
    $$.isOwnProperty object, property


  ###
  Determine the internal JavaScript [[Class]] of an object.
  @param  {object} obj to get the real type of itself.
  @return {string} with the internal JavaScript [[Class]] of itself.
  ###
  toType = (obj) -> $$.toType obj


  ###
  Convert an array-like object into a true JavaScript array.
  @param  {object} obj Any object to turn into a native Array.
  @return {object} The object is now a plain array.
  ###
  toArray = (obj) -> ARRAY_PROTO.slice.call obj, 0


  ###
  Determine if the current environment is a mobile environment
  @method isMobile
  @return {boolean} true if is mobile environment, false if not.
  ###
  isMobile = -> $$.isMobile()


  ###
  Returns information of execute environment
  @method environment
  @return {object} Environment information
  ###
  environment = -> $$.environment()


  ###
  Returns a ordered list of objects by a property
  @method orderByProperty
  @param  {list} List of objects
  @param  {string} Name of property
  @param  {string} Type of order: asc (ascendent) or desc (descendent)
  @return {list} Ordered list
  ###
  orderByProperty = (data, property, order) ->
    order_operator = (if (order is "desc") then -1 else 1)
    data.sort (a, b) ->
      (if (a[property] < b[property]) then -order_operator else (if (a[property] > b[property]) then order_operator else 0))


  ###
  Returns a Object in a list by a property value
  @method objectInListByProperty
  @param  {list} List of objects
  @param  {string} Name of property
  @param  {var} Value for comparision
  @return {object} Instance of object founded (if exists)
  ###
  findByProperty = (list, property, value) ->
    search = null
    i = 0
    len = list.length

    while i < len
      element = list[i]
      if element[property] is value
        search = element
        break
      i++
    search

  log: log
  execute: execute
  bind: bind
  mix: mix
  isOwnProperty: isOwnProperty
  toType: toType
  toArray: toArray
  isMobile: isMobile
  environment: environment
  orderByProperty: orderByProperty
  findByProperty: findByProperty
