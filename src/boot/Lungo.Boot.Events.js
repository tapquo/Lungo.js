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
        var touch_move_event  = 'touchmove';
        var resize = 'resize';

        lng.dom(SELECTORS.HREF_TARGET).touch(_loadTarget);
        lng.dom(SELECTORS.HREF_TARGET_FROM_ASIDE).touch(_hideAsideIfNecesary);
        lng.dom(SELECTORS.INPUT_CHECKBOX).touch(_changeCheckboxValue);
    };

    var _loadTarget = function(event) {
        event.preventDefault();
        var link = lng.dom(this);
        _selectTarget(link);
    };

    var _hideAsideIfNecesary = function(event) {
        //@TODO: refactor
        if (window.innerWidth < 768) lng.View.Aside.hide();
        if (event) event.preventDefault();
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

    var _goSection = function(id) {
        _hideAsideIfNecesary();

        id = lng.Core.parseUrl(id);
        if (id === '#back') {
            lng.Router.back();
        } else {
            var aside = lng.Element.Cache.aside;
            if (aside && aside.hasClass(CLASS.SHOW)) {
                setTimeout(function(){
                    lng.Router.section(id);
                }, 250);
            } else {
                lng.Router.section(id);
            }
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
