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
        //@todo: Falta el cacheo
        Lungo.Boot.Resources.init(config.resources);
    }
    //@todo: Resize Layout
    //lng.Boot.Layout.init();
    Lungo.Boot.Events.init();
    Lungo.Boot.Data.init();
    Lungo.Boot.Section.init();
    Lungo.Boot.Article.init();
    //@todo: Call to home?
    // Lungo.Boot.Stats.init();
};
