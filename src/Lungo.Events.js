/**
 * ?
 *
 * @namespace Lungo
 * @class Fallback
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Events = (function(lng, undefined) {

    var SPACE_CHAR = ' ';

    var init = function(events) {
        for (event in events) {
            var index_of = event.lastIndexOf(SPACE_CHAR);
            if (index_of > 0) {
                var element = event.substring(0, index_of);
                var event_name = event.substring(index_of + 1);

                lng.dom(element).on(event_name, events[event]);
            }
        }
    };

    return {
        init: init
    };

})(Lungo);
