
Lungo.Events.init({
    'tap section#notification a[data-action=normal]': function() {
        Lungo.Notification.show('Title', 'Description', 'message', false, 2);
    },

    'tap section#notification a[data-action=animate]': function() {
        Lungo.Notification.show('Title', 'Description', 'message', true, 2);
    },

    'tap section#notification a[data-action=loading]': function() {
        Lungo.Notification.loading();
        setTimeout(Lungo.Notification.hide, 2000);
    },

    'tap section#notification a[data-action=success]': function() {
        Lungo.Notification.success('Title', 'Description', 'message', 2);
    },

    'tap section#notification a[data-action=error]': function() {
        Lungo.Notification.error('Title', 'Description', 'message', 2);
    },

    'tap section#notification a[data-action=alert]': function() {
        Lungo.Notification.alert('Title', 'Description', 'message', 2);
    },

    'tap section#notification a[data-action=confirm]': function() {
        Lungo.Notification.confirm({
            title: 'Title',
            description: 'Description',
            icon: 'message',
            accept: {
                color: 'blue',
                icon: 'checkmark',
                label: 'Yes',
                callback: function(){ alert("Yes!"); }
            },
            cancel: {
                icon: 'close',
                label: 'No',
                callback: function(){ alert("No!"); }
            }
        });
    },

    'tap section#notification a[data-action=html]': function() {
        Lungo.Notification.html('<h1>Hello World</h1>', true);
    }

});

