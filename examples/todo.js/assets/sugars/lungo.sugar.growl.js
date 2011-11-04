/** 
 * Description or Responsability 
 * 
 * @namespace LUNGO.Sugar
 * @class Growl
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Sugar.Growl = (function(lng, undefined) {
    var _options = [];

    var SELECTOR = {
        BODY: 'body',
        GROWL: '.growl',
        MODAL: '.growl .modal',
        NOTIFY: '.growl .notify',
        MODAL_HREF: '.growl .modal a'
    }

    var CSS_CLASS = {
        VISIBLE: 'visible',
        SHOW: 'show',
        HIDE: 'hide',
        WORKING: 'working',
        INPUT: 'input'
    }

    var CALLBACK_HIDE = 'LUNGO.Sugar.Growl.hide()';
    var MARKUP_GROWL = '<div class="growl"><div class="modal"></div><div class="notify"></div></div>';

    var show = function(title, icon, animate, seconds, callback) {
        _showGrowlModal(true);
        
        var modal = $(SELECTOR.MODAL);
        modal.removeClass(CSS_CLASS.SHOW);
        modal.removeClass(CSS_CLASS.INPUT);
        modal.html('<span class="big icon ' + icon + '"></span><strong>' + title + '<strong>');
        _animate(modal, animate);
        modal.show().addClass(CSS_CLASS.SHOW);

        _auto_hide(seconds, callback);
    };

    var hide = function() {
        _hide_children();

        setTimeout(function() {
            $(SELECTOR.GROWL).hide();
        }, 100);
    };

    var notify = function(title, description, icon, type, seconds, callback) {
        _showGrowlModal(false);

        var notify = $(SELECTOR.NOTIFY);
        if (type) {
            notify.addClass(type);
        }
        notify.html('<span class="icon ' + icon + '"></span><strong>' + title + '</strong><br/><em>' + description + '</strong>');

        setTimeout(function() {
            notify.addClass(CSS_CLASS.SHOW);
        }, 300);

        _auto_hide(seconds, callback);
    };

    var option = function(title, options) {
        _showGrowlModal(true);

        _options = options;

        $(SELECTOR.MODAL).removeClass(CSS_CLASS.WORKING).removeClass(CSS_CLASS.SHOW);
        
        var buttons = _createButtons(options);
        $(SELECTOR.MODAL).addClass('input').html('<span class="title">' + title + '</span>' + buttons);
        $('.growl .modal').show().addClass('show');
    };

    var _init = function() {
        //TODO: Append stylesheet (.less)
        $(SELECTOR.BODY).append(MARKUP_GROWL);
        _subscribeEvents();
    };

    var _showGrowlModal = function(modal) {
        var growl = $(SELECTOR.GROWL);
        if (!growl.is(CSS_CLASS.VISIBLE)) {
            growl.show();
        }
        if (modal) {
            growl.addClass('modal');
        }
    };

    var _animate = function(element, animate) {
        if (animate) {
            element.addClass(CSS_CLASS.WORKING);
        }
        else {
            element.removeClass(CSS_CLASS.WORKING);
        }
    };

    var _createButtons = function(options) {
        var buttons = '';
        for (var i = 0, len = options.length; i < len; i++) {
            buttons += _option_button(options[i].color, 'growl_option_' + i, options[i].icon, options[i].name);
        };
        buttons += _option_button('red', undefined, 'cancel', 'Cancel');

        return buttons;
    };

    var _option_button = function(color, id, icon, label) {
        id = (id !== undefined) ? 'id="' + id + '"' : '';
        return '<a href="#" ' + id + ' class="button ' + color + '"><span class="icon ' + icon + '"></span>' + label + '</a>';
    };

    var _auto_hide = function(seconds, callback) {
        if (seconds != undefined && seconds != 0) {
            if (callback === undefined) {
                callback = CALLBACK_HIDE;
            }
            setTimeout(callback, seconds * 1000);
        }
    };

    var _hide_children = function() {
        _hide_child(SELECTOR.MODAL);
        _hide_child(SELECTOR.NOTIFY);
    };

    var _hide_child = function(selector) {
        var child = $(selector);
        if (child.hasClass(CSS_CLASS.SHOW)) {
            child.removeClass(CSS_CLASS.SHOW);
            //child.removeClass(CSS_CLASS.INPUT).html('');
        }
    };

    var _subscribeEvents = function() {
        //BINDING EVENT
        //CF.app.EVENTS.touch
        $(SELECTOR.NOTIFY).bind('click', function() {
            $(SELECTOR.NOTIFY).removeClass(CSS_CLASS.SHOW);
        });


        $('.growl .modal a').live('click', function(event) {
            if ($(this).attr('id') !== ''){
                id = $(this).attr('id').replace(/growl_option_/g, '');
                setTimeout(_options[id].callback, 100);
            } else {
                event.preventDefault();
                hide();
                return false;
            }
        });
    };

    _init();

    return {
        show: show,
        hide: hide,
        notify: notify,
        option: option
    }
})(LUNGO);