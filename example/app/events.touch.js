
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
