var App = (function(lng, undefined) {


    lng.App.init({
        name: 'Kitchen Sink',
        version: '1.1',
        sections: [
            'local.html',
            'http://examples.tapquo.com/examples/kitchen-sink/app/sections/remote.html',
            'http://examples.tapquo.com/examples/kitchen-sink/app/sections/error.html',
        ]
    });

    var _getEnvironmentFromQuoJS = (function() {
        var environment = lng.Core.environment();
        if (environment.isMobile) {
           // alert('Your phone is ' + environment.os.name + ' (' + environment.os.version + ')');
        }
    })();

    lng.View.Element.count('#btn-one', 7);
    lng.View.Element.count('#btn-three', 0);
    lng.View.Element.count('#aside-one', 17);

    return {

    };

})(LUNGO);