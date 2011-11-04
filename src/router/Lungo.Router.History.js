/** 
 * Stores the displayed <sections> as a historical.
 * 
 * @namespace LUNGO.Router
 * @class History
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Router.History = (function(undefined) {

     var _history = [];

     /**
      * Create a new element to the browsing history based on the current section id.
      *
      * @method add
      *
      * @param  {string} Id of the section
      */
     var add = function(section_id) {
         if (section_id !== current()) {
             _history.push(section_id);
         }
     };

     /**
      * Returns the current browsing history section id.
      *
      * @method current
      *
      * @return {string} Current section id
      */
     var current = function() {
         return _history[_history.length - 1];
     };

     /**
      * Removes the current item browsing history.
      *
      * @method removeLast
      */
     var removeLast = function() {
         _history.length -= 1;
     };

    return {
        add: add,
        current: current,
        removeLast: removeLast
    };

})();