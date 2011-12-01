/**
 * Initialize the <articles> layout of a certain <section>
 *
 * @namespace LUNGO.View
 * @class Article
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.View.Aside = (function(lng, undefined) {

    var toggle = function(section_id) {
        if (_isVisible(section_id)) {
            _hide(section_id);
        } else {
            _show(section_id);
        }
    };

    var _show = function(section_id) {
        lng.Dom.query(section_id + ' aside').addClass('show');

        var articles = lng.Dom.query(section_id + ' article');
        articles.toggleClass('aside');
    };

    var _hide = function(section_id) {
        var articles = lng.Dom.query(section_id + ' article');
        articles.toggleClass('aside');
    };

    var _isVisible = function(section_id) {
        var isVisible = lng.Dom.query(section_id + ' aside').hasClass('show');

        return isVisible;
    };

    return {
        toggle: toggle
    };

})(LUNGO);