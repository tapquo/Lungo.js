/**
 * LungoJS Dom Handler
 *
 * @namespace LUNGO
 * @class Dom
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Dom = (function(lng, $$, undefined) {

    /**
     * Add an event listener
     *
     * @method query
     *
     * @param  {string} <Markup> element selector
     * @return {Object} Zepto <element> instance
     */
    var query = function(selector) {
        return $$(selector);
    };

    return {
        query: query
    };

})(LUNGO, Quo);