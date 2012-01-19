/**
 * LungoJS Dom Handler
 *
 * @namespace LUNGO
 * @class Dom
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

/**
     * Add an event listener
     *
     * @method dom
     *
     * @param  {string} <Markup> element selector
     * @return {Object} QuoJS <element> instance
*/
LUNGO.dom = function(selector) {
    return $$(selector);
};