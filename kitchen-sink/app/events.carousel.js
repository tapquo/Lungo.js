var carousel_example = Lungo.Element.Carousel($$('[data-control=carousel]')[0], function(index, element) {
    Lungo.dom("section#carousel .title span").html(index + 1);
});

Lungo.Events.init({
    'tap section#carousel > header [data-direction=left]':  carousel_example.prev,
    'tap section#carousel > header [data-direction=right]': carousel_example.next
});
