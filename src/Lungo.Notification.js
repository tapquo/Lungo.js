/**
 * Notification system in CSS3
 *
 * @namespace Lungo
 * @class Notification
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Notification = (function(lng, undefined) {

    var _options = [];
    var _el = null;
    var _window = null;

    var DELAY_TIME = 1;
    var ANIMATION_MILISECONDS = 200;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var BINDING = lng.Constants.BINDING;

    var SELECTOR = {
        BODY: 'body',
        NOTIFICATION: '.notification',
        MODAL: '.notification .window',
        MODAL_HREF: '.notification .window a',
        WINDOW_CLOSABLE: '.notification > [data-action=close], .notification > .error, .notification > .success',
        CONFIRM_BUTTONS: '.notification .confirm a.button'
    };

    var STYLE = {
        MODAL: 'modal',
        VISIBLE: 'visible',
        SHOW: 'show',
        WORKING: 'working',
        INPUT: 'input'
    };

    var CALLBACK_HIDE = 'Lungo.Notification.hide()';
    var MARKUP_NOTIFICATION = '<div class="notification"><div class="window"></div></div>';

    /**
     *
     */
    var show = function(title, icon, seconds, callback) {
        var markup;
        if (title !== undefined) {
            markup = _markup(title, null, icon);
        } else {
            var data_loading = lng.Attributes.Data.loading.html;
            markup = data_loading.replace(BINDING.START + BINDING.KEY + BINDING.END, 'icon white');
        }

        _show(markup, 'growl');
        _hide(seconds, callback);
    };

    /**
     *
     */
    var hide = function() {
        _window.removeClass('show');
        setTimeout(function() {
            _el.style('display', 'none').removeClass('html').removeClass('confirm').removeClass('notify').removeClass('growl');
        }, ANIMATION_MILISECONDS - 50);
    };

    /**
     *
     */
    var confirm = function(options) {
        _options = options;

        var markup = _markup(options.title, options.description, options.icon);
        markup += _button_markup(options.accept, 'accept');
        markup += _button_markup(options.cancel, 'cancel');

        _show(markup, 'confirm');
    };

    /**
     *
     */
    var success = function(title, description, icon, seconds, callback) {
        _notify(title, description, icon, 'success', seconds, callback);
    };

    /**
     *
     */
    var error = function(title, description, icon, seconds, callback) {
        _notify(title, description, icon, 'error', seconds, callback);
    };

    /**
     *
     */
    var _notify = function(title, description, icon, stylesheet, seconds, callback) {
        _show(_markup(title, description, icon), stylesheet);
        if (seconds) {
            _hide(seconds, callback);
        }
    };

    /**
     *
     */
    var html = function(markup, closable) {
        markup += (closable) ? '<a href="#" class="button large anchor" data-action="close">Close</a>' : '';
        _show(markup, 'html');
    };


    var _init = function() {
        lng.dom(SELECTOR.BODY).append(MARKUP_NOTIFICATION);
        _el = lng.dom(SELECTOR.NOTIFICATION);
        _window = _el.children('.window');

        _subscribeEvents();
    };

    var _show = function(html, stylesheet) {
        _el.show();
        _window.removeClass(STYLE.SHOW);
        _window.removeClass('error').removeClass('success').removeClass('html').removeClass('growl');
        _window.addClass(stylesheet);
        _window.html(html);

        setTimeout(function() {
            _window.addClass(STYLE.SHOW);
        }, DELAY_TIME);
    };

    var _hide = function(seconds, callback) {
        if (seconds !== undefined && seconds !== 0) {
            var miliseconds = seconds * 1000;
            setTimeout(function() {
                hide();
                // if (callback) callback.apply(callback);
                if (callback) setTimeout(callback, ANIMATION_MILISECONDS);

            }, miliseconds);
        }
    };

    var _markup = function(title, description, icon) {
        description = !description ? "&nbsp;" : description;
        return '<span class="icon ' + icon + '"></span><strong class="text bold">' + title + '</strong><small>' + description + '</small>';
    };

    var _button_markup = function(options, callback) {
        return '<a href="#" data-callback="' + callback + '" class="button anchor large text thin">' + options.label + '</a>';
    };

    var _subscribeEvents = function() {
        lng.dom(SELECTOR.CONFIRM_BUTTONS).tap(function(event) {
            var button = lng.dom(this);
            var callback = _options[button.data('callback')].callback;
            if (callback) callback.call(callback);
            hide();
        });

        lng.dom(SELECTOR.WINDOW_CLOSABLE).tap( hide );
    };

    _init();

    return {
        show: show,
        hide: hide,
        error: error,
        success: success,
        confirm: confirm,
        html: html
    };

})(Lungo);
