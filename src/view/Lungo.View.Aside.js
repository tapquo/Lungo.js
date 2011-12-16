/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace LUNGO.View
 * @class Aside
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Aside = (function(lng, undefined) {

    var toggle = function(section_id) {
        var articles = lng.Dom.query(section_id + ' article');
        articles.toggleClass('aside');
    };

    return {
        toggle: toggle
    };

})(LUNGO);