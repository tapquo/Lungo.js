Lungo - *Cross-Device Framework*
================================

## 3.3 DOM
Lungo uses the famous library [QuoJS](http://quojs.tapquo.com) to handle the DOM of your application. QuoJS is a micro, modular, Object-Oriented and concise JavaScript Library that simplifies HTML document traversing, event handling, and Ajax interactions for rapid mobile web development. It allows you to write powerful, flexible and cross-browser code with its elegant, well documented, and micro coherent API.


### 3.3.1 DOM manipulation
Using QuoJs, you can chain functions to execute several commands in one row. For more info about [Quo's](http://quojs.tapquo.com) API please go here.

**EXAMPLE**

```
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

// Subscribe to a tap event with a callback
Lungo.dom('#main-article li').tap(function(event) {
    Lungo.dom(this).toggleClass('light').toggleClass('dark');
});

```


### 3.3.2 Triggers
When sections or articles are switched an event is launched. The target section/article will launch an `load` event and the current section/article will launch the `unload` one. We can bind to this events using QuoJs.

**EXAMPLE**

```
<section id="section1">
    <article id="article1">
        <button data-view-section="section2" data-label="2nd Section"></button>
    </article>
</section>
<section id="section2">
    <article id="article2">{{CONTENT}}</article>
</section>

// JavaScript Code
Lungo.dom('#section1').on('unload', function(event) {
    alert("Unloaded section 1");
});

Lungo.dom('#section2').on('load', function(event){
    alert("Loaded section 2");
});
```
