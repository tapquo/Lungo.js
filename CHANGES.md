# LungoJS
### HTML5 Mobile Framework, and stuff.

## Changes in Version 1.0.4

- Optimized layout: No JavaScript resizes (full CSS3 selectors)
- Better transformations between <sections> (with easeInOutCubic transform)
- New Data-Attribute "count" (API JavaScript support)
- New Optimized .toolbar
- New system of forms with <ul> element
- New <article> classes: indented & rounded
- Discontinued <scroll> element becoming in the new .scrollable class
- New Kitchen Sink 1.0.4 (in GitHub Repository)
- Remove iScroll reference, now LungoJS uses iScroll-Lite
- Remove Jasmine Test Framework
- BUG Fixed:
    - Scroll with form elements
    - Multiple <aside>s

## Changes in Version 1.0.3

- Fixed error in method List.create() when result is a object
- Aside element; autohide in mobile devices.
- New data-target: aside
- New theme & default button color
- Responsive Layout: Mobile & Tablet Support
- Title centered in <header>
- New LungoJS default application icon

## Changes in Version 1.0.2

- Fixed template.binding
- In Data.Sql.select() method if the total rows it's 1, returns a object and
  not a array of objects.
- Scroll fixed in iOS v.5 devices
- Hide Navigation bar when App Instance is started (only in iOS Devices).
- In Service.get() the parameters of url are setted by a JSON object.

## Changes in Version 1.0.1

- New <input type="checkbox"> style (as iOS style).
- New <input type="group"> style (as IOS style).
- New Navigation system via data-target attribute.

## Credits
Created by [Javier Jiménez](http://twitter.com/soyjavi).

Copyright (c) 2011 by Tapquo Inc.

## Licensing Options
LungoJS is licensed under free commercial and open source licenses for
application development, and a paid commercial license for OEM uses.

See LICENSE.txt for license.