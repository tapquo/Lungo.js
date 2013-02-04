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
        _data("position", (env.isMobile && env.os.name === 'Android' && env.os.version < "3") ? "absolute" : "fixed");
    };

    var detectDevice = function() {
        env = lng.Core.environment();
        lng.DEVICE = env.screen.width < 768 ? "phone": "tablet";
        _data("device", lng.DEVICE);
    };

    var _data = function(key, value) {
        lng.dom(document.body).data(key, value);
    };

    return {
        fixPositionInAndroid: fixPositionInAndroid,
        detectDevice: detectDevice
    };

})(Lungo);
