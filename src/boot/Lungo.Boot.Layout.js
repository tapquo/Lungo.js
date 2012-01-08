/**
 * Initialize the Layout of LungoJS (if it's a mobile environment)
 *
 * @namespace LUNGO.Boot
 * @class Layout
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Boot.Layout = (function(lng, undefined) {

    var _window = null;
    var _document = null;

    /**
     * Initializes the automatic subscription events by markup of the project.
     *
     * @method init
     *
     */
    var start = function() {
        if (!lng.Environment.isDesktop()) {
            _window = window;
            _document = _window.document;

            _resizeLayout();
        }
    };

    var _resizeLayout = function() {
        if (_window.innerHeight == 356) {
            var _height = 416;

            lng.Dom.query('body').style('height', _height + 'px');
            _hideNavigationBar();
        }
    };

    var _hideNavigationBar = function() {
        if( !location.hash || !_window.addEventListener ){
            _window.scrollTo( 0, 1 );
            var scrollTop = 1,

            //reset to 0 on bodyready, if needed
            bodycheck = setInterval(function(){
                if( _document.body ){
                    clearInterval( bodycheck );
                    scrollTop = 'scrollTop' in _document.body ? _document.body.scrollTop : 1;
                    _window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                }
            }, 15 );

            _window.addEventListener( 'load', function(){
                setTimeout(function(){
                    _window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                }, 0);
            }, false );
        }
    };

    return {
        start: start
    };

})(LUNGO);