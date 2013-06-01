Lungo - *Cross-Device Framework*
================================

## 2.2 Elements
In the ["Getting started" chapter](https://github.com/tapquo/Lungo.js/blob/master/docs/EN/prototype/get_started.md) we have talked about the basic structure of the application. To do that we used sections and articles. But Lungo uses the semantic language markup introduced with HTML5, so you can add this elements using the new semantic tags.

### 2.2.1 Section & Article
A `<section>` is a view of our application where content will be displayed and where there may be subelements as `<header>`, `<footer>` and `<article>`.

```
<section id="main">
    <article id="main-article" class="active">
        {{CONTENT}}
    </article>
</section>
```

The content a particular `<section>` is structured by `<article>`. Within a section may be as many `<article>` as you like. The article of the section that will be shown first must have th `class="active"` attribute set.

```
<section id="main_section">
    <header data-title="example"></header>

    <article id="main-article" class="active">
        {{CONTENT}}
    </article>
</section>
```


### 2.2.2 Headers
Each `<section>` can contain a `<header>` where the tittle of the section will be shown. Optionally you can add navigation buttons, to go to another section, go back to a previous one, go to another article or just open the aside menu.

```
<section id="main_section">
    <header data-title="example"></header>

    <article id="main-article" class="active">
        {{CONTENT}}
    </article>
</section>
```


### 2.2.3 Footers
Each `<section>` can contain a `<footer>`. There you can add buttons to navigate through articles, sections and even asides.

```
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


### 2.2.4 Aside
The `<aside>` element gives us a lateral area which will appear depending on the device (tablet) or hidden (mobile). Its structure is very similar to the section one's. We can create a link that references a `<aside>` with a particular id using the navigation system of Lungo. We will use the attribute data-router (which will be discussed in subsequent chapters). We can also define the positioning of it, using style classes. The default position is left.

```
<aside id="features">
    <header data-title="Options"></header>
    <article class="active">
        {{CONTENT}}
    </article>
</aside>
```

In your section you need link your aside (#features) with `data-aside` attribute, and you can display/hide with attribute `data-view-aside`:

```
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