Lungo - *Cross-Device Framework*
================================

## 3.4.2 Lungo.Element.Count
As it has been shown in the prototyping chapter, you can create a progress bar using the data-progress attribute. You can also add this bar using javascript.

**PARAMETERS**

```
string:		Element query selector.
number:		The percentage value.
boolean:	Boolean to show the percentage label.
```

**EXAMPLE**

```
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

Lungo.Element.progress("#progress-normal", 65, true);
```

