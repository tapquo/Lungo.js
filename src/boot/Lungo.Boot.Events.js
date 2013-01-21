/**
 * Initialize the automatic DOM UI events
 *
 * @namespace Lungo.Boot
 * @class Events
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

Lungo.Boot.Events = (function(lng, undefined) {

    var ATTRIBUTE = lng.Constants.ATTRIBUTE;
    var CLASS = lng.Constants.CLASS;
    var ELEMENT = lng.Constants.ELEMENT;
    var SELECTORS = {
        HREF_ASIDE: 'header a[href][data-router=aside]',
        HREF_TARGET: 'a[href][data-router]',
        HREF_TARGET_FROM_ASIDE: 'aside a[href][data-router]',
        INPUT_CHECKBOX: 'input[type=range].checkbox'
    };

    /**
     * Initializes the automatic subscription events by markup of the project.
     *
     * @method init
     *
     */
    var init = function() {
        lng.dom(SELECTORS.HREF_ASIDE).each(function() {
            lng.View.Aside.suscribeEvents(this);
        });
        lng.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).tap(_hideAsideIfNecesary);
        lng.dom(SELECTORS.HREF_TARGET).tap(_loadTarget);
        // lng.dom(SELECTORS.INPUT_CHECKBOX).tap(_changeCheckboxValue);
    };

    var _loadTarget = function(event) {
        event.preventDefault();
        var link = lng.dom(this);

        if (link.data("async")) {
            _loadAsyncTarget(link);
        } else {
            _selectTarget(link);
        }
    };

    var _hideAsideIfNecesary = function(event) {
        event.preventDefault();
        lng.View.Aside.hide();
    };

    var _changeCheckboxValue = function(event)  {
        event.preventDefault();
        var el = lng.dom(this);
        var current_value = el.val() > 0 ? 0 : 1;
        el.toggleClass("active").attr('value', current_value);
    };

    var _selectTarget = function(link) {
        var target_type = link.data(ATTRIBUTE.ROUTER);
        switch(target_type) {
            case ELEMENT.SECTION:
                var target_id = link.attr(ATTRIBUTE.HREF);
                _goSection(target_id);
                break;

            case ELEMENT.ARTICLE:
                _goArticle(link);
                break;

            case ELEMENT.ASIDE:
                _goAside(link);
                break;
        }
    };

    var _loadAsyncTarget = function(link) {
        lng.Notification.show();
        lng.Resource.load(link.data("async"));
        link[0].removeAttribute("data-async");
        lng.Boot.Data.init( link.attr(ATTRIBUTE.HREF) );

        setTimeout(function() {
            _selectTarget(link);
            lng.Notification.hide();
        }, lng.Constants.TRANSITION.DURATION * 2);
    };

    var _goSection = function(id) {
        id = lng.Core.parseUrl(id);
        if (id === '#back') {
            lng.Router.back();
        } else {
            lng.Router.section(id);
        }
    };

    var _goArticle = function(element) {
        var section_id = lng.Router.History.current();
        var article_id =  element.attr(ATTRIBUTE.HREF);

        lng.Router.article(section_id, article_id, element);
    };

    var _goAside = function(element) {
        var section_id = lng.Router.History.current();
        var aside_id = element.attr(ATTRIBUTE.HREF);

        lng.Router.aside(section_id, aside_id);
    };

    return {
        init: init
    };

})(Lungo);
