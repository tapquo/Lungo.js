/**
 * Save in LungoJS.com the use of the service for further ranking
 *
 * @namespace Lungo.Boot
 * @class Stats
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

Lungo.Boot.Stats = (function(lng, undefined) {

    /**
     * Analizing if it's run in Mobile Phone and changing the type of event to subscribe.
     *
     * @method start
     */
    var init = function() {
        if (lng.Core.isMobile()) {
            _saveStats();
        }
    };

    /**
     * Save in LungoJS.com the use of the service for further ranking
     *
     * @method _saveStatsInLungoJS
     */
    var _saveStats = function() {
        lng.Service.post( 'http://www.lungojs.com/stats/', {
            name: lng.App.get('name'),
            version: lng.App.get('version'),
            icon: lng.App.get('icon')
        }, function(response) {});
    };

    return {
        init: init
    };

})(Lungo);
