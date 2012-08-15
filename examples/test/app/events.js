
LUNGO.Events.init({
    'section#a article a tap': function(){
        LUNGO.Notification.loading('hole', '1', 'user');
    },
    'section#sec-1 header #btn-toggle-loading tap': App.View.toggleLoading,
    'section#sec-2 load': App.View.toggleLoading
});

