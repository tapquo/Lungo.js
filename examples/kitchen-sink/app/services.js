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
        lng.View.Template.List.create(parameters);

        //Indented List
        //parameters.container_id = 'list-indented-container';
        //lng.View.Template.List.create(parameters);
        lng.View.Template.Binding.create('list-indented-container', 'profile-tmp', profiles);

        //Rounded List
        //parameters.container_id = 'list-rounded';
        //lng.View.Template.List.create(parameters);
        lng.View.Template.Binding.create('list-rounded-container', 'profile-tmp', profiles);

        //Ordered List
        parameters.container_id = 'list-ordered';
        parameters.order_field = 'name';
        parameters.order_type = 'asc';
        lng.View.Template.List.create(parameters);
    };

    mockProfiles();

    return {
        mockProfiles: mockProfiles
    }

})(LUNGO, App);