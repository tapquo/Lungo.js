/** 
 * Lungo sandbox APP initialization
 * 
 * @namespace LUNGO
 * @class App
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.App = (function(lng, undefined) {

     var default_config = {
         id: 1,
         name: 'lungo_app',
         version: 1.0,
         icon: ''
     };

    /**
     * Initializes all LungoJS system: setting properties for the application,
     * subscribing to automatic events, initializing sections & articles
     * and stating the title.
     *
     * @method init
     *
     * @param {object} Application configuration properties
     */
    var init = function(app_config) {
        default_config = lng.Core.mix(default_config, app_config);

        lng.Boot();
    };

    var get = function(property) {
        return default_config[property];
    };

    return {
        init: init,
        get: get
    };

})(LUNGO);