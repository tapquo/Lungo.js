var App = (function(lng, undefined) {


    lng.App.init({
        name: 'Kitchen Sink',
        version: '2.0',
        resources: {
            sections: [
                'aside.html', 'aside-profiles.html']
        }
    });

    var _getEnvironmentFromQuoJS = (function() {
        var environment = lng.Core.environment();
        if (environment.isMobile) {
           // alert('Your phone is ' + environment.os.name + ' (' + environment.os.version + ')');
        }
    })();

    return {

    };

})(LUNGO);