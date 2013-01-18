/**
 * Creates a instance of Pull & Refresh Element
 *
 * @namespace Lungo.Element
 * @class Pull
 * @version 1.0
 *
 * @author Ignacio Olalde <ina@tapquo.com> || @piniphone
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Element.Pull = function(element_selector, config_data) {

    var REFRESHING_HEIGHT = 60;
    var MAX_HEIGHT = 80;
    var ANIMATION_TIME = 300;
    var CURRENT_DISTANCE = 0;
    var REFRESHING = false;
    var ELEMENT = $$(element_selector);
    var CONTAINER = ELEMENT.siblings('div[data-control="pull"]');
    var CONFIG;

    var CONFIG_BASE ={
        onPull: "Pull down to refresh",
        onRelease: "Release to...",
        onRefresh: "Loading...",
        callback: undefined
    };

    CONFIG = Lungo.Core.mix(CONFIG_BASE, config_data);

    var hide = function() {
        _moveElementTo(0, true);
        setTimeout(function() {
            REFRESHING = false;
            document.removeEventListener('touchmove', _blockGestures, false);
        }, ANIMATION_TIME);
        CURRENT_DISTANCE = 0;
    };

    var _moveElementTo = function(posY, animate) {
        var newPos = posY > MAX_HEIGHT ? MAX_HEIGHT : posY;
        if(animate) ELEMENT.addClass('pull');

        ELEMENT.style('-webkit-transform', 'translate(0, ' + (newPos) + 'px)');
        if(animate) {
            setTimeout(function() {
                ELEMENT.removeClass('pull');
            }, ANIMATION_TIME);
        }
    };

    var _refreshStart = function(event) {
        REFRESHING = true;
        document.addEventListener('touchmove', _blockGestures, false);
        _setContainerTitle(CONFIG.onRefresh);
        _setContainerLoading(true);
        _moveElementTo(REFRESHING_HEIGHT, true);

        if (CONFIG.callback) {
            CONFIG.callback.apply(this);
        }
    };

    var _setContainerTitle = function(title) {
        CONTAINER.find('strong').html(title);
    };

    var _setContainerLoading = function(op) {
        if (op) {
            CONTAINER.addClass("refresh");
        } else {
            CONTAINER.removeClass("refresh");
        }
    };

    var _setContainerOnPulling = function(op) {
        if (op) {
            CONTAINER.addClass("rotate");
        } else {
            CONTAINER.removeClass("rotate");
        }
    };

    var _blockGestures = function(touchEvent) {
        touchEvent.preventDefault();
    };

    var _handlePulling = function(event) {
        _moveElementTo(CURRENT_DISTANCE, false);
        _setContainerLoading(false);
        if (CURRENT_DISTANCE > REFRESHING_HEIGHT) {
            _setContainerTitle(CONFIG.onRelease);
            _setContainerOnPulling(true);
        } else {
            _setContainerTitle(CONFIG.onPull);
            _setContainerOnPulling(false);
        }
    };

    var _handlePullEnd = function(event) {
        if(CURRENT_DISTANCE > REFRESHING_HEIGHT) _refreshStart(); else hide();
    };

    (function() {
        var STARTED = false;
        var INI_Y = {};
        ELEMENT.bind('touchstart', function(event) {
            if(ELEMENT[0].scrollTop <= 1) {
                STARTED = true;
                INI_Y = $$.isMobile() ? event.touches[0].pageY : event.pageY;
            }
        }).bind('touchmove', function(event) {
            if(!REFRESHING && STARTED) {
                current_y = $$.isMobile() ? event.touches[0].pageY : event.pageY;
                CURRENT_DISTANCE = current_y - INI_Y;
                if(CURRENT_DISTANCE >= 0) {
                    ELEMENT.style('overflow-y', 'hidden');
                    _handlePulling();
                }
            }
        }).bind('touchend', function() {
            if(STARTED) {
                ELEMENT.style('overflow-y', 'scroll');
                _handlePullEnd();
            }
            INI_TOUCH = {};
            STARTED = false;
        });
    })();

    return {
        hide: hide
    };
};
