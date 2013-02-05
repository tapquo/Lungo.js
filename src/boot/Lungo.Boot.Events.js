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
    var QUERY = lng.Constants.QUERY;

    var SELECTORS = {
        INPUT_CHECKBOX: 'input[type=range].checkbox'
    };

    /**
     * Initializes the automatic subscription events by markup of the project.
     *
     * @method init
     *
     */
    var init = function() {
        lng.dom(QUERY.HREF_ROUTER).tap(_loadTarget);
        lng.dom(QUERY.MENU_HREF).tap(_closeMenu);
        lng.dom(QUERY.INPUT_CHECKBOX).tap(_changeCheckboxValue);
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

    var _changeCheckboxValue = function(event)  {
        event.preventDefault();
        var el = lng.dom(this);
        var current_value = el.val() > 0 ? 0 : 1;
        el.toggleClass("active").attr('value', current_value);
    };

    var _closeMenu = function(event) {
        event.preventDefault();
        var el = lng.dom(this);
        var parent = el.parent('[data-control=menu]').removeClass(CLASS.SHOW);
        lng.dom("[data-router=menu] > .icon").attr("class", "icon " + el.data("icon"));
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

    var _selectTarget = function(link) {
        if (link.closest(ELEMENT.ASIDE).length > 0) {
            lng.View.Aside.hide();
        }

        var target_type = link.data(ATTRIBUTE.ROUTER);
        var target_id = link.attr(ATTRIBUTE.HREF);

        switch(target_type) {
            case ELEMENT.SECTION:
                _goSection(target_id);
                break;

            case ELEMENT.ARTICLE:
                _goArticle(link);
                break;

            case ELEMENT.ASIDE:
                lng.View.Aside.toggle();
                break;

            case ELEMENT.MENU:
                _goMenu(target_id);
                break;
        }
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

    var _goMenu = function(id) {
        lng.dom("[data-control=menu]" + id).toggleClass(CLASS.SHOW);
    };

    return {
        init: init
    };

})(Lungo);
