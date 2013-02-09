/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace Lungo.View
 * @class Aside
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.View.Aside = (function(lng, undefined) {

    var ELEMENT = lng.Constants.ELEMENT;
    var CLASS = lng.Constants.CLASS;
    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var DEVICE = lng.Constants.DEVICE;
    var QUERY = lng.Constants.QUERY;
    var TRANSITION = lng.Constants.TRANSITION.DURATION;

    /**
     * Active aside for a determinate section
     *
     * @method active
     *
     * @param  {object} Section element
     */

    var active = function(section) {
        var aside_id = section.data('aside');
        var current_aside = lng.Element.Cache.aside;

        // Deactive
        if ((current_aside && aside_id != current_aside.attr('id')) || aside_id === undefined) {
            current_aside.removeClass(CLASS.SHOW).removeClass(CLASS.ACTIVE);
            lng.Element.Cache.aside = undefined;
        }

        // Active
        if (aside_id) {
            lng.Element.Cache.aside = lng.dom(ELEMENT.ASIDE + '#' + aside_id);
            lng.Element.Cache.aside.addClass(CLASS.ACTIVE);
            if (lng.DEVICE != DEVICE.PHONE) lng.View.Aside.show(aside_id);
        }

        return lng.Element.Cache.aside;
    };

    /**
     * Toggle an aside element
     *
     * @method toggle
     *
     * @param  {string} Aside id
     */
    var toggle = function() {
        if (lng.Element.Cache.aside) {
            var is_visible = lng.Element.Cache.aside.hasClass(CLASS.SHOW);
            if (is_visible) {
                lng.View.Aside.hide();
            } else {
                lng.View.Aside.show();
            }
        }
    };

    /**
     * Display an aside element with a particular <section>
     *
     * @method show
     */
    var show = function(aside) {
        if (lng.Element.Cache.aside) {
            setTimeout(function() {
                lng.Element.Cache.aside.addClass(CLASS.SHOW);
            }, TRANSITION);

            if (lng.DEVICE == DEVICE.PHONE) {
                lng.Element.Cache.aside.addClass(CLASS.SHOW);

                var aside_stylesheet = _asideStylesheet();
                lng.Element.Cache.section.addClass(aside_stylesheet).addClass(CLASS.ASIDE);
            }
        }
    };

    /**
     * Hide an aside element with a particular section
     *
     * @method hide
     */
    var hide = function() {
        if (lng.Element.Cache.aside) {
            if (lng.DEVICE == DEVICE.PHONE) {
                var aside_stylesheet = _asideStylesheet();
                lng.Element.Cache.section.removeClass(CLASS.ASIDE);

                setTimeout(function() {
                    lng.Element.Cache.aside.removeClass(CLASS.SHOW);
                }, TRANSITION);
            }
        }
    };

    /**
     * @todo
     *
     * @method suscribeEvents
     */
    var draggable = function() {
        var MIN_XDIFF = parseInt(document.body.getBoundingClientRect().width / 3, 10);
        MIN_XDIFF = 128;

        lng.dom(QUERY.HREF_ASIDE).each(function() {
            var STARTED = false;
            var el = lng.dom(this);
            var section = el.closest("section");
            var aside = lng.dom("aside#" + el.data("aside"));

            section.swiping(function(gesture) {
                if(!section.hasClass("aside")) {
                    var xdiff =  gesture.currentTouch.x - gesture.iniTouch.x;
                    var ydiff =  Math.abs(gesture.currentTouch.y - gesture.iniTouch.y);
                    STARTED = STARTED ? true : xdiff > 3*ydiff && xdiff < 50;
                    if(STARTED) {
                        xdiff = xdiff > 256 ? 256 : xdiff < 0 ? 0 : xdiff;
                        aside.addClass(CLASS.SHOW);
                        section.vendor('transform', 'translateX(' + xdiff + 'px)');
                        section.vendor('transition-duration', '0s');
                    } else {
                        section.attr('style', '');
                    }
                }
            });

            section.swipe(function(gesture) {
                var diff = gesture.currentTouch.x - gesture.iniTouch.x;
                var ydiff =  Math.abs(gesture.currentTouch.y - gesture.iniTouch.y);
                section.attr('style', '');
                if(diff > MIN_XDIFF && STARTED) show(aside);
                else hide(aside);
                STARTED = false;
            });
        });
    };

    var _asideStylesheet = function() {
        var aside_stylesheet = lng.Element.Cache.aside.attr(ATTRIBUTE.CLASS);
        var classes = '';

        //@todo: Refactor
        if (aside_stylesheet) {
            classes += (aside_stylesheet.indexOf(CLASS.RIGHT) > -1) ? CLASS.RIGHT + ' ': '';
            classes += (aside_stylesheet.indexOf(CLASS.SMALL) > -1) ? CLASS.SMALL + ' ': '';
        }

        return classes;
    };

    return {
        active: active,
        toggle: toggle,
        show: show,
        hide: hide,
        draggable: draggable
    };

})(Lungo);
