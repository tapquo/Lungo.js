Lungo - *Cross-Device Framework*
================================

## 3.4.3 Lungo.Element.Loading
As it has been shown in the prototyping chapter, you can create a loading animation using the data-loading attribute. You can also add this animation using javascript

**PARAMETERS**

```
string:		Element query selector.
string:		[OPTIONAL] Stylesheet.
```
This method **returns** an instance of the object founded.

**EXAMPLE**

```
<section id="main" data-transition="">
    <header data-title="loading"></header>
    <article id="main-article"></article>
</section>

// JavaScript Code
Lungo.Element.loading("#main-article", 1);
```

