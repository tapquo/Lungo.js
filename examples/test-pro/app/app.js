var App = (function(lng, undefined) {

    lng.App.init({
        name: 'Kitchen Sink',
        version: '1.2',
        resources: {
            sections: [
                'local.html',
                'http://examples.tapquo.com/remote.html',
                'asides.html'],
            templates: [
                'list-home.html']
        }
    });

    return {

    };

})(LUNGO);