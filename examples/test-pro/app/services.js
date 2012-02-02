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
            container_id: 'list-plain',
            template_id: 'profile-tmp',
            data: profiles
        };

        lng.View.Template.List.create({
            container_id: 'list-auto',
            template_id: 'profile-tmp',
            data: profiles
        });
    };

    mockProfiles();

    return {
        mockProfiles: mockProfiles
    }

})(LUNGO, App);