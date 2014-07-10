LungoJS
=======
LungoJS es un framework HTML5 pensado en los desarrolladores a los que también les gusta el diseño, desarrollado para que crear aplicaciones compatibles con todos los dispositivos.

 * **Apps HTML5 optimizadas**: Soporta los open web standards como HMTL5, CSS3 y JavaScript. Proporciona un entorno consistente basado en navegador para cualquier dispositivo movil, TVs y aplicaciones de escritorio.

 * **Proyecto Open Source**: Cada nueva linea de código en Lungo es bienvenida, esperamos que cualquier desarrollador con mente intrépida nos ayude a mejorar día a día Lungo.

 * **Una poderos API JavaScript**: Existen muchas maneras de desarrollar un app pero no todas ellas de manera optimizada. Lungo te ofrece una API robusta con la que puedes tener completo control de todo lo que suceda en tu App.

 * **Soporte multiplataforma**: Es sabido que desarrollar apps para cada plataforma tiene un coste alto y mas aún si se tienen en cuenta el desarrollo para tablets y SmartTVs. Lungo se ajusta a todos ellos crean una interfaz de usuario única para todos ellos.

*Current version: [2.2.0]()*



Empieza a usarlo
----------------
La idea de Lungo surgió en el año 2010 cuando Javi Jiménez Villar ([**soyjavi**](https://twitter.com/soyjavi)) se dio cuenta de que los frameworks existentes en aquella época no eran muy versátiles y no hacían uso de las principales funcionalidades de HMTL5.

### Comunidad
Si esta documentación se te queda corta siempre te puedes suscribir a la comunidad de Lungo para compartir experiencias y conocimientos. En [Inglés](https://groups.google.com/forum/#!forum/lungojs) o [Castellano](https://groups.google.com/forum/#!forum/lungojs_es), tu decides.


### GitHub
Este es un proyecto opensource, asi que sientete libre de hacer un fork del proyecto para ayudarnos a mejorar Lungo. Todo el código fuente está escrito en CoffeScript y Stylus, como es código limpio podrás modificarlo de manera sencilla y realizar tus aportes.

[https://github.com/tapquo/lungo.js](https://github.com/tapquo/lungo.js)

### Licencia
Lungo esta bajo una licencia GPLv3 para mas información [LICENSE](https://github.com/tapquo/Lungo.js/blob/master/LICENSE.md).

### Ayudanos a mejorar
Por favor no tengas ninguna duda en contactarnos si crees que puedes realizar mejoras sobre la API. Si piensas que deberíamos dar soporte a alguna nueva funcionalidad o si encuentras un bug, utiliza GitHub issues](https://github.com/tapquo/lungo.js/issues). Sientete libre de mejorar esta documentación y mandanos tus *pull requests* con tus mejoras.

Para contactar con nosotros o con otros desarrolladores acerca de la API de Lungo suscribete a nuestra [**lista de correo**](https://groups.google.com/forum/#!forum/lungojs).

Fácil de Prototipar
===================
El objetivo es crear una estructura semántica en todo el proyecto, desde el lenguaje de marcado HTML, pasando por las clases CSS bien organizadas y acabando con la API JavaScript. Lungo ofrece una gran sencillez a la hora de hacer un prototipo rápido de tu aplicación, no te será necesario escribir ninguna línea de JavaScript para visualizar como debería comportarse tu aplicación. En esta documentación aprenderemos cuales son los elementos semánticos que utiliza Lungo y como se puede crear una aplicación unicamente con HTML. Así que no le demos mas vueltas y comencemos!

Estructura
----------
Estas son las dependencias de tu aplicación Lungo, como mínimo deberia contener las siguientes:

	html
	<link rel="stylesheet" href="components/lungo.brownie/lungo.css">
	<link rel="stylesheet" href="components/lungo.icon/lungo.icon.css">
	<link rel="stylesheet" href="components/lungo.brownie/lungo.theme.css">
	<script src="components/quojs/quo.js"></script>
	<script src="components/lungo/lungo.js"></script>


`<section>` es el contenedor principal de la interfaz de usuario en tu app y `<article>` se debe colocar dentro de tu section,cada section y article deberían tener un ID único.
``` html
<section id="main">
    <article id="main-article">
        Your content
    </article>
</section>
```

<strong>Recuerda:</strong>La función JavaScript para inicializar el entorno de Lungo:
``` javascript
Lungo.init({});
```

#### Carga de los recursos síncronos al inicializar Lungo
Para que te sea mas sencillo crear y modificar tu app puedes crear las secciones en ficheros htmls separados y cargarlos de manerá síncrona, dejando tu fichero html principal mucho mas limpio y organizando mejor tu código.
``` javascript
//Cargar recurso al inicio
Lungo.init({
    name: 'example',
    resources: ['section_to_load.html']
});
```

#### Carga de los recursos asíncronos mediante enlance
Solo existe una manera de cargar los recursos de manera asíncrona, simplemente añade a la etiqueta `<a>` el atributo data-async con el enlace a tu sección.
``` html
<section id="loader" data-transition="">
    <article id="art1" class="active">
        <a href="#main" data-router="section" data-async="section_to_load.html">
            Go to section
        </a>
    </article>
</section>
```


Elementos básicos
-----------------
Lungo utiliza el lenguaje semántico introducido en HMTL5, así que puedes añadir estos elementos utilizando las etiquetas semánticas.

### Section y Article
Una `<section>` es una vista donde se desplegará el contenido y existen muchos subelementos como `<header>`, `<footer>` y `<article>`.
``` html
<section id="main">
    <article id="main-article" class="active">
        {{CONTENT}}
    </article>
</section>
```
El contenido de una `<section>` en particular esta estructurado por los `<article>`. Una `<section>` puede contener tantos `<article>` como quieras. El artículo que tiene preferencia para visualizarse es el que tenga la `class="active" como atributo.

``` html
<section id="main_section">
    <header data-title="example"></header>
    <article id="main-article" class="active">
        {{CONTENT}}
    </article>
</section>
```


### Header
Cada `<section>` puede contener un `<header>` donde se visualizará el título de la sección en donde estés. También puedes añadirle si quieres botones para la navegación, que te muevan de una sección a otra, vuelvan a la sección anterior, cambien de artículo o simplemente abran el menu aside.

``` html
<section id="main_section">
    <header data-title="example"></header>
    <article id="main-article" class="active">
        {{CONTENT}}
    </article>
</section>
```


### Footer
De la misma manera cada `<section>` puede contener un `<footer>` y añadirle botones para navegar entre artículos, secciones o incluso menus laterales (aside).

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
El elemento `<aside>` nos proporciona una area que se despliega de los laterales que podrá desplegarse o no en función del dispositivo en el que estemos. Por ejemplo un menu lateral que por defecto este oculto en móviles pero visible en tablets. La estructura es muy similar a la sección. Podemos crear un enlace que referencie un `<aside>` con una id en particular utilizando el sistea de navegación de Lungo. Utilizaremos el atributo data-router (El cual veremos mas adelante). También podemos definirle la posición utilizando estilos mediante las clases. Por defecto el aside estará a la izquierda de la pantalla.

``` html
<aside id="features">
    <header data-title="Options"></header>
    <article class="active">
        {{CONTENT}}
    </article>
</aside>
```
En tu sección si quieres que se visualice el aside automáticamente necesitas enlazar tu aside con el atributo `data-aside`, y puedes mostrarlo u ocultarlo con el atributo `data-view-aside`.
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

Navigación
----------
La navegación de Lungo se realiza de una manera semántica, se utiliza el elemento `<a>` o `<button>` y el atributo "view-*" para indicarle a Lungo a que `<section>`, `<article>` o `<aside>` quieres ir.

### Atributo Data-View
El atributo `data-view-*` se coloca en  los `<a>` o `<button>` para indicar a que tipo de elemento queremos navegar (`<section>`, `<article>` o `<aside>`) o si usamos el atributo href se debe usar un hashbang(#) mas el id del elemento destino. Lungo utiliza el href para ir dejando trazada la navegación de tu aplicación como si de una miga de pan se tratase.

``` html
<section id="main">
    <article id="article_1" class="active">
        <button class="button" data-view-article="article_2" data-icon="forward">To article_2</button>
    </article>
    <article id="article_2">
        <button class="button" data-view-article="article_1" data-icon="home" data-label="To article_1"></button>
    </article>
</section>
```

### Atributo Data-back
Como se ha mencionado anteriormente la Navegación de Lungo funciona como si se tratase de un rastro de migas de pan, por lo que la navegación hacia atrás entre secciones se realiza de manera sencilla utilizando data-back. Puedes poner un botón en tu header con data-back o utilizar en `<a>` o `<button>` un data-router="section" enlazandolo hacia detrás con href="#back".

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
Para crear estructuras de navegación con botones ya sea en un header o en un footer se ha de usar el elemento nav. En el header la posición del elemento nav dependera de la clase que se le aplique. `left` para la izquierda y `right` para la derecha.

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
Lungo te da la capacidad de tener un menu especial en la parte superior de un interfaz. Para ello tienes que extender el elemento header utilizando class="extended" y crear dentro de el un elemento de navegacion nav con class="groupbar".

``` html
<section id="main">
    <header data-title="groupbar" class="extended"></header>

    <nav data-control="groupbar">
        <a href="#" data-view-article="article_1" class="active">Art-1</a>
        <a href="#" data-view-article="article_2">Art-2</a>
    </nav>

    <article id="article_1" class="active">{{CONTENT}}</article>
    <article id="article_2">{{OTHER_CONTENT}}</article>
</section>
```

### Menu
Además de los elementos `<nav>` `y` *groupbar* existe otra manera de que el usuario seleccione una nueva vista de tu aplicación. Desde la version 2.2 Brownie está disponible el control de *menu* y se utiliza poniendo el atributo 
`data-view-menu`:

```html
<section id="menu" data-transition="slide">
    <header data-title="data-control=menu">
        <nav>
            <a href="#" data-view-menu="options" data-icon="menu"></a>
        </nav>
        <nav class="on-right">
            <a href="#" data-view-menu="options-icons" data-icon="grid"></a>
        </nav>
    </header>  
    <nav id="options" data-control="menu">
	    <a href="#" data-view-article="home-menu" data-icon="menu">Home</a>
	    <a href="#" data-view-article="explore-menu" data-icon="globe">Explore</a>
	    <a href="#" data-view-article="activity-menu" data-icon="comments">Activity</a>
	    <a href="#" data-view-article="profile-menu" data-icon="user">Profile</a>
	</nav>
</section>
```
En el caso de que quieras dar prioridad a los iconos simplemente tienes que aplicar la clase `icons`:

```html
<nav id="options-icons" data-control="menu" class="icons">
    …
</nav>
```

Bindings (Vínculos)
-------------------
#### Títulos vinculados
Para que se actualice automáticamente el título de una sección mediante la navegación tan solo hay que usar el atributo `data-title` en tu elemento de navegación
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

#### Elementos vinculados
Puedes mostrar elementos nav cuando un artículo en particular sea visible con el atributo data-article:

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

* [Elementos](https://github.com/tapquo/Lungo.js/blob/master/docs/EN/prototype/elements.md)
* [Navegación](https://github.com/tapquo/Lungo.js/blob/master/docs/EN/prototype/navigation.md)


Formularios
-----------
Los formularios siempre han sido algo tedioso de manejar en los proyectos web, Lungo te ayuda a crear una base para los formularios que sea uniforme y que proporcione una experiencia de usuario similar en los distintos navegadores. Todos los controles desde los `input` (todas sus variantes) a los `button` están perfectamente adaptados para ser usados con dispositivos táctiles. Tan solo tienes que usar el elemento `form` o la clase `form`:
``` html
<div class="form">
	<fieldset>
	    <label>Input</label>
	    <input type="text" placeholder="value">
	    <label>Input styled</label>
	    <input type="text" placeholder="value on right" class="text align_right error">
	    <label>Select</label>
	    <label class="select">
	        <select>
	            <option value="1">HTML5</option>
	            <option value="2">CSS3</option>
	            <option value="3">JavaScript</option>
	        </select>
	    </label>
	    <label>Input date</label>
	    <input type="date" class="align_right" placeholder="Select finish" value="10/04/1980"/>
        <label class="anchor">Example of touch checkbox</label>
        <input type="checkbox" class="inline right" />
	</fieldset>
</div>
```


Listas
------
¿Es posible imaginar una app que no tenga listas? Nosotros no podemos imaginar tal cosa, por lo que Lungo ofrece gran variedad de componentes para crear listas que se ajusten a tus gustos y necesidades. Siempre teniendo en cuenta que todo empieza con un elemento `<ul>` seguido por un elemento `<li>`:

``` html
<article id="example" class="list">
   <ul>
		<li>
			<strong>Title</strong>
			<small>Description</small>			
		</li>
		...
   </ul>
</article>
```
Nuestro elemento `<li>` puede ser construido de varias maneras, y hacerlo todo lo complejo que necesites, aquí tienes un ejemplo de un listado mas completo:

``` html
<li class="thumb big">
    <img src="http://cdn.tapquo.com/lungo/icon-144.png" />
    <div>
        <div class="on-right text tiny">lorem ipsum</div>
        <strong>Title</strong>
        <span class="text tiny opacity">lorem ipsum</span>
        <small>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, aliquam, nisi commodi blanditiis.
        </small>
    </div>
</li>
```
Si quieres ver mas ejemplos de todos los posibles estilos que aplicar a una lista visita nuestra app de ejemplo *Kitchen-Sink*

API JavaScript
==============

Core (núcleo)
-------------
Lungo dispone de varios métodos que se usan internamente en su motor. Aquí los teneís por si deseís incluir parte de su funcionalidad en vuestra aplicación.

#### log()
Sistema de consola para desplegar mensajes cuando estas debuggeando.
**Parameters** (Parámetros)
```
number:     Severity based in (1)Log, (2)Warn, (>2)Error
string:     Message to show in the console
```

*Ejemplo*
``` javascipt
Lungo.Core.log(1, "Launched event");
Lungo.Core.log(2, "Warning!!");
Lungo.Core.log(3, "Error!!!!");
```


#### execute()
Ejecuta los callback en función de los paramentros introducidos.
**Parameters** (Parámetros)
```
function:   callback to execute
```

*Ejemplo*
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
Crea una nueva función que cuando se la llama, en sí llama a esta función en el contexto del valor proporcionado, con la secuencia dada de argumentos.

**Parameters** (Parámetros)
```
object:     object that 'this' can refer in the new function.
function:   A function object.
```

Este método devuelve la funcion que realizará la acción sobre el objeto.

*Ejemplo*
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
Copia cuantos objetos reciba por parámetro y los mezcla todos dentro de un nuevo objetos, la implementación es muy sencilla. simplemente itera sobre los argumentos del objeto y copia cada propiedad de cada objeto recibido por parámetro.

**Parameters** (Parámetros)
```
object:     arguments to mix them all into a new object.
object:     arguments to mix them all into a new object.
```
Este método devuelve el objeto con el mix.

*Ejemplo*
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
Todos los objetos que descienden de Object heredan el método hasOwnProperty. Este método se usa para determinar si un objeto tiene una propiedad directa específica.

**Parameters** (Parámetros)
```
object:     object to test for a property's existence inside itself.
string:     property the name of the property to test.
```
Este método devuelve un boolean indicando si la propiedad existe o no.

*Ejemplo*
``` javascript
var car = {wheels:4,doors:true};
Lungo.Core.isOwnProperty(car,"wheels"); //Result: true
Lungo.Core.isOwnProperty(car,"wings");      //Result: false
```


#### toType()
Determina la [[Class]] interna JavaScript de un objeto.

**Parameters** (Parámetros)
```
object:     object to get the real type of itself.
```
Este método devuelve un string con la [[Class]] interna de JavaScript

*Ejemplo*
``` javascript
var name = "Lungo";
Lungo.Core.toType(name);    //Result: "string"
```


#### toArray()
Transforma un objeto del tipo array en un objeto array de JavaScript.

**Parameters** (Parámetros)
```
object:     Any object to turn into a native Array.
```
Este método devuelve el objeto convertido en un array plano.

*Ejemplo*
``` javascript
var execute = function() {
    var args = lng.Core.toArray(arguments);
}
```


#### isMobile()
Determina si el entorno en el que se está ejecutando es móvil o no. Este método devuelve un objeto que ha sido mezclado con la función mix.

*Ejemplo*
``` javascript
Lungo.Core.isMobile();
```


#### environment()
Devuelve la información del entorno en el que se está ejecutando.

*Ejemplo*
``` javascript
Lungo.Core.environment();
```


#### orderByProperty()
Ordena objetos en función de sus propiedades.

**Parameters** (Parámetros)
```
list:       List of objects.
string:     Name of the property.
string:     Type of order: asc or desc.
```
Este método devuelve una lista ordenada de objetos ordenada por una propiedad.

*Ejemplo*
``` javascript
var list = [
    {name: 'Lungo', twitter: 'lungojs'},
    {name: 'Quojs', twitter: 'quojs'},
];

var ordered_list = lng.Core.orderByProperty(list, 'name', 'asc');
```

#### findByProperty()
Busca si existe algún objeto con la propiedad especificada por parámetro.

**Parameters** (Parámetros)
```
list:       The list with objects.
string:     Name of the property.
```
Este método devuelve una instancia del objeto si se a encontrado null si no.

*Ejemplo*
``` javascript
var list = [
    {name: 'Lungo', twitter: 'lungojs'},
    {name: 'Quojs', twitter: 'quojs'},
];

var user = lng.Core.findByProperty(list, 'name', 'Lungo');
```


Caché
-----
Lungo implementa su propia caché. Esta caché se encarga de almacenar el valor hasta que la webapp se cierra.

#### set()
Pone en el sistema de caché de Lungo un nuevo par clave/valor.

**Parameters** (Parámetros)
```
string:     Key for the new value.
string:     [OPTIONAL] Subkey in LungoJS Cache System.
object:     Value asigned to the key.
```

*Ejemplo*
``` javascript
var framework = {name: "Lungo", twitter: "lungojs"};
Lungo.Cache.set("lungoFramework", framework);
```


#### get()
Devuelve el valor en caché del par clave/valor.

**Parameters** (Parámetros)
```
string:      Key in LungoJS Cache System.
string:     [OPTIONAL] Subkey in LungoJS Cache System.
```
Este método devuelve un objeto que contiene el valor.

*Example*
``` javascript
var cachedFramework = Lungo.Cache.get("lungoFramework");
//Result: {name: "Lungo", twitter: "lungojs"}
```


#### remove()
Borra la instancia de un determinado par clave/valor alojado en la caché de Lungo.

**Parameters** (Parámetros)
```
string:     Key in LungoJS Cache System.
string:     [OPTIONAL] Subkey in LungoJS Cache System.
```

*Ejemplo*
``` javascript
Lungo.Cache.remove("lungoFramework");
```


#### exists()
Comprueba si un determinado par especificado por la clave se encuentra guardado en la caché de Lungo.

**Parameters** (Parámetros)
```
string Key in LungoJS Cache System.
```
Este método devuelve un boolean, true si existe false en caso contrario.

*Ejemplo*
``` javascript
Lungo.Cache.exists("lungoFramework");
```


DOM
---
Lungo utiliza la famosa libreria [QuoJS](http://quojs.tapquo.com) para manejar el DOM de tu aplicación. Quo es una micro librería JavaScript modular y orientada a objectos que simplifica la gestión del documento HTML,la gestión de eventos y las interacciones con Ajax para el desarrolo agil de nuestras aplicaciones móviles. Te permite escribir código flexible y util para todos los navegadores.

### Manipulación del DOM
Utilizando QuoJS, puedes encadenar varias funciones en una misma línea. Para mas información de la API de [Quo](http://quojs.tapquo.com).

*Ejemplo*
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


### Triggers (Disparadores)
Cuando las secciones o artículos se cambian se lanza un evento. El section/article destino lanzará un evento `load` y la section/article origen lanzará un evento `unload`. Podemos vincular ambos eventos usando QuoJS.

*Ejemplo*
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


.Element
--------

### .Carousel
Lungo dispone de un elemento carousel donde publicar el contenido y el usuario navegar con el mediante los controles del carousel.

**Parameters** (Parámetros)
```
string:     Element query selector.
function:   Function to execute when switching slide.
```

*Ejemplo*
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
Muestra la slide anterior.
*Ejemplo*
``` javascript
var example = Lungo.Element.Carousel(el);
Lungo.dom('[data-direction=left]').tap(example.prev);
```

#### Carousel.next()
Muesta la slide siguiente.
*Ejemplo*
``` javascript
var example = Lungo.Element.Carousel(el);
Lungo.dom('[data-direction=left]').tap(example.next);
```

#### Carousel.position()
Devuelve el índice de la slide actual.
*Ejemplo*
``` javascript
var example = Lungo.Element.Carousel(el);
example.next();
alert(example.position());
```


### .count
Como mencionamos previamente en la parte de prototipado, puedes añadir un contador a los elementos usanto el atributo data-count. También puedes añadir este contador mediante JavaScript

#### Método JavaScript
Establece un contador al elemento:

**Parameters** (Parámetros)
```
string:     Element query selector.
number:     Value of the counter.
```

*Ejemplo*
``` javascript
Lungo.Element.count("#messages", 5);
```


#### método HTML
Puedes definir mediante HTML un valor por defecto para el elemento contador.

*Ejemplo*
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


### .loading
También puedes crear un elemento loading para representar los momentos en los que estas realizando la carga de datos utilizando el atributo data-loading. Otra manera de mostrar la animación de carga es utilizando JavaScript.

**Parameters** (Parámetros)
```
string:     Element query selector.
string:     [OPTIONAL] Stylesheet.
```
Este método devuelve una instance del objeto.

*Ejemplo*
``` html
<section id="main" data-transition="">
    <header data-title="loading"></header>
    <article id="main-article"></article>
</section>
```
``` javascript
Lungo.Element.loading("#main-article", 1);
```


### .progress
También es posible crear una barra de progreso utilizando el atributo data-progress. Otra manera de mostrar la animación de carga es utilizando JavaScript.

**Parameters** (Parámetros)
```
string:     Element query selector.
number:     The percentage value.
boolean:    Boolean to show the percentage label.
```

*Ejemplo*
``` html
<section id="main" data-transition="">
    <article id="main-article" class="active list indented scroll">
        <form>
            <div id="prg-example" class="progress">
                <span class="bar">
                    <span class="value"></span>
                </span>
            </div>
        </form>
    </article>
</section>
```
``` javascript
Lungo.Element.progress("#prg-example", 65, true);
```


### .Pull
Para crear un elemento pull and refresh añade el atributo data-pull o hazlo mediante JavaScript.

**Parameters** (Parámetros)
```
string:     Element query selector.
object:     Object with the configuration.
```

*Ejemplo*
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


###.Menu
Para el comportamiento visual `<data-control-menu>`

#### Show
Muestra un <data-control-menu> con un determinado Id

**Parameters** (Parámetros)
```
string:     <data-control-menu> Id
```

*Ejemplo*
``` javascript
Lungo.Element.menu.show("options")
```


#### Hide
Esconde el <data-control-menu> con un Id específico

**Parameters** (Parámetros)

```
string:     <data-control-menu> Id
```

*Ejemplo*
``` javascript
Lungo.Element.menu.hide("options")
```

#### Toggle
Muestra o esconde el <data-control-menu> con id específico

**Parameters** (Parámetros)
```
string:     <data-control-menu> Id
```

*Ejemplo* 
``` javascript
Lungo.Element.menu.toggle("options")
```


.Notification
-------------
Para mostrar notificaciones mucha gente utiliza el alert() de JavaScript. Pero así cada notificación depende del navegador donde se visualize. Lungo tiene su propio sistema de notificaciones para que se vean igual en todos los navegadores y además de manera responsive.

#### show()

**Parameters** (Parámetros)
```
string:     The icon, null for no icon.
string:     Notification's title.
number:     Seconds to show the notification, 0 for unlimited.
function:   A function to execute when hiding the notification.
```
Si llamas a la función show() sin parametros simplemente se mostrará una animación de carga.

*Ejemplo*
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
Oculta la notificación que se esté mostrando en ese momento.
*Ejemplo*
``` javascript
Lungo.Notification.hide();
```


#### success()
Muestra una notificación para indicar al usuario que la operación en cuestión se realizó con éxito.

**Parameters** (Parámetros)
```
string:     Notification's title.
string:     Notification's description.
string:     The icon, null for no icon.
number:     The time to show the notification, 0 for unlimited.
function:   A function to execute when hiding the notification.
```

*Ejemplo*
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
Muestra una notificación de error.

**Parameters** (Parámetros)
```
string:     Notification's title.
string:     Notification's description.
string:     The icon, null for no icon.
number:     The time to show the notification, 0 for unlimited.
function:   A function to execute when hiding the notification.
```

*Ejemplo*
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
Muestra una notificación para que el usuario confirme alguna acción.

**Parameters** (Parámetros)
```
object:     An object with the notification's config.
```

*Ejemplo*
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
Crea una notificación utilizando tu propio código html.

**Parameters** (Parámetros)
```
string:     The html code for the notification.
string:     The closing button text.
string:     Specific style for notification
number:     The time to show the notification, 0 for unlimited.
```

*Ejemplo*
``` javascript
Lungo.Notification.html('<h1>Hello World</h1>', "Close");
```


#### push()
Muestra una notificación no obstruccione la interfaz.

**Parameters** (Parámetros)
```
string:		Notification's title.
string:		The icon, null for no icon.
string:		Specific style for notification
```

*Ejemplo*
``` javascript
Lungo.Notification.html('<h1>Hello World</h1>', "Close");
```



.Router
-------
Lungo.Router otorga al usuario las funciones necesarias para manejar la navegación de la aplicación mediante JavaScript. Las siguientes funciones permiten a los desarrolladores trabajar con la navegación entre secciones, artículos y asides.

#### section()
Esta función navega desde una sección a otra. Se utiliza para navegar hacia delante entre secciones. Si quieres navegar hacia detrás podras utilizar la función back que se explica mas adelante.

**Parameters** (Parámetros)
```
string:     The section's id.
```

*Ejemplo*
``` javascript
Lungo.Router.section("features");
```

#### article()
Muestra un `<article>` de una `<section>` en particular.

**Parameters** (Parámetros)
```json
string:		The section id
string:     The article's id.
```

*Ejemplo*
```javascript
Lungo.Router.article("my-section", "my-article");
```

#### back()
Si quieres navegar hacia atrás tan solo utiliza la función Lungo.Router.back.

*Ejemplo*
``` javascript
Lungo.Router.back();
```

. aside 
-------
El elemento `<aside>`  se comporta diferente dependiendo de si está en un artículo o en una sección. Por ello Lungo tiene métodos específicos para estos casos:

#### show()
Muestra un elemento aside.

**Parameters** (Parámetros)
```
string:		<aside> id
```

*Ejemplo*
``` javascript
Lungo.Aside.show("my-aside");
```

#### hide()
Oculta el elemento aside actual.
*Example*
``` javascript
Lungo.Aside.hide();
```

####  toggle()
Muestra o oculta el elemento aside actual.

**Parameters** (Parámetros)
```
string:		<aside> id
```

*Ejemplo*
``` javascript
Lungo.Aside.toggle("my-aside")
```

.Article
--------
Desde la versión 2.2 (Brownie) Lungo tiene un namespace reservado para e control
del elemento `<article>`.

####  clean()
Limpia el contenido de un artículo específico.

**Parameters** (Parámetros)
```
string:		<article> ID
string:		Icon
string:		Title
string:		Description [OPTIONAL]
string:		Button label [OPTIONAL]
```

*Ejemplo*
``` javascript
Lungo.Article.clean("my-article", "user", "Title", "Description", "Refresh")
```

.Service
--------
Lungo tambien puede realizar peticiones ajax a servicios web.


#### Settings
Objeto que contiene la configuración para realizar llamadas ajax.

*Ejemplo*
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
Carga los datos de un server utilizando la llamada GET de HTTP.

**Parameters** (Parámetros)
```
string:     The URL to which the request is sent.
object:     A map or string to to the server.
function:   [OPTIONAL] Callback function. (Asynchronous)
string:     [OPTIONAL] Mime-Type: json, xml, html, or text.
```

*Ejemplo*
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
Envia los datos a un server utilizando la llamada POST de HTTP.

**Parameters** (Parámetros)
```
string:     The URL to which the request is sent.
object:     A map or string to send to the server.
function:   [OPTIONAL] Callback function. (Asynchronous)
string:     [OPTIONAL] Mime-Type: json, xml, html, or text.
```

*Ejemplo*
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
Carga los datos de un server utilizando la llamada GET de HTTP y el mime-tyme JSON.

**Parameters** (Parámetros)
```
string:     The URL to which the request is sent.
object:     A map or string to send to the server.
function:   [OPTIONAL] Callback function. (Asynchronous)
```

*Ejemplo*
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
Sistema de auto-cache con patron fecha para peticiones GET de HTTP.

**Parameters** (Parámetros)
```
string:     The URL to which the request is sent.
object:     A map or string to send to the server.
string:     Date pattern (example: 15 minutes, 1 hour, 3 days).
function:   [OPTIONAL] Callback function. (Asynchronous)
string:     [OPTIONAL] Mime-Type: json, xml, html, or text.
```

*Ejemplo*
``` javascript
var url = "http://localhost:8080/myService";
var data = {id: 25, length: 50};
var parseResponse = function(result){
    //Do something
};

Lungo.Service.cache(url, data, "2 hours", parseResponse, "json");

//Otro ejemplo
var result = Lungo.Service.cache(
    url,
    "id=25&len=50",
    "2 hours",
    null,
    "json"
);
```
