/**
 * Boot for a new LungoJS Application instance
 *
 * @namespace Lungo
 * @class App
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Boot = (function(lng, undefined) {

    return function() {
        lng.Boot.Resources.start();
        //@todo: Resize Layout
        //lng.Boot.Layout.start();
        lng.Boot.Events.start();
        lng.Boot.Data.start();
        lng.Boot.Section.start();
        lng.Boot.Article.start();
        lng.Boot.Stats.start();
    };

})(Lungo);
