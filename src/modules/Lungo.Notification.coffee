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
  ATTRIBUTE = lng.Constants.ATTRIBUTE
  BINDING = lng.Constants.BINDING
  TRANSITION = lng.Constants.TRANSITION

  SELECTOR =
    BODY: "body"
    NOTIFICATION: ".notification"
    MODAL: ".notification .window"
    MODAL_HREF: ".notification .window a"
    WINDOW_CLOSABLE: ".notification [data-action=close], .notification > .error, .notification > .success"
    CONFIRM_BUTTONS: ".notification .confirm button, .notification .push"

  STYLE =
    MODAL: "modal"
    VISIBLE: "visible"
    SHOW: "show"
    WORKING: "working"
    INPUT: "input"

  MARKUP_NOTIFICATION = "<div class=\"notification\"><div class=\"window\"></div></div>"

  ###
  Show a custom message, if no parameters shows a loading window.
  @method   show
  @param    {string} [OPTIONAL] Icon, null for no icon.
  @param    {string} [OPTIONAL] Title
  @param    {number} [OPTIONAL] Seconds to show the notification, 0 for unlimited.
  @param    {function} [OPTIONAL] Callback when notification it's closed
  ###
  show = (icon, title, seconds, callback) ->
    markup = undefined
    if icon?
      markup = _markup(title, null, icon)
    else
      data_loading = lng.Attributes.loading.html
      markup = data_loading.replace(BINDING.START + BINDING.KEY + BINDING.END, "white")
    _show markup, "growl"
    _hide seconds, callback


  ###
  Hides the current notification.
  @method   hide
  ###
  hide = ->
    _window.removeClass("show")
    setTimeout (->
      _el.removeClass("show").removeClass("html").removeClass("confirm").removeClass("notify").removeClass "growl"
    ), (TRANSITION.DURATION / 2)


  ###
  @method   confirm
  @param    {object} the notification's config.
  ###
  confirm = (options) ->
    _options = options
    markup = _markup(options.title, options.description, options.icon)
    markup += _button_markup(options.accept, "accept")
    markup += _button_markup(options.cancel, "cancel")
    _show markup, "confirm"


  ###
  Shows an success notification.
  @method   show
  @param    {string} Notification's title.
  @param    {string} Notification's description.
  @param    {string} The icon, null for no icon.
  @param    {number} The time to show the notification, 0 for unlimited.
  @param    {function} A function to execute when hiding the notification.
  ###
  success = (title, description, icon = "ok", seconds, callback) ->
    _notify title, description, icon, "success", seconds, callback


  ###
  Shows an error notification.
  @method   hide
  @param    {string} Notification's title.
  @param    {string} Notification's description.
  @param    {string} The icon, null for no icon.
  @param    {number} The time to show the notification, 0 for unlimited.
  @param    {function} A function to execute when hiding the notification.
  ###
  error = (title, description, icon = "remove-sign", seconds, callback) ->
    _notify title, description, icon, "error", seconds, callback


  ###
  Creates a notification using your own html code.
  @method   html
  @param    {string} The html code for the notification.
  @param    {string} The closing button text.
  @param    {string} Specific style for notification
  @param    {number} The time to show the notification, 0 for unlimited.
  ###
  html = (markup, button, style, seconds) ->
    if button
      markup += """<button class="anchor" data-action="close">#{button}</button>"""
    _show markup, "html #{style}"
    _hide seconds

  ###
  Creates a non-obstructive notification
  @method   hide
  @param    {string} Notification's title.
  @param    {string} The icon, null for no icon.
  @param    {string} Specific style for notification
  ###
  push = (title, icon, style) ->
    _show _markup(title, null, icon), "push #{style}", false
    _hide 5

  _init = ->
    lng.dom(SELECTOR.BODY).append MARKUP_NOTIFICATION
    _el = lng.dom(SELECTOR.NOTIFICATION)
    _window = _el.children(".window")
    _subscribeEvents()

  _show = (html, stylesheet, block = true) ->
    if block then _el.removeClass "push" else _el.addClass "push"

    unless _window.hasClass("show")
      _el.addClass("show")
    else
      _window.removeClass STYLE.SHOW

    setTimeout (->
      _window.html html
      _window.attr "class", "window #{stylesheet} show"
    ), (TRANSITION.DURATION / 2)

  _hide = (seconds, callback) ->
    if seconds? and seconds > 0
      setTimeout (=>
        if callback
          callback.call undefined, callback
        else
          do hide
      ), seconds * 1000

  _notify = (title, description, icon, stylesheet, seconds, callback) ->
    _show _markup(title, description, icon), stylesheet
    _hide seconds, callback

  _markup = (title, description, icon) ->
    description = (if not description then "&nbsp;" else description)
    title = (if not title then "&nbsp;" else title)
    "<span class=\"icon " + icon + "\"></span><strong class=\"text bold\">" + title + "</strong><small>" + description + "</small>"

  _button_markup = (options, callback) ->
    """<button data-callback="#{callback}" class="anchor">#{options.label}</a>"""

  _subscribeEvents = ->
    lng.dom(SELECTOR.CONFIRM_BUTTONS).touch (event) ->
      button = lng.dom(this)
      if _options[button.data("callback")]?
        callback = _options[button.data("callback")].callback
        _options = null
        callback?.call undefined, callback
      hide()

    lng.dom(SELECTOR.WINDOW_CLOSABLE).tap hide

  _init()

  show: show
  hide: hide
  error: error
  success: success
  confirm: confirm
  html: html
  push: push
