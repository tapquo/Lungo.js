var config = {
    refresh: {
        title: 'REFRESHING...',
        callback: function() {
            setTimeout(function(){
                pull.hide();
            }, 1000);
        }
    }
};

var pull = new Lungo.Element.Pull('section#pull article', config);
