#! Overthrow v.0.1.0. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt
((w, undefined_) ->
  doc = w.document
  docElem = doc.documentElement
  classtext = "scroll-enabled"

  # Touch events are used in the polyfill, and thus are a prerequisite
  canBeFilledWithPoly = "ontouchmove" of doc

  # The following attempts to determine whether the browser has native overflow support
  # so we can enable it but not polyfill

  # Features-first. iOS5 overflow scrolling property check - no UA needed here. thanks Apple :)

  # Touch events aren't supported and screen width is greater than X
  # ...basically, this is a loose "desktop browser" check.
  # It may wrongly opt-in very large tablets with no touch support.

  # Hang on to your hats.
  # Whitelist some popular, overflow-supporting mobile browsers for now and the future
  # These browsers are known to get overlow support right, but give us no way of detecting it.
  overflowProbablyAlreadyWorks = "WebkitOverflowScrolling" of docElem.style or (not canBeFilledWithPoly and w.screen.width > 1200) or (->
    ua = w.navigator.userAgent

    # Webkit crosses platforms, and the browsers on our list run at least version 534
    webkit = ua.match(/AppleWebKit\/([0-9]+)/)
    wkversion = webkit and webkit[1]
    wkLte534 = webkit and wkversion >= 534

    # Android 3+ with webkit gte 534
    #                    ~: Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13

    # Blackberry 7+ with webkit gte 534
    #                    ~: Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0 Mobile Safari/534.11+

    # Blackberry Playbook with webkit gte 534
    #                    ~: Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/0.0.1 Safari/534.8+

    # Firefox Mobile (Fennec) 4 and up
    #                    ~: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:2.1.1) Gecko/ Firefox/4.0.2pre Fennec/4.0.

    # WebOS 3 and up (TouchPad too)
    #                    ~: Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.48 Safari/534.6 TouchPad/1.0

    # Nokia Browser N8
    #                    ~: Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba
    #                    ~: Note: the N9 doesn't have native overflow with one-finger touch. wtf
    ua.match(/Android ([0-9]+)/) and RegExp.$1 >= 3 and wkLte534 or ua.match(RegExp(" Version\\/([0-9]+)")) and RegExp.$1 >= 0 and w.blackberry and wkLte534 or ua.indexOf(/PlayBook/) > -1 and RegExp.$1 >= 0 and wkLte534 or ua.match(/Fennec\/([0-9]+)/) and RegExp.$1 >= 4 or ua.match(/wOSBrowser\/([0-9]+)/) and RegExp.$1 >= 233 and wkLte534 or ua.match(/NokiaBrowser\/([0-9\.]+)/) and parseFloat(RegExp.$1) is 7.3 and webkit and wkversion >= 533
  )()

  # Easing can use any of Robert Penner's equations (http://www.robertpenner.com/easing_terms_of_use.html). By default, overthrow includes ease-out-cubic
  # arguments: t = current iteration, b = initial value, c = end value, d = total iterations
  # use w.overthrow.easing to provide a custom function externally, or pass an easing function as a callback to the toss method
  defaultEasing = (t, b, c, d) ->
    c * ((t = t / d - 1) * t * t + 1) + b

  enabled = false
  timeKeeper = undefined

  # Keeper of intervals

  # toss scrolls and element with easing
  #
  #        // elem is the element to scroll
  #        // options hash:
  #            * left is the desired horizontal scroll. Default is "+0". For relative distances, pass a string with "+" or "-" in front.
  #            * top is the desired vertical scroll. Default is "+0". For relative distances, pass a string with "+" or "-" in front.
  #            * duration is the number of milliseconds the throw will take. Default is 100.
  #            * easing is an optional custom easing function. Default is w.overthrow.easing. Must follow the easing function signature
  #
  toss = (elem, options) ->
    i = 0
    sLeft = elem.scrollLeft
    sTop = elem.scrollTop
    o =

      # Toss defaults
      top: "+0"
      left: "+0"
      duration: 100
      easing: w.overthrow.easing

    endLeft = undefined
    endTop = undefined

    # Mixin based on predefined defaults
    if options
      for j of o
        o[j] = options[j]  if options[j] isnt undefined

    # Convert relative values to ints
    # First the left val
    if typeof o.left is "string"
      o.left = parseFloat(o.left)
      endLeft = o.left + sLeft
    else
      endLeft = o.left
      o.left = o.left - sLeft

    # Then the top val
    if typeof o.top is "string"
      o.top = parseFloat(o.top)
      endTop = o.top + sTop
    else
      endTop = o.top
      o.top = o.top - sTop
    timeKeeper = setInterval(->
      if i++ < o.duration
        elem.scrollLeft = o.easing(i, sLeft, o.left, o.duration)
        elem.scrollTop = o.easing(i, sTop, o.top, o.duration)
      else
        elem.scrollLeft = endLeft  if endLeft isnt elem.scrollLeft
        elem.scrollTop = endTop  if endTop isnt elem.scrollTop
        intercept()
    , 1)

    # Return the values, post-mixin, with end values specified
    top: endTop
    left: endLeft
    duration: o.duration
    easing: o.easing


  # find closest overthrow (elem or a parent)
  closest = (target, ascend) ->
    not ascend and target.className and target.className.indexOf("scroll") > -1 and target or closest(target.parentNode)


  # Intercept any throw in progress
  intercept = ->
    clearInterval timeKeeper


  # Enable and potentially polyfill overflow
  enable = ->

    # If it's on,
    return  if enabled

    # It's on.
    enabled = true

    # If overflowProbablyAlreadyWorks or at least the element canBeFilledWithPoly, add a class to cue CSS that assumes overflow scrolling will work (setting height on elements and such)
    docElem.className += " " + classtext  if overflowProbablyAlreadyWorks or canBeFilledWithPoly

    # Destroy everything later. If you want to.
    w.overthrow.forget = ->

      # Strip the class name from docElem
      docElem.className = docElem.className.replace(classtext, "")

      # Remove touch binding (check for method support since this part isn't qualified by touch support like the rest)
      doc.removeEventListener "touchstart", start, false  if doc.removeEventListener

      # reset easing to default
      w.overthrow.easing = defaultEasing

      # Let 'em know
      enabled = false


    # If overflowProbablyAlreadyWorks or it doesn't look like the browser canBeFilledWithPoly, our job is done here. Exit viewport left.
    return  if overflowProbablyAlreadyWorks or not canBeFilledWithPoly

    # Fill 'er up!
    # From here down, all logic is associated with touch scroll handling
    # elem references the overthrow element in use
    elem = undefined

    # The last several Y values are kept here
    lastTops = []

    # The last several X values are kept here
    lastLefts = []
    lastDown = undefined
    lastRight = undefined

    # lastDown will be true if the last scroll direction was down, false if it was up

    # lastRight will be true if the last scroll direction was right, false if it was left

    # For a new gesture, or change in direction, reset the values from last scroll
    resetVertTracking = ->
      lastTops = []
      lastDown = null

    resetHorTracking = ->
      lastLefts = []
      lastRight = null


    # After releasing touchend, throw the overthrow element, depending on momentum
    finishScroll = ->

      # Come up with a distance and duration based on how
      # Multipliers are tweaked to a comfortable balance across platforms
      top = (lastTops[0] - lastTops[lastTops.length - 1]) * 8
      left = (lastLefts[0] - lastLefts[lastLefts.length - 1]) * 8
      duration = Math.max(Math.abs(left), Math.abs(top)) / 8

      # Make top and left relative-style strings (positive vals need "+" prefix)
      top = ((if top > 0 then "+" else "")) + top
      left = ((if left > 0 then "+" else "")) + left

      # Make sure there's a significant amount of throw involved, otherwise, just stay still
      if not isNaN(duration) and duration > 0 and (Math.abs(left) > 80 or Math.abs(top) > 80)
        toss elem,
          left: left
          top: top
          duration: duration


    inputs = undefined

    # On webkit, touch events hardly trickle through textareas and inputs
    # Disabling CSS pointer events makes sure they do, but it also makes the controls innaccessible
    # Toggling pointer events at the right moments seems to do the trick
    # Thanks Thomas Bachem http://stackoverflow.com/a/5798681 for the following
    setPointers = (val) ->
      inputs = elem.querySelectorAll("textarea, input")
      i = 0
      il = inputs.length

      while i < il
        inputs[i].style.pointerEvents = val
        i++


    # For nested overthrows, changeScrollTarget restarts a touch event cycle on a parent or child overthrow
    changeScrollTarget = (startEvent, ascend) ->
      if doc.createEvent
        newTarget = (not ascend or ascend is undefined) and elem.parentNode or elem.touchchild or elem
        tEnd = undefined
        if newTarget isnt elem
          tEnd = doc.createEvent("HTMLEvents")
          tEnd.initEvent "touchend", true, true
          elem.dispatchEvent tEnd
          newTarget.touchchild = elem
          elem = newTarget
          newTarget.dispatchEvent startEvent


    # Touchstart handler
    # On touchstart, touchmove and touchend are freshly bound, and all three share a bunch of vars set by touchstart
    # Touchend unbinds them again, until next time
    start = (e) ->

      # Stop any throw in progress
      intercept()

      # Reset the distance and direction tracking
      resetVertTracking()
      resetHorTracking()
      elem = closest(e.target)
      return  if not elem or elem is docElem or e.touches.length > 1
      setPointers "none"
      touchStartE = e
      scrollT = elem.scrollTop
      scrollL = elem.scrollLeft
      height = elem.offsetHeight
      width = elem.offsetWidth
      startY = e.touches[0].pageY
      startX = e.touches[0].pageX
      scrollHeight = elem.scrollHeight
      scrollWidth = elem.scrollWidth

      # Touchmove handler
      move = (e) ->
        ty = scrollT + startY - e.touches[0].pageY
        tx = scrollL + startX - e.touches[0].pageX
        down = ty >= ((if lastTops.length then lastTops[0] else 0))
        right = tx >= ((if lastLefts.length then lastLefts[0] else 0))

        # If there's room to scroll the current container, prevent the default window scroll
        if (ty > 0 and ty < scrollHeight - height) or (tx > 0 and tx < scrollWidth - width)
          e.preventDefault()

        # This bubbling is dumb. Needs a rethink.
        else
          changeScrollTarget touchStartE

        # If down and lastDown are inequal, the y scroll has changed direction. Reset tracking.
        resetVertTracking()  if lastDown and down isnt lastDown

        # If right and lastRight are inequal, the x scroll has changed direction. Reset tracking.
        resetHorTracking()  if lastRight and right isnt lastRight

        # remember the last direction in which we were headed
        lastDown = down
        lastRight = right

        # set the container's scroll
        elem.scrollTop = ty
        elem.scrollLeft = tx
        lastTops.unshift ty
        lastLefts.unshift tx
        lastTops.pop()  if lastTops.length > 3
        lastLefts.pop()  if lastLefts.length > 3


      # Touchend handler
      end = (e) ->

        # Apply momentum based easing for a graceful finish
        finishScroll()

        # Bring the pointers back
        setPointers "auto"
        setTimeout (->
          setPointers "none"
        ), 450
        elem.removeEventListener "touchmove", move, false
        elem.removeEventListener "touchend", end, false

      elem.addEventListener "touchmove", move, false
      elem.addEventListener "touchend", end, false


    # Bind to touch, handle move and end within
    doc.addEventListener "touchstart", start, false


  # Expose overthrow API
  w.overthrow =
    set: enable
    forget: ->

    easing: defaultEasing
    toss: toss
    intercept: intercept
    closest: closest
    support: (if overflowProbablyAlreadyWorks then "native" else canBeFilledWithPoly and "polyfilled" or "none")


  # Auto-init
  enable()
) this
