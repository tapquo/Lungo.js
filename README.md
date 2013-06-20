LungoJS
=======
A HTML5 framework for developers who want to design, build and share cross device applications.

 * **HTML5 Optimized Apps**: Supports open web standards, such as HTML5, CSS3 and JavaScript. It brings a consistent browser environment across mobiles, TVs and desktop devices.

 * **Open Source Project**: Each new line of code in Lungo is welcome, we hope that Developers and restless minds will help us to improve day by day this humble project.

 * **Powerful JavaScript API**: here are many ways to develop apps, not all of them are optimized. Lungo offers you a robust API so you can have complete control of everything that happens in your App.

 * **Cross-Device full support**: It's known that creating apps for each platform is expensive, this situation is increased by the arrival of tablets and SmartTVs. Lungo will suit all of them creating a unique and amazing UX.

*Current version: [2.2.0]()*




Gettins Started
---------------
The idea of Lungo arose in year 2010 when the craftman Javi Jiménez Villar ([**soyjavi**](https://twitter.com/soyjavi)) saw that hot existing Mobile Frameworks at that time were not powerful and not using the features of HTML5.

### Community
If this documentation is not enough for you, you can subscribe to the Lungo open community to share your experiences and knowledge. You can do it in [English](https://groups.google.com/forum/#!forum/lungojs) or [Spanish](https://groups.google.com/forum/#!forum/lungojs_es), you decide.

### GitHub
This is opensource, so feel free to fork this project to help us create a better framework. All source code is developed with CoffeeScript and Stylus, but don't worry we worship clean-code so you can quickly get to make your own modifications in it.

[https://github.com/tapquo/lungo.js](https://github.com/tapquo/lungo.js)

### Licensing
Lungo is licensed under GPLv3 licensed and a Commercial License for OEM uses. See [LICENSE](https://github.com/tapquo/Lungo.js/blob/master/LICENSE.md) for more information.


### Help us on being better
Please, don't have any doubt in contacting us if you think you can do a better API. If you think that we have to support a new feature or if you have found a bug, use [GitHub issues](https://github.com/tapquo/lungo.js/issues). Make a fork of this documentation and send us your *pull requests* with your improvements. 

To talk with us or with other developers about the Lungo API, suscribe to our [**mailing list**](https://groups.google.com/forum/#!forum/lungojs).


EASY PROTOTYPE
==============

The main premise is to create a semantic structure in the whole project, starting from the markup language HTML, through a well organized CSS and ending with the JavaScript API. Lungo offers a great facility when prototyping applications, and will not be needed to enter any lines of code (JavaScript) to visualize how our application will behave. In this doc we will learn which are Lungo semantic elements as relate to each and how you can create applications with HTML only. It's really exciting! let's begin.


Structure
---------
Here you have the dependencies of your Lungo application's body. It must contain at least:

``` html
<link rel="stylesheet" href="components/lungo.brownie/lungo.css">
<link rel="stylesheet" href="components/lungo.icon/lungo.icon.css">
<link rel="stylesheet" href="components/lungo.brownie/lungo.theme.css">
<script src="components/quojs/quo.js"></script>
<script src="components/lungo/lungo.js"></script>
```

`<section>` it's the main container of your UI Components in your App and `<article>` it must be placed inside your section and must have…. Each section and article must contain an unique ID. 
``` html
<section id="main">
    <article id="main-article">
        Your content
    </article>
</section>
```

The JavaScript function that initializes Lungo it's:
``` javascript
Lungo.init({
    name: 'example'
});
```

#### Load Sync resources on init
To make easier to create and modify your app you can create the sections in separate html files and load the synchonously, making your main file smaller and having your code organized better.

``` javascript
//Load resource on app init
Lungo.init({
    name: 'example',
    resources: ['section_to_load.html']
});
```

#### Load async resources by link
There is other way to load resources asynchronously, just add to the `<a>` tag element the attribute data-async with the link to the section.

``` html
<section id="loader" data-transition="">
    <article id="art1" class="active">
        <a href="#main" data-router="section" data-async="section_to_load.html">
            Go to section
        </a>
    </article>
</section>
```



Basic Elements
--------------
Lungo uses the semantic language markup introduced with HTML5, so you can add this elements using the new semantic tags.

### Section & Article
A `<section>` is a view of our application where content will be displayed and where there may be subelements as `<header>`, `<footer>` and `<article>`.

``` html
<section id="main">
    <article id="main-article" class="active">
        {{CONTENT}}
    </article>
</section>
```

The content a particular `<section>` is structured by `<article>`. Within a section may be as many `<article>` as you like. The article of the section that will be shown first must have th `class="active"` attribute set.

``` html
<section id="main_section">
    <header data-title="example"></header>

    <article id="main-article" class="active">
        {{CONTENT}}
    </article>
</section>
```


### Header
Each `<section>` can contain a `<header>` where the tittle of the section will be shown. Optionally you can add navigation buttons, to go to another section, go back to a previous one, go to another article or just open the aside menu.

``` html
<section id="main_section">
    <header data-title="example"></header>

    <article id="main-article" class="active">
        {{CONTENT}}
    </article>
</section>
```


### Footer
Each `<section>` can contain a `<footer>`. There you can add buttons to navigate through articles, sections and even asides.

``` html
<section id="main_section">
    <article id="main" class="active">
        {{CONTENT}}
    </article>
    <footer>
        <nav>
            <a href="#" data-icon="menu" class="active"></a>
            <a href="#" data-icon="share"></a>
            <a href="#" data-icon="user"></a>
            <a href="#" data-icon="users"></a>
        </nav>
    </footer>
</section>
```


### Aside
The `<aside>` element gives us a lateral area which will appear depending on the device (tablet) or hidden (mobile). Its structure is very similar to the section one's. We can create a link that references a `<aside>` with a particular id using the navigation system of Lungo. We will use the attribute data-router (which will be discussed in subsequent chapters). We can also define the positioning of it, using style classes. The default position is left.

``` html
<aside id="features">
    <header data-title="Options"></header>
    <article class="active">
        {{CONTENT}}
    </article>
</aside>
```

In your section you need link your aside (#features) with `data-aside` attribute, and you can display/hide with attribute `data-view-aside`:

``` html
<section id="main_section" data-aside="features">
    <header data-title="Aside">
        <nav>
            <button data-view-aside="features" data-icon="menu"></button>
        </nav>
    </header>
    <article id="main-article" class="active indented">
        {{CONTENT}}
    </article>
</section>
```

Navigation
--------------
The navigation in Lungo is entirely semantic, and you will use the element `<a>` or `<button>` and his data attribute "view-*" to tell the system which `<section>`, `<article>` or `<aside>` you want to go to.

### Data-View-* attribute
The `data-view-*` attribute is set in the `<a>` or `<button>` element to set the type of element we are going to navigate to (`<section>`, `<article>` or `<aside>`) and in the href attribute the hashbang plus the id of the element has to be set. For this purpopuse Lungo uses the bread crumbs.

``` html
<section id="main">
    <article id="article_1" class="active">
        <button class="button" data-view-article="article_1" data-icon="forward">To article_2</button>
    </article>

    <article id="article_2">
        <button class="button" data-view-article="article_2" data-icon="home" data-label="To article_1"></button>
    </article>
</section>
```


### Data-back attribute
As it has been said before, Lungo's navigation is based on the bread crumbs pattern, so navigation backwards between sections is done using the data-back functionality. You can set a button in your header using the data-back attribute or use in `<a>` or `button` tags data-router="section" with href="#back"

``` html
<section id="main">
    <article id="main_1" class="active">{{CONTENT}}</article>
    <article id="main_2">{{CONTENT}}</article>
</section>

<section id="second">
    <header data-back="home"></header>
    <article id="second_1" class="active">
        Same as header:
        <button data-view-section="back" data-icon="left" data-label="Return to previous section"></button>
    </article>
</section>
```


### Nav
To create simple structures of navigation buttons within a footer or header the nav element has to be used. In the header, the nav element's position will depend on the class applied to it. `left` to the left and `right` to the right.

``` html
<section id="main">
    <header data-title="<nav> example">
        <nav class="on-left">
            <button data-view-article="article_1" data-label="Home"></button>
        </nav>
        <nav class="on-right">
            <button data-view-section="second" data-label="Section"></button>
        </nav>
    </header>

    <article id="article_1" class="active">{{CONTENT}}</article>
    <article id="article_2">{{OTHER_CONTENT}}</article>

    <footer>
        <nav>
            <a href="#" data-view-article="article_1" data-icon="home"></a>
            <a href="#" data-view-article="article_2" data-icon="user"></a>
            <a href="#" data-view-section="second" data-icon="right"></a>
        </nav>
    </footer>
</section>

<section id="second">
    <header data-back="home" data-title="example"></header>
    <article id="second_1">{{CONTENT}}</article>
</section>
```


### Groupbar
Lungo gives you the capability to have a special menu at the top of your UI. To do this you have to extend the header element using class="extended" and create inside of it a nav element with class="groupbar"

``` html
<section id="main">
    <header data-title="groupbar" class="extended"></header>

    <nav class="groupbar">
        <a href="#" data-view-article="article_1" class="active">Art-1</a>
        <a href="#" data-view-article="article_2">Art-2</a>
    </nav>

    <article id="article_1" class="active">{{CONTENT}}</article>
    <article id="article_2">{{OTHER_CONTENT}}</article>
</section>
```


### Title Bindings
To update the title of a section through the navigation, just use the attribute `data-title` in your navigation element.

``` html
<section id="main">
    <header data-title="Default title"></header>
    <article id="first" class="active">
        <button data-view-article="second" data-title="Second Article"></button>
    </article>
    <article id="second">
        <button data-view-article="first" data-title="First Article"></button>
    </article>
</section>
```


### Visualization bindings
You can show nav elements when a particular article is visible.

``` html
<section id="main">
    <header data-title="Title of section">
        <nav class="on-right">
            <button data-article="second" data-view-article="first" data-icon="left"></button>
            <button data-article="first" data-view-article="second" data-icon="right"></button>
        </nav>
    </header>

    <article id="first" class="active">{{CONTENT}}</article>
    <article id="second">{{OTHER_CONTENT}}</article>
</section>
```

* [Elements](https://github.com/tapquo/Lungo.js/blob/master/docs/EN/prototype/elements.md)
* [Navigation](https://github.com/tapquo/Lungo.js/blob/master/docs/EN/prototype/navigation.md)

Forms
-----
lorem

#### Basics
lorem

#### Buttons
lorem

#### No-native
lorem

Lists
-----
lorem

Data-Attributes
---------------



JavaScript API
==============

Core
----

Lungo has several methods that are used inside its engine. Here you have them if you need to include some of their functionality in your application.


#### log()
Console system to display messages when you are in debug mode.

**Parameters**
```
number:     Severity based in (1)Log, (2)Warn, (>2)Error
string:     Message to show in the console
```

*Example*
``` javascipt
Lungo.Core.log(1, "Launched event");
Lungo.Core.log(2, "Warning!!");
Lungo.Core.log(3, "Error!!!!");
```


#### execute()
Executes callbacks based on the parameters received.

**Parameters**

```
function:   callback to execute
```

*Example*
``` javascript
var myFunc = function(){
    //Do something
};
var myFunc2 = function(){
    //Do something
};
Lungo.Core.execute(myFunc, myFunc2);
```


#### bind()
Creates a new function that, when called, itself calls this function in the context of the provided this value, with a given sequence of arguments preceding any provided when the new function was called.

**Parameters**

```
object:     object that 'this' can refer in the new function.
function:   A function object.
```
This method **return** the function which will do the action on the object.

*Example*
``` javascript
var example = "This is ";
var addText = function(textToAdd){
    text = this;
    for(var i = 0, len = textToAdd.length; i < len; i++){
        text += " " + textToAdd[i];
    }
    return text;
};
var text = ["an", "example"];
var finalText = Lungo.Core.bind(example, addText)(text);
//Result: "This is an example"
```


#### mix()
Copy from any number of objects and mix them all into a new object. The implementation is simple; just loop through arguments and copy every property of every object passed to the function.

**Parameters**

```
object:     arguments to mix them all into a new object.
object:     arguments to mix them all into a new object.
```
This method **return** an object with the mix done.

*Example*
``` javascript
var CONFIG_BASE = {
    name: 'lungo_db',
    version: '1.0'
};

var CONFIG = {
    version: '1.1';
}

var finalConfig = lng.Core.mix(CONFIG_BASE, CONFIG);

/*
Result:
{
    name: 'lungo_db',
    version: '1.1'
}
*/
```


#### isOwnProperty()
Every object descended from Object inherits the hasOwnProperty method. This method can be used to determine whether an object has the specified property as a direct property of that object.

**Parameters**

```
object:     object to test for a property's existence inside itself.
string:     property the name of the property to test.
```
This method **return** boolean indicating if property exists.

*Example*
``` javascript
var car = {wheels:4,doors:true};
Lungo.Core.isOwnProperty(car,"wheels"); //Result: true
Lungo.Core.isOwnProperty(car,"wings");      //Result: false
```


#### toType()
Determine the internal JavaScript [[Class]] of an object.

**Parameters**

```
object:     object to get the real type of itself.
```
This method **return** a string with the internal JavaScript [[Class]]

*Example*
``` javascript
var name = "Lungo";
Lungo.Core.toType(name);    //Result: "string"
```


#### toArray()
Convert an array-like object into a true JavaScript array.

**Parameters**

```
object:     Any object to turn into a native Array.
```
This method **return** the object in a plain array.

*Example*
``` javascript
var execute = function() {
    var args = lng.Core.toArray(arguments);
}
```


#### isMobile()
Determine if the current environment is a mobile environment. This method **return** An object with the mix done.

*Example*
``` javascript
Lungo.Core.isMobile();
```


#### environment()
**Returns** information of execute environment.

*Example*
``` javascript
Lungo.Core.environment();
```


#### orderByProperty()
Copy from any number of objects and mix them all into a new object. The implementation is simple; just loop through arguments and copy every property of every object passed to the function.

**Parameters**

```
list:       List of objects.
string:     Name of the property.
string:     Type of order: asc or desc.
```
This method **return** an ordered list of objects by a property.

*Example*
``` javascript
var list = [
    {name: 'Lungo', twitter: 'lungojs'},
    {name: 'Quojs', twitter: 'quojs'},
];

var ordered_list = lng.Core.orderByProperty(list, 'name', 'asc');
```


#### parseUrl()

**Parameters**

```
string:     Url string.
```
This method **return**  a correct URL using hashtag character.

*Example*
``` javascript
var url = Lungo.Core.parseUrl("http://tapquo.com/#folks");
//Result: "#folks"
```


#### findByProperty()
Copy from any number of objects and mix them all into a new object. The implementation is simple; just loop through arguments and copy every property of every object passed to the function.

**Parameters**

```
list:       The list with objects.
string:     Name of the property.
```
This method **return** An instance of the object found, null if not found.

*Example*
``` javascript
var list = [
    {name: 'Lungo', twitter: 'lungojs'},
    {name: 'Quojs', twitter: 'quojs'},
];

var user = lng.Core.findByProperty(list, 'name', 'Lungo');
```


Cache
-----
Lungo implements its own cache type. This cache will store the value until the wepapp is closed


#### set()
Sets in the LungoJS cache system a new key/value pair.

**Parameters**

```
string:     Key for the new value.
string:     [OPTIONAL] Subkey in LungoJS Cache System.
object:     Value asigned to the key.
```

*Example*
``` javascript
var framework = {name: "Lungo", twitter: "lungojs"};
Lungo.Data.Cache.set("lungoFramework", framework);
```


#### get()
Returns the cached value of a given key.

**Parameters**

```
string:      Key in LungoJS Cache System.
string:     [OPTIONAL] Subkey in LungoJS Cache System.
```
This method **return** an object containing the value.

*Example*
``` javascript
var cachedFramework = Lungo.Data.Cache.get("lungoFramework");
//Result: {name: "Lungo", twitter: "lungojs"}
```


#### remove()
Removes the instance of a given key in LungoJs Cache System.

**Parameters**

```
string:     Key in LungoJS Cache System.
string:     [OPTIONAL] Subkey in LungoJS Cache System.
```

*Example*
``` javascript
Lungo.Data.Cache.remove("lungoFramework");
```


#### exists()
Checks if the given key is stored in the cache.

**Parameters**

```
string Key in LungoJS Cache System.
```
This method **return** a boolean value which is true if the key is found

*Example*
``` javascript
Lungo.Data.Cache.exists("lungoFramework");
```



DOM
---
Lungo uses the famous library [QuoJS](http://quojs.tapquo.com) to handle the DOM of your application. QuoJS is a micro, modular, Object-Oriented and concise JavaScript Library that simplifies HTML document traversing, event handling, and Ajax interactions for rapid mobile web development. It allows you to write powerful, flexible and cross-browser code with its elegant, well documented, and micro coherent API.


### Manipulation
Using QuoJs, you can chain functions to execute several commands in one row. For more info about [Quo's](http://quojs.tapquo.com) API please go here.

*Example*
``` html
<section id="main"">
    <header data-title="Dom Manipulation"></header>

    <article id="main-article" class="active">
        <ul>
            <li class="dark">
                Tap here to change the color
            </li>
        </ul>
    </article>
</section>
```

Subscribe to a tap event with a callback
``` javascript
Lungo.dom('#main-article li').tap(function(event) {
    Lungo.dom(this).toggleClass('light').toggleClass('dark');
});

```


### Triggers
When sections or articles are switched an event is launched. The target section/article will launch an `load` event and the current section/article will launch the `unload` one. We can bind to this events using QuoJs.
*Example*
``` html
<section id="section1">
    <article id="article1">
        <button data-view-section="section2" data-label="2nd Section"></button>
    </article>
</section>
<section id="section2">
    <article id="article2">{{CONTENT}}</article>
</section>
```
``` javascript
Lungo.dom('#section1').on('unload', function(event) {
    alert("Unloaded section 1");
});

Lungo.dom('#section2').on('load', function(event){
    alert("Loaded section 2");
});
```


Elements
--------

### Carousel
Lungo has a carousel element where content can be published can be published and the user can navigate through it using the caroussel controls.

**Parameters**
```
string:     Element query selector.
function:   Function to execute when switching slide.
```

*Example*
``` html
<section id="carousel" data-transition="slide">
    <header>
        <div class="centered title">Photo: <span>1</span></div>
    </header>
    <article id="art" class="active block" data-control="carousel">
        <div>
            <div align="center">
                <img src="http://lorempixel.com/320/418/food/">
            </div>
            <div align="center">
                <img src="http://lorempixel.com/320/418/sports/">
            </div>
        </div>
    </article>
</section>
```
``` javascript
var el = Lungo.Dom('[data-control=carousel]').first();

var example = Lungo.Element.Carousel(el, function(index, element) {
    Lungo.dom("section#carousel .title span").html(index + 1);
});
```

#### Carousel.prev()
Show the previous slide.
*Example*
``` javascript
var example = Lungo.Element.Carousel(el);
Lungo.dom('[data-direction=left]').tap(example.prev);
```


#### Carousel.next()
Show the next slide.
*Example*
``` javascript
var example = Lungo.Element.Carousel(el);
Lungo.dom('[data-direction=left]').tap(example.next);
```


#### Carousel.position()
Returns the actual index.
*Example*
``` javascript
var example = Lungo.Element.Carousel(el);
example.next();
alert(example.position());
```



### Count
As it has been shown in the prototyping chapter, you can add a counter to elements using the data-count attribute. You can also add this counter using javascript.


#### JavaScript method
Set a counter to the element:

**Parameters**
```
string:     Element query selector.
number:     Value of the counter.
```

*Example*
``` javascript
Lungo.Element.count("#messages", 5);
```


#### HTML method
You can define via HTML a default value for a count element.
*Example*
``` html
<section>
    …
    <footer>
        <nav>
            <a href="#" data-icon="user" data-count="12"></a>
            <a href="#" data-icon="globe"></a>
            <a href="#" data-icon="cog"></a>
        </nav>
    </footer>
</section>
```




### Loading
As it has been shown in the prototyping chapter, you can create a loading animation using the data-loading attribute. You can also add this animation using javascript

**Parameters**
```
string:     Element query selector.
string:     [OPTIONAL] Stylesheet.
```
This method **returns** an instance of the object founded.

*Example*
``` html
<section id="main" data-transition="">
    <header data-title="loading"></header>
    <article id="main-article"></article>
</section>
```

// JavaScript Code
``` javascript
Lungo.Element.loading("#main-article", 1);
```



### Progress
As it has been shown in the prototyping chapter, you can create a progress bar using the data-progress attribute. You can also add this bar using javascript.

**Parameters**
```
string:     Element query selector.
number:     The percentage value.
boolean:    Boolean to show the percentage label.
```

*Example*
``` html
<section id="main" data-transition="">
    <article id="main-article" class="active list indented scroll">
        <form>
            <div class="progress">
                <span class="bar">
                    <span class="value"></span>
                </span>
            </div>
        </form>
    </article>
</section>
```
``` javascript
Lungo.Element.progress("#progress-normal", 65, true);
```




### Pull&Refresh
As it has been shown in the prototyping chapter, you can create a pull and refresh element addind data-pull and some javascript code.

**Parameters**
```
string:     Element query selector.
object:     Object with the configuration.
```

*Example*
``` html
<section id="main" data-pull="normal">
    <header data-title="Pull & Refresh"></header>
    <article id="main-article">
        <ul>
             <li class="dark" data-icon="help">
                    <strong>
                    Test this featury only drag down.
                </strong>
                <small>This element has an associated event</small>
            </li>
        </ul>
    </article>
</section>
```

``` javascript
var pull_example = new Lungo.Element.Pull('#main-article', {
    onPull: "Pull down to refresh",      //Text on pulling
    onRelease: "Release to get new data",//Text on releasing
    onRefresh: "Refreshing...",          //Text on refreshing
    callback: function() {               //Action on refresh
        alert("Pull & Refresh completed!");
        pull_example.hide();
    }
});
```


### Menu (Pending)



Notification
------------
To display notifications, many times people tend to use the javascript alert() function. The notification it shows looks different depending on the browser. Lungo has a notification system that shows pretty and responsive notifications styled in the same way in all the browsers, making your app look the same no matter the browser you use.


#### show()
Shows a customized notification.

**Parameters**
```
string:     The icon, null for no icon.
string:     Notification's title.
number:     The time to show the notification, 0 for unlimited.
function:   A function to execute when hiding the notification.
```
If you call to the show function without parameters it will show a loading screen

*Example*
``` javascript
var afterNotification = function(){
    //Do something
};

Lungo.Notification.show(
    "check",                //Icon
    "Success",              //Title
    3,                      //Seconds
    afterNotification       //Callback function
);

//Show loading screen
Lungo.Notification.show();
```


#### hide()
Hides the current notification.

*Example*
``` javascript
Lungo.Notification.hide();
```


#### success()
Shows success notification.

**Parameters**
```
string:     Notification's title.
string:     Notification's description.
string:     The icon, null for no icon.
number:     The time to show the notification, 0 for unlimited.
function:   A function to execute when hiding the notification.
```

*Example*
``` javascript
var afterNotification = function(){
    //Do something
};

Lungo.Notification.success(
    "Success",                  //Title
    "Successful operation",     //Description
    "check",                    //Icon
    7,                          //Time on screen
    afterNotification           //Callback function
);
```


#### error()
Shows an error notification.

**Parameters**
```
string:     Notification's title.
string:     Notification's description.
string:     The icon, null for no icon.
number:     The time to show the notification, 0 for unlimited.
function:   A function to execute when hiding the notification.
```

*Example*
``` javascript
var afterNotification = function(){
    //Do something
};

Lungo.Notification.error(
    "Error",                      //Title
    "Unsuccessful operation",     //Description
    "cancel",                     //Icon
    7,                            //Time on screen
    afterNotification             //Callback function
);
```


#### confirm()
Shows a confirmation notification.

**Parameters**
```
object:     An object with the notification's config.
```

*Example*
``` javascript
Lungo.Notification.confirm({
    icon: 'user',
    title: 'Title of confirm.',
    description: 'Description of confirm.',
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
```


#### html()
Creates a notification using your own html code.

**Parameters**
```
string:     The html code for the notification.
boolean:    The closing button text.
```

*Example*
``` javascript
Lungo.Notification.html('<h1>Hello World</h1>', "Close");
```



Router
------
Lungo.Router provides the user with the neccesary functions to manage the navigation through javascript. The following functions allow developers to work with the navigation through sections, articles and also asides.


#### section()
This function allows the navigation from a section to another one. It is done to navigate forward to a section, if you want to go back to a previous one you have to use the back function which will be explained later.

**Parameters**
```
string:     The section's id.
```

*Example*
``` javascript
Lungo.Router.section("features");
```


#### hide()
This function allows the navigation from an article to another one.

**Parameters**
```
string:     The article's id.
```

*Example*
``` javascript
Lungo.Router.article("list","list-indented");
```


#### aside()
Toggles the aside in a particular section.

**Parameters**
```
string:     The section's id.
string:     The aside's id.
```

*Example*
``` javascript
Lungo.Router.aside('main', left_menu);
```


#### back()
Lungo uses the bread crumb pattern, so to return to a previous section you have to use the Lungo.Router.back function.

*Example*
``` javascript
Lungo.Router.back();
```



Service
-------
Lungo can also make ajax requests to web services.


#### Settings
Object containing the ajax configuration.

*Example*
``` javascript
Lungo.Service.Settings.async = true;
Lungo.Service.Settings.error = function(type, xhr){
    //Do something
};
Lungo.Service.Settings.headers["Content-Type"] = "application/json";
Lungo.Service.Settings.crossDomain = false;
Lungo.Service.Settings.timeout = 10;
```


#### get()
Load data from the server using a HTTP GET request.

**Parameters**
```
string:     The URL to which the request is sent.
object:     A map or string to to the server.
function:   [OPTIONAL] Callback function. (Asynchronous)
string:     [OPTIONAL] Mime-Type: json, xml, html, or text.
```

*Example*
``` javascript
var url = "http://localhost:8080/myService";
var data = {id: 25, length: 50};
var parseResponse = function(result){
    //Do something
};

Lungo.Service.get(url, data, parseResponse, "json");

//Another example
var result = Lungo.Service.get(url, "id=25&len=50", null, "json");
```


#### post()
Load data from the server using a HTTP POST request.

**Parameters**
```
string:     The URL to which the request is sent.
object:     A map or string to send to the server.
function:   [OPTIONAL] Callback function. (Asynchronous)
string:     [OPTIONAL] Mime-Type: json, xml, html, or text.
```

*Example*
``` javascript
var url = "http://localhost:8080/myService";
var data = {id: 25, length: 50};
var parseResponse = function(result){
    //Do something
};

Lungo.Service.post(url, data, parseResponse, "json");

//Another example
var result = Lungo.Service.post(url, "id=25&len=50", null, "json");
```


#### json()
Load data from the server using a HTTP GET request and mime-type JSON.

**Parameters**
```
string:     The URL to which the request is sent.
object:     A map or string to send to the server.
function:   [OPTIONAL] Callback function. (Asynchronous)
```

*Example*
``` javascript
var url = "http://localhost:8080/myService";
var data = {id: 25, length: 50};
var parseResponse = function(result){
    //Do something
};

Lungo.Service.json(url, data, parseResponse);

//Another example
var result = Lungo.Service.json(url, "id=25&len=50");
```


#### cache()
Auto-caching system with date pattern for HTTP GET requests.

**Parameters**
```
string:     The URL to which the request is sent.
object:     A map or string to send to the server.
string:     Date pattern (example: 15 minutes, 1 hour, 3 days).
function:   [OPTIONAL] Callback function. (Asynchronous)
string:     [OPTIONAL] Mime-Type: json, xml, html, or text.
```

*Example*
``` javascript
var url = "http://localhost:8080/myService";
var data = {id: 25, length: 50};
var parseResponse = function(result){
    //Do something
};

Lungo.Service.cache(url, data, "2 hours", parseResponse, "json");

//Another example
var result = Lungo.Service.cache(
    url,
    "id=25&len=50",
    "2 hours",
    null,
    "json"
);
```


View
----
lorem

### article
lorem

### aside
lorem


