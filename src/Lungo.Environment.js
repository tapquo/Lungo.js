/** 
 * Set environment (Desktop or Mobile) automatically, depending on the
 * environment the subscribed events wil be different.
 * 
 * @namespace LUNGO
 * @class Environment
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 * @author Guillermo Pascual <pasku@tapquo.com> || @pasku1
 */

LUNGO.Environment = (function(lng, undefined) {

    var MOBILE_ENVIRONMENT  = 'mobile';
    var DESKTOP_ENVIRONMENT = 'desktop';

    var _environment = DESKTOP_ENVIRONMENT;

    /**
     * Analizing if it's run in Mobile Phone and changing the type of event to subscribe.
     *
     * @method start
     */
    var start = function() {
        if (lng.Core.isMobile()) {
            _environment = MOBILE_ENVIRONMENT;
            _saveStatsInLungoJS();
        }
    };

    /**
     * Gets the current environment for LungoJS
     *
     * @method init
     *
     * @return {String} Current environment enumerator
     */
    var current = function() {
        return _environment;
    };

    /**
     * Returns whether the development environment is in desktop mode
     *
     * @method isDesktop
     *
     * @return {Boolean} True if is in DESKTOP_ENVIRONMENT
     */
    var isDesktop = function() {
        return (_environment === DESKTOP_ENVIRONMENT) ? true : false;
    };

    /**
     * Save in LungoJS.com the use of the service for further ranking
     *
     * @method _saveStatsInLungoJS
     */    
    var _saveStatsInLungoJS = function() {
        lng.Service.post( 'http://www.lungojs.com/stats/', {
            name: lng.App.get('name'),
            version: lng.App.get('version'),
            icon: lng.App.get('icon')
        });
    }

    return {
        start: start,
        current: current,
        isDesktop: isDesktop
    };

})(LUNGO);