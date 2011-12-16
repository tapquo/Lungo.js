App.Services = (function(lng, App, undefined) {

    var mockProfiles = function() {
        var profiles = [];
        for (var i=1, len=12; i <= len; i++ ) {
            profiles.push({
                id:i,
                name: 'Profile nº' + i,
                description: 'Description nº' + i,
                avatar: 'assets/images/avatars/' + i + '.jpg'
            })
        }
        console.error('profiles', profiles);

        lng.View.Template.List.create({
            container_id: 'profiles-list',
            template_id: 'profile-tmp',
            data: profiles
        });

        /*
        lng.View.Template.List.create({
            container_id: 'list_sample',
            template_id: 'list-tmp',
            data: mock
        });

        lng.View.Template.List.create({
            container_id: 'list_grouped_sample',
            template_id: 'list-tmp',
            data: mock,
            order_field: 'name',
            order_type: 'desc'
        });
        */
    };

    mockProfiles();

    return {
        mockProfiles: mockProfiles
    }

})(LUNGO, App);