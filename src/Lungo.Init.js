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
        Lungo.Boot.Resources.init(config.resources);
    }
    Lungo.Boot.Layout.init();
    Lungo.Boot.Events.init();
    Lungo.Boot.Data.init();
    Lungo.Boot.Section.init();
    Lungo.Boot.Article.init();
};
