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
        lng.View.Template.List.create({
            el: '#list-auto',
            template: 'profile-tmp',
            data: profiles,
            order: {
                field: 'name',
                type: 'desc'
            }
        });
    };

    return {
        mockProfiles: mockProfiles
    }

})(LUNGO, App);