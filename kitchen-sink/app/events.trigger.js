
Lungo.Events.init({
    'load section#layoutevents': App.triggerCapture,
    'unload section#layoutevents': App.triggerCapture
});

Lungo.ready(function() {
    // Lungo.View.Aside.show('features');
    App.environment();
    // Lungo.Router.section("notification");

    // Lungo.Notification.show();
    // Lungo.Notification.show("Please wait", "user", 2, function(){ alert(1); });
    // Lungo.Notification.error('Lorem ipsum dolor sit amet, consectetur adipisicing.', "tap to continue", 'cancel');
    // Lungo.Notification.success('Lorem ipsum dolor sit amet, consectetur adipisicing.', "tap to continue", 'cancel', 2, function(){alert(1)});
    // Lungo.Notification.confirm({
    //     icon: 'user',
    //     title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo amet nulla dolorum hic eum debitis dolorem expedita? Commodi molestiae tempora totam explicabo sed deserunt cum iusto eos perspiciatis ea in.',
    //     accept: {
    //         icon: 'checkmark',
    //         label: 'Accept',
    //         callback: function(){ alert("Yes!"); }
    //     },
    //     cancel: {
    //         icon: 'close',
    //         label: 'Cancel',
    //         callback: function(){ alert("No!"); }
    //     }
    // });

});
