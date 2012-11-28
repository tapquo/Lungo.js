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

        var position = (env.isMobile && env.os.name === 'Android' && env.os.version < "3") ? "absolute" : "fixed";
        lng.Element.Cache.sections.style("position", position);
    };

    return {
        fixPositionInAndroid: fixPositionInAndroid
    };

})(Lungo);
