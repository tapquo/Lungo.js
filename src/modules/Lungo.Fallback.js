/**
 * ?
 *
 * @namespace Lungo
 * @class Fallback
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Fallback = (function(lng, undefined) {

    var fixPositionInAndroid = function() {
        env = lng.Core.environment();
        if (env.isMobile && env.os.name === 'Android' && env.os.version < "3") {
            lng.dom(document.body).data("position", "absolute");
        } else {
            lng.dom(document.body).data("position", "fixed");
        }
    };

    return {
        fixPositionInAndroid: fixPositionInAndroid
    };

})(Lungo);
