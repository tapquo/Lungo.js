var App = (function(lng, undefined) {

    sectionTrigger = function(event) {
        event.stopPropagation();
        setTimeout(function() {
            lng.Notification.success("Event: " + event.type, "Layout events manager", "info", 2);
        }, 500);
    };

    articleTrigger = function(event) {
        event.stopPropagation();
        console.error(event);
    };

    environment = function(event) {
        var environment = lng.Core.environment();
        var el = lng.dom("section > article#environment");

        if (environment.os) {
            el.find("#os > strong").html(environment.os.name);
            el.find("#os > small").html(environment.os.version);
        }
        el.find("#resolution > strong").html(environment.screen.height + "p x " + environment.screen.width + "p");
        el.find("#navigator > strong").html(environment.browser);
        el.find("#navigator > small").html("Mobile: " + environment.isMobile);
    };

    return {
        sectionTrigger: sectionTrigger,
        articleTrigger: articleTrigger,
        environment: environment
    };

})(Lungo);

App.carousel = {prev: null, next: null};

Lungo.Events.init({
    'load section#layoutevents'     : App.sectionTrigger,

    'unload section#layoutevents'   : App.sectionTrigger,

    'load article#environment'      : App.environment,

    'load article#touchevents'      : function(event) {

        ["singleTap", "doubleTap", "hold",
            "swipe", "-swiping", "swipeLeft", "swipeRight", "swipeUp", "swipeDown",
            "rotate", "rotateLeft", "rotateRight",
            "pinch", "pinchIn", "pinchOut",
            "drag", "dragLeft", "dragRight", "dragUp", "dragDown"].forEach(function(type) {
            $$("article#touchevents #gestures").on(type, function(event) {
                $$(this).siblings('.console.output').append(' | ' + type);
            });
        });

        $$("[data-action=clean_console]").tap(function(event) {
            $$('.console.output').html("");
        });

        $$("[data-action=twitter]").tap(function(event) {
            window.open("https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flungo.tapquo.com%2F&text=@lungojs a framework for developers who want to design, build and share cross device apps", "_blank");
        });

    },


    'load section#carousel': function(event) {
        App.carousel = Lungo.Element.Carousel($$('[data-control=carousel]')[0], function(index, element) {
            Lungo.dom("section#carousel .title span").html(index + 1);
        });
    },

    'tap section#carousel > header [data-direction=left]':  App.carousel.prev,

    'tap section#carousel > header [data-direction=right]': App.carousel.next,

    'tap #themeroller li': function(event) {
        var link = $$("#theme-stylesheet");
        var url = link.attr("href");
        var new_url = url.split("/").slice(0, -1);
        new_url.push($$(this).attr("data-theme"));
        link.attr('href', new_url.join("/"));
    },

    'load section#pull': function(event) {
        App.pull = new Lungo.Element.Pull('section#pull article', {
            onPull: "Pull down to refresh",
            onRelease: "Release to get new data",
            onRefresh: "Refreshing...",
            callback: function() {
                alert("Pull & Refresh completed!");
                App.pull.hide();
            }
        });
    },


    'tap article#notification a[data-action=normal]': function() {
        Lungo.Notification.show('Title', 'message', 2);
    },

    'tap article#notification a[data-action=loading]': function() {
        Lungo.Notification.show();
        setTimeout(Lungo.Notification.hide, 3000);
    },

    'tap article#notification a[data-action=success]': function() {
        Lungo.Notification.success('Title', 'Description', 'message', 2);
    },

    'tap article#notification a[data-action=error]': function() {
        Lungo.Notification.error('Title', 'Description', 'message', 2);
    },

    'tap article#notification a[data-action=confirm]': function() {
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

    'tap article#notification a[data-action=html]': function() {
        Lungo.Notification.html('<h1>Hello World</h1>', true);
    },

    'tap article#notification a[data-action=chaining]': function() {
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

Lungo.ready(function() {
    Lungo.Aside.show();
    // App.environment();
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
