###
Notification system in CSS3

@namespace Lungo
@class Notification

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###

Lungo.Notification = do(lng = Lungo) ->
  _options = []
  _el = null
  _window = null
  DELAY_TIME = 1
  ANIMATION_MILISECONDS = 200
  ATTRIBUTE = lng.Constants.ATTRIBUTE
  BINDING = lng.Constants.BINDING
  SELECTOR =
    BODY: "body"
    NOTIFICATION: ".notification"
    MODAL: ".notification .window"
    MODAL_HREF: ".notification .window a"
    WINDOW_CLOSABLE: ".notification [data-action=close], .notification > .error, .notification > .success"
    CONFIRM_BUTTONS: ".notification .confirm a.button"

  STYLE =
    MODAL: "modal"
    VISIBLE: "visible"
    SHOW: "show"
    WORKING: "working"
    INPUT: "input"

  CALLBACK_HIDE = "Lungo.Notification.hide()"
  MARKUP_NOTIFICATION = "<div class=\"notification\"><div class=\"window\"></div></div>"

  ###
  ###
  show = (title, icon, seconds, callback) ->
    markup = undefined
    if title isnt undefined
      markup = _markup(title, null, icon)
    else
      data_loading = lng.Attributes.loading.html
      markup = data_loading.replace(BINDING.START + BINDING.KEY + BINDING.END, "icon white")
    _show markup, "growl"
    _hide seconds, callback


  ###
  ###
  hide = ->
    _window.removeClass "show"
    setTimeout (->
      _el.style("display", "none").removeClass("html").removeClass("confirm").removeClass("notify").removeClass "growl"
    ), ANIMATION_MILISECONDS - 50


  ###
  ###
  confirm = (options) ->
    _options = options
    markup = _markup(options.title, options.description, options.icon)
    markup += _button_markup(options.accept, "accept")
    markup += _button_markup(options.cancel, "cancel")
    _show markup, "confirm"


  ###
  ###
  success = (title, description, icon, seconds, callback) ->
    _notify title, description, icon, "success", seconds, callback


  ###
  ###
  error = (title, description, icon, seconds, callback) ->
    _notify title, description, icon, "error", seconds, callback


  ###
  ###
  _notify = (title, description, icon, stylesheet, seconds, callback) ->
    _show _markup(title, description, icon), stylesheet
    _hide seconds, callback  if seconds


  ###
  ###
  html = (markup, button) ->
    markup += (if (button) then "<a href=\"#\" class=\"button large anchor\" data-action=\"close\">" + button + "</a>" else "")
    _show markup, "html"

  _init = ->
    lng.dom(SELECTOR.BODY).append MARKUP_NOTIFICATION
    _el = lng.dom(SELECTOR.NOTIFICATION)
    _window = _el.children(".window")
    _subscribeEvents()

  _show = (html, stylesheet) ->
    _el.show()
    _window.removeClass STYLE.SHOW
    _window.removeClass("error").removeClass("success").removeClass("html").removeClass "growl"
    _window.addClass stylesheet
    _window.html html
    setTimeout (->
      _window.addClass STYLE.SHOW
    ), DELAY_TIME

  _hide = (seconds, callback) ->
    if seconds isnt undefined and seconds isnt 0
      miliseconds = seconds * 1000
      setTimeout (->
        hide()

        # if (callback) callback.apply(callback);
        setTimeout callback, ANIMATION_MILISECONDS  if callback
      ), miliseconds

  _markup = (title, description, icon) ->
    description = (if not description then "&nbsp;" else description)
    "<span class=\"icon " + icon + "\"></span><strong class=\"text bold\">" + title + "</strong><small>" + description + "</small>"

  _button_markup = (options, callback) ->
    "<a href=\"#\" data-callback=\"" + callback + "\" class=\"button anchor large text thin\">" + options.label + "</a>"

  _subscribeEvents = ->
    lng.dom(SELECTOR.CONFIRM_BUTTONS).tap (event) ->
      button = lng.dom(this)
      callback = _options[button.data("callback")].callback
      callback.call callback  if callback
      hide()

    lng.dom(SELECTOR.WINDOW_CLOSABLE).tap hide

  _init()
  show: show
  hide: hide
  error: error
  success: success
  confirm: confirm
  html: html
