/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace Lungo.View
 * @class Element
 *
 * @author Ignacio Olalde <ina@tapquo.com> || @piniphone
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.View.Pull = function(element_selector, data) {

    var REFRESHING_HEIGHT = 60;
    var MAX_HEIGHT = 100;
    var ANIMATION_TIME = 300;
    var CURRENT_DISTANCE = 0;
    var REFRESHING = false;
    var ELEMENT = $$(element_selector);

    var CONFIG_BASE = {
        pull: {
            title: 'Pull to refresh',
            icon: 'down'
        },
        release: {
            title: 'Release to...',
            icon: 'up'
        },
        refresh: {
            title: 'Refreshing',
            icon: 'home',
            callback: undefined
        }
    };

    CONFIG = Lungo.Core.mix(CONFIG_BASE, data);

    var hide = function() {
        _moveElementTo(0, true);
        setTimeout(function() {
            REFRESHING = false;
            document.removeEventListener('touchmove', _blockGestures, false);
        }, ANIMATION_TIME);

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
        _setContainerHTML(CONFIG.refresh);
        _moveElementTo(REFRESHING_HEIGHT, true);

        CONFIG.refresh.callback.apply(this);
    };

    var _setContainerHTML = function(context) {
        container = ELEMENT.siblings('div.pull');

        container.find('span').attr('class', 'icon ' + context.icon);
        container.find('strong').html(context.title);
    };

    var _blockGestures = function(touchEvent) {
        touchEvent.preventDefault();
    };

    var _handlePulling = function(event) {
        _moveElementTo(CURRENT_DISTANCE, false);
        _setContainerHTML((CURRENT_DISTANCE > REFRESHING_HEIGHT) ? CONFIG.release : CONFIG.pull )
    };

    _handlePullEnd = function(event) {
        if(CURRENT_DISTANCE > REFRESHING_HEIGHT) {
            _refreshStart();
        } else {
            hide();
        }
    };

    var _handleGestures = function() {
        ELEMENT.swiping(function(event) {
            if(ELEMENT[0].scrollTop <= 1 && !REFRESHING) {
                CURRENT_DISTANCE = event.currentTouch.y - event.iniTouch.y;
                if(CURRENT_DISTANCE >= 0) {
                    ELEMENT.style('overflow-y', 'hidden');
                    _handlePulling();
                }
            }
        }).swipe(function(event) {
            ELEMENT.style('overflow-y', 'scroll');
            _handlePullEnd();
        });
    };

    _handleGestures();

    return {
        hide: hide
    };
};