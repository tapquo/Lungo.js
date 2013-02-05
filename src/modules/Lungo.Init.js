/**
 * Instance initializer
 *
 * @namespace Lungo
 * @class Init
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.init = function(config) {
    if (config && config.resources) {
        Lungo.Resource.load(config.resources);
    }

    Lungo.Boot.Device.init();
    Lungo.Boot.Events.init();
    Lungo.Boot.Data.init();
    Lungo.Boot.Layout.init();
};
