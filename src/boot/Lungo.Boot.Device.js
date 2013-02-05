/**
 * @todo
 *
 * @namespace Lungo.Boot
 * @class Device
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Boot.Device = (function(lng, undefined) {

    var DEVICE = lng.Constants.DEVICE;

    /**
     * @todo
     *
     * @method init
     *
     */
    var init = function() {
        env = lng.Core.environment();
        lng.DEVICE = env.screen.width < 768 ? DEVICE.PHONE: DEVICE.TABLET;

        lng.dom(document.body).data("data", lng.DEVICE);
    };

    return {
        init: init
    };

})(Lungo);
