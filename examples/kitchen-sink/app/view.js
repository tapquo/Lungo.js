App.View = (function(lng, App, undefined) {

    growl = function() {
        alert(1111)
    };

    toggleLoading = function(event) {
        var el = lng.dom(this);

        if (el.children('.loading').length > 0) {
            el.children('.icon').show();
            lng.View.Element.loading(this);
        } else {
            el.children('.icon').hide();
            lng.View.Element.loading(this, 'white');
        }
    };

    return {
        growl: growl,
        toggleLoading: toggleLoading
    };


})(Lungo, App);
