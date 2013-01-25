
["singleTap", "doubleTap", "hold",
    "swipe", "-swiping", "swipeLeft", "swipeRight", "swipeUp", "swipeDown",
    "rotate", "rotateLeft", "rotateRight",
    "pinch", "pinchIn", "pinchOut",
    "drag", "dragLeft", "dragRight", "dragUp", "dragDown"].forEach(function(type) {
    $$("section#touchevents #gestures").on(type, function(event) {
        $$(this).siblings('.console.output').append(' | ' + type);
    });
});

$$("[data-action=clean_console]").tap(function(event) {
    $$('.console.output').html("");
});

$$("[data-action=twitter]").tap(function(event) {
    window.open("https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flungo.tapquo.com%2F&text=@lungojs a framework for developers who want to design, build and share cross device apps", "_blank");
});
