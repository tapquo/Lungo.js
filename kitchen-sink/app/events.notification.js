
Lungo.Events.init({
    'tap section#notification a[data-action=normal]': function() {
        Lungo.Notification.show('Title', 'message', 2);
    },

    'tap section#notification a[data-action=loading]': function() {
        Lungo.Notification.show();
        setTimeout(Lungo.Notification.hide, 3000);
    },

    'tap section#notification a[data-action=success]': function() {
        Lungo.Notification.success('Title', 'Description', 'message', 2);
    },

    'tap section#notification a[data-action=error]': function() {
        Lungo.Notification.error('Title', 'Description', 'message', 2);
    },

    'tap section#notification a[data-action=confirm]': function() {
        Lungo.Notification.confirm({
            icon: 'user',
            title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet nulla dolorum hic eum debitis dolorem expedita? Commodi molestiae tempora totam explicabo sed deserunt cum iusto eos perspiciatis ea in.',
            accept: {
                icon: 'checkmark',
                label: 'Accept',
                callback: function(){ alert("Yes!"); }
            },
            cancel: {
                icon: 'close',
                label: 'Cancel',
                callback: function(){ alert("No!"); }
            }
        });
    },

    'tap section#notification a[data-action=html]': function() {
        Lungo.Notification.html('<h1>Hello World</h1>', true);
    },

    'tap section#notification a[data-action=chaining]': function() {
        Lungo.Notification.show('Title', 'message', 2, function() {
            Lungo.Notification.error('Title 2', 'Description 2', 'message',  2, function() {
                Lungo.Notification.show('Title 3', 'Description 3', 'message', false, 2, function() {
                    Lungo.Notification.html('<h1>Hello World</h1>', true);
                    // Lungo.Notification.hide();
                });
            });
        });
    }
});

