
Lungo.Events.init({
    'tap section#a article a': function(){
        Lungo.Notification.loading('hole', '1', 'user');
    },
    'tap section#sec-1 header #btn-toggle-loading': App.View.toggleLoading,
    'load section#sec-2 load': App.View.toggleLoading
});

