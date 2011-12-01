/**
 * Initialize the <section> element
 *
 * @namespace LUNGO.Boot
 * @class Section
 * @requires Zepto
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Boot.Section = (function(lng, undefined) {

    var SELECTORS = {
        ARTICLE: 'article',
        SECTION: 'section'
    };

    var ACTIVE_CLASS = 'current';

    /**
     * Initializes all <section>s of the project
     *
     * @method init
     */
    var start = function() {
        var sections = lng.Dom.query(SELECTORS.SECTION);
        var easing_transition = '-webkit-transform 0.3s ease-in-out';

        _initFirstSection(sections);
        _initAllSections(sections);

        lng.View.Resize.toolbars();
        _allocateEasingTransition(sections, easing_transition);
    };

    var _initFirstSection = function(sections) {
        var first_section = sections.first();
        var first_section_id = '#' + first_section.attr('id');

        first_section.addClass(ACTIVE_CLASS);

        lng.Router.History.add(first_section_id);
    };

    var _initAllSections = function(sections) {
        for (var i = 0, len = sections.length; i < len; i++) {
            var section = lng.Dom.query(sections[i]);
            _initSection(section);
            _initFirstArticle(section);
        }
    };

    var _initSection = function(section) {
        var section_attributes = lng.Attributes.Section;

        for (var attribute in section_attributes) {
            if (lng.Core.isOwnProperty(section_attributes, attribute)) {
                var property = section_attributes[attribute];
                lng.View.Resize.article(section, property.name, property.bind, property.reference);
            }
        }
    };

    var _allocateEasingTransition = function(sections, easing) {
        var transition_property = { '-webkit-transition': easing };
        sections.css(transition_property);
    };

    var _initFirstArticle = function(section) {
        section.children(SELECTORS.ARTICLE).first().addClass(ACTIVE_CLASS);
    };

    return {
        start: start
    };

})(LUNGO);