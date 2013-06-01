Lungo - *Cross-Device Framework*
================================

## 3.4.4 Lungo.Element.Pull
As it has been shown in the prototyping chapter, you can create a pull and refresh element addind data-pull and some javascript code. Here you will see how to write the javascript code.

**PARAMETERS**

```
string:		Element query selector.
object:		Object with the configuration.
```

**EXAMPLE**

```
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

