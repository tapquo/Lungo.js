/**
 * ?
 *
 * @namespace LUNGO
 * @class Fallback
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Fallback = (function(lng, undefined) {


    var androidButtons = function() {
    	environment = lng.Core.environment();
        if (environment.isMobile && environment.os.name === 'android') {
            lng.dom(document.body).on('touchstart', '.button', _addClassActiveToButton);
            lng.dom(document.body).on('touchend', '.button', _removeClassActiveToButton);
        }
    };

    var positionFixed = function(sections) {
    	environment = lng.Core.environment();
        if (environment.isMobile && environment.os.name === 'ios' && environment.os.version >= '4.2') {
            sections.style('position', 'fixed');
        }
    };

    var _addClassActiveToButton = function(element) {
        lng.dom(this).addClass('active');
    };

    var _removeClassActiveToButton = function(element) {
        lng.dom(this).removeClass('active');
    };

    return {
    	androidButtons: androidButtons,
    	positionFixed: positionFixed
    }

})(LUNGO);