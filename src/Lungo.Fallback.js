/**
 * ?
 *
 * @namespace LUNGO
 * @class Fallback
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Fallback = (function(lng, undefined) {

	var _environment;

    var androidButtons = function() {
    	_environment = !! lng.Core.environment();
        if (_environment.isMobile && _environment.os.name === 'android') {
            lng.dom(document.body).on('touchstart', '.button', _addClassActiveToButton);
            lng.dom(document.body).on('touchend', '.button', _removeClassActiveToButton);
        }
    };

    var positionFixed = function(section) {
    	_environment = !! lng.Core.environment();
        if (_environment.isMobile && _environment.os.name === 'ios' && _environment.os.version >= '4.2') {
            sections.style('position', 'fixed');
        }
    };

    return {
    	androidButtons: androidButtons,
    	positionFixed: positionFixed
    }

})(LUNGO);