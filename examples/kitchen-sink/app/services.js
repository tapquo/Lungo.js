App.Services = (function(lng, App, undefined) {

    var mockProfiles = function() {
        var profiles = [];
        var id = 0;

        for (var j=0; j < 3; j++) {
            for (var i=1, len=12; i <= len; i++ ) {
                id++;
                profiles.push({
                    id: id,
                    name: 'Profile nº' + i,
                    description: 'Description nº' + i,
                    avatar: 'assets/images/avatars/' + i + '.jpg'
                });
            }
        }

        //Normal List
        var parameters = {
            el: '#list-plain',
            template: 'profile-tmp',
            data: profiles
        };
        lng.View.Template.List.create(parameters);

        //Indented List
        parameters.el = '#list-indented';
        lng.View.Template.List.create(parameters);

        //Ordered List
        parameters.el = '#list-ordered';
        parameters.order = { field: 'name', type: 'asc' };
        lng.View.Template.List.create(parameters);
    };

    var testService = function() {
        lng.Service.Settings.timeout = 2500;
        lng.Service.Settings.dataType = 'json';
        lng.Service.Settings.error = function() {
            console.error('Timeout exceed (500ms):', arguments);
        };

        var url = 'http://www.panoramio.com/map/get_panoramas.php';
        var parameters = {
            set: 'public',
            from: 0,
            to: 3,
            minx: -180,
            miny: -90,
            maxx: 180,
            maxy: 90,
            size: 'medium',
            mapfilter: true
        };

        lng.Service.get(url, parameters,
            function(response) {
                console.error('GET', response);
            }
        );

        lng.Service.json(url, parameters,
            function(response) {
                console.error('JSON', response);
            }
        );

        lng.Service.Settings.async = false;
        var response = lng.Service.json(url, parameters);
        console.error('SYNC', response);
    };

    return {
        mockProfiles: mockProfiles
    }

})(LUNGO, App);