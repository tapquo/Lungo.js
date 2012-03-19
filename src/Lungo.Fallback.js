/**
 * ?
 *
 * @namespace LUNGO
 * @class Fallback
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Fallback = (function(lng, undefined) {

    var CLASS = lng.Constants.CLASS;

    var androidButtons = function() {
    	environment = lng.Core.environment();
        if (environment.isMobile && environment.os.name === 'android') {
            lng.dom(document.body).on('touchstart', '.button', _addClassActiveToButton);
            lng.dom(document.body).on('touchend', '.button', _removeClassActiveToButton);
        }
    };

    var androidInputs = function(article_id, active) {
        environment = lng.Core.environment();
        if (environment.isMobile && environment.os.name === 'android' && environment.os.version < '4') {
            var selector = article_id + ' input, ' + article_id + ' textarea, ' + article_id + ' select';
            var input_elements = lng.dom(selector);
            for (var i = 0, len = input_elements.length; i < len; i++) {
                (active) ? _enableAndroidInput(input_elements[i]) : _disableAndroidInput(input_elements[i]);
            }
        }
    };

    var positionFixed = function(sections) {
    	environment = lng.Core.environment();
        if (environment.isMobile && environment.os.name === 'ios' && environment.os.version >= '4.2') {
            sections.style('position', 'fixed');
        }
    };

    var _enableAndroidInput = function(input) {
        input.removeAttribute('disabled');
    };

    var _disableAndroidInput = function(input) {
        input.setAttribute('disabled', 'disabled');
    };

    var _addClassActiveToButton = function(element) {
        lng.dom(this).addClass(CLASS.ACTIVE);
    };

    var _removeClassActiveToButton = function(element) {
        lng.dom(this).removeClass(CLASS.ACTIVE);
    };

    return {
    	androidButtons: androidButtons,
        androidInputs: androidInputs,
    	positionFixed: positionFixed
    }

})(LUNGO);