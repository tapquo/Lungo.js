Lungo - *Cross-Device Framework*
================================

## 3.4.1 Lungo.Element.Count
As it has been shown in the prototyping chapter, you can add a counter to elements using the data-count attribute. You can also add this counter using javascript.


### 3.4.1.1 JavaScript method
Set a counter to the element:

**PARAMETERS**

```
string:		Element query selector.
number:		Value of the counter.
```

**EXAMPLE**

```
Lungo.Element.count("#messages", 5);
```


### 3.4.1.2 HTML
You can define via HTML a default value for a count element.

**EXAMPLE**

```
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
