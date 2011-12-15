App.Services = (function(lng, App, undefined) {
    
    
    var getMockList = function(){
        var mock = new Array(); 
        for (var i=1; i <= 6; i++) {
            mock.push({id:i, name:'name nº'+i, description:'description nº'+i, avatar:'resources/images/avatar.jpg'});
        }
        for (var i=7; i <= 12; i++) {
            mock.push({id:i, name:'surname nº'+i, description:'description nº'+i});
        }
        for (var i=13; i <= 32; i++) {
            mock.push({id:i, name:'name nº'+i, description:'description nº'+i});
        }

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
    }

    return {
        getMockList: getMockList
    }

})(LUNGO, App);