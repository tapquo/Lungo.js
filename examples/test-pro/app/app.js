var App = (function(lng, undefined) {

    lng.App.init({
        name: 'Kitchen Sink',
        version: '1.1',
        resources: {
            sections: [
                'local.html',
                'http://examples.tapquo.com/remote.html'],
            templates: [
                'list-home.html']
        }
    });

    return {

    };

})(LUNGO);