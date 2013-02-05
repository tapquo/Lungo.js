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


    /**
     * Toggle an aside element
     *
     * @method toggle
     *
     * @param  {string} Aside id
     */
    var toggle = function(aside_id) {
        aside = _findAside(aside_id);
        if (aside) {
            var is_visible = aside.hasClass(CLASS.SHOW);
            if (is_visible) {
                lng.View.Aside.hide();
            } else {
                lng.View.Aside.show(aside);
            }
        }
        aside = null;
    };

    /**
     * Display an aside element with a particular <section>
     *
     * @method show
     *
     * @param  {string} Aside id
     */
    var show = function(aside) {
        if (lng.Core.toType(aside) == 'string') aside = _findAside(lng.Core.parseUrl(aside));
        if (aside) {
            lng.Element.Cache.aside = aside;

            aside.addClass(CLASS.SHOW);
            if (lng.DEVICE == DEVICE.PHONE) {
                var aside_stylesheet = _asideStylesheet(aside);
                lng.Element.Cache.section.addClass(aside_stylesheet).addClass(CLASS.ASIDE);
            }
        }

        aside = null;
    };

    /**
     * Hide an aside element with a particular section
     *
     * @method hide
     */
    var hide = function(target) {
        if (lng.DEVICE == DEVICE.PHONE) {

            var aside = target || lng.Element.Cache.aside;
            if (aside) {
                lng.Element.Cache.section.removeClass(CLASS.ASIDE).removeClass(CLASS.RIGHT).removeClass(CLASS.SMALL);

                var aside_stylesheet = _asideStylesheet(aside);
                if (aside_stylesheet) {
                    lng.Element.Cache.section.removeClass(aside_stylesheet);
                }

                setTimeout(function() {
                    lng.Element.Cache.aside = null;
                    aside.removeClass(CLASS.SHOW);
                }, lng.Constants.TRANSITION.DURATION);

            }
        }
    };

    /**
     * @todo
     *
     * @method suscribeEvents
     */
    var suscribeEvents = function() {

        var MIN_XDIFF = parseInt(document.body.getBoundingClientRect().width / 3, 10);
        lng.dom(QUERY.HREF_ASIDE).each(function() {
            var STARTED = false;
            var a = lng.dom(this);
            var section = a.closest("section");
            var aside = lng.dom(a.attr("href"));

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

    var _findAside = function(aside_id) {
        var aside = null;
        var asides = lng.dom(ELEMENT.ASIDE);

        if (asides.length == 1) {
            var current_id = '#' + asides[0].id ;
            if (current_id == aside_id) {
                aside = lng.dom(asides[0]);
            }
        }
        else if (asides.length > 1) {
            aside = asides.siblings(ELEMENT.ASIDE + aside_id);
        }

        return aside;
    };

    var _asideStylesheet = function(aside) {
        var aside_stylesheet = aside.attr(ATTRIBUTE.CLASS);
        var classes = '';

        //@todo: Refactor
        if (aside_stylesheet) {
            classes += (aside_stylesheet.indexOf(CLASS.RIGHT) > -1) ? CLASS.RIGHT + ' ': '';
            classes += (aside_stylesheet.indexOf(CLASS.SMALL) > -1) ? CLASS.SMALL + ' ': '';
        }

        return classes;
    };

    return {
        suscribeEvents: suscribeEvents,
        toggle: toggle,
        show: show,
        hide: hide
    };

})(Lungo);
