var App = (function(lng, undefined) {


    lng.App.init({
        name: 'Kitchen Sink',
        version: '1.2',
        resources: {
            sections: [
                'navigation.html',
                'navigation-index.html',
                'navigation-normal.html',
                'navigation-pop.html',
                'navigation-flow.html',
                'lists.html',
                'settings.html',
                'forms.html',
                'buttons-extra.html',
                'aside.html',
                'aside-profiles.html',
                'http://examples.tapquo.com/examples/kitchen-sink/app/sections/remote.html']
        }
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