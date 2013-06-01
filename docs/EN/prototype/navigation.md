Lungo - *Cross-Device Framework*
================================

## 2.3 Navigation
The navigation in Lungo is entirely semantic, and you will use the element `<a>` or `<button>` and his data attribute "view-*" to tell the system which `<section>`, `<article>` or `<aside>` you want to go to.

### 2.3.1 Data-View-* attribute
The `data-view-*` attribute is set in the `<a>` or `<button>` element to set the type of element we are going to navigate to (`<section>`, `<article>` or `<aside>`) and in the href attribute the hashbang plus the id of the element has to be set. For this purpopuse Lungo uses the bread crumbs.

```
<section id="main">
    <article id="article_1" class="active">
        <button class="button" data-view-article="article_1" data-icon="forward">To article_2</button>
    </article>
    
    <article id="article_2">
        <button class="button" data-view-article="article_2" data-icon="home" data-label="To article_1"></button>
    </article>
</section>
```


### 2.3.2 Data-back attribute
As it has been said before, Lungo's navigation is based on the bread crumbs pattern, so navigation backwards between sections is done using the data-back functionality. You can set a button in your header using the data-back attribute or use in `<a>` or `button` tags data-router="section" with href="#back"

```
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


### 2.3.3 Nav
To create simple structures of navigation buttons within a footer or header the nav element has to be used. In the header, the nav element's position will depend on the class applied to it. `left` to the left and `right` to the right.

```
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


### 2.3.4 Groupbar
Lungo gives you the capability to have a special menu at the top of your UI. To do this you have to extend the header element using class="extended" and create inside of it a nav element with class="groupbar"

```
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


### 2.3.5 Title Bindings
To update the title of a section through the navigation, just use the attribute `data-title` in your navigation element.

```
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


### 2.3.6 Visualization bindings
You can show nav elements when a particular article is visible.

```
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