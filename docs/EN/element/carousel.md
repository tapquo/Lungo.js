Lungo - *Cross-Device Framework*
================================

## 3.4.5 Lungo.Element.Carousel
Lungo has a carousel element where content can be published can be published and the user can navigate through it using the caroussel controls.

**PARAMETERS**

```
string:		Element query selector.
function:	Function to execute when switching slide.
```

**EXAMPLE**

```
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

// JavaScript Code
var el = Lungo.Dom('[data-control=carousel]').first();

var example = Lungo.Element.Carousel(el, function(index, element) {
    Lungo.dom("section#carousel .title span").html(index + 1);
});
```

### 3.4.5.1 .prev()
Show the previous slide.

**EXAMPLE**

```
var example = Lungo.Element.Carousel(Lungo.Dom('[data-control=carousel]').first());
Lungo.dom('[data-direction=left]').tap(example.prev);
```


### 3.4.5.2 .next()
Show the next slide.

**EXAMPLE**

```
var example = Lungo.Element.Carousel(Lungo.Dom('[data-control=carousel]').first());
Lungo.dom('[data-direction=left]').tap(example.next);
```


### 3.4.5.3 .position()
Returns the actual index.

**EXAMPLE**

```
var example = Lungo.Element.Carousel(Lungo.Dom('[data-control=carousel]').first());
example.next();
alert(example.position());
```