Lungo - *Cross-Device Framework*
================================

## 2. How to prototype
Here you have the minimum structure of your Lungo application's body. It must contain at least: 

```
<section id="main">
	<article id="main-article">
		Your content
	</article>
</section>
```

`<section>` it's the main container of your UI Components in your App and `<article>` it must be placed inside your section and must have…. Each section and article must contain an unique ID. The JavaScript function that initializes Lungo it's:

```
Lungo.init({
    name: 'example'
});
```

#### Load Sync resources on init
To make easier to create and modify your app you can create the sections in separate html files and load the synchonously, making your main file smaller and having your code organized better.

```
//Load resource on app init
Lungo.init({
    name: 'example',
    resources: ['section_to_load.html']
});
```

#### Load async resources by link
There is other way to load resources asynchronously, just add to the `<a>` tag element the attribute data-async with the link to the section.

```
<section id="loader" data-transition="">
    <article id="art1" class="active">
        <a href="#main" data-router="section" data-async="section_to_load.html">
            Go to section
        </a>
    </article>
</section>
```