Lungo - *Cross-Device Framework*
================================

## 3.1 Core
Lungo has several methods that are used inside its engine. Here you have them if you need to include some of their functionality in your application.


### 3.1.1 log()
Console system to display messages when you are in debug mode.

**PARAMETERS**

```
number: 	Severity based in (1)Log, (2)Warn, (>2)Error
string: 	Message to show in the console
```

**EXAMPLE**

```
Lungo.Core.log(1, "Launched event");
Lungo.Core.log(2, "Warning!!");
Lungo.Core.log(3, "Error!!!!");
```


### 3.1.2 execute()
Executes callbacks based on the parameters received. 

**PARAMETERS**

```
function:	callback to execute
```

**EXAMPLE**

```
var myFunc = function(){
    //Do something
};
var myFunc2 = function(){
    //Do something
};
Lungo.Core.execute(myFunc, myFunc2);
```


### 3.1.3 bind()
Creates a new function that, when called, itself calls this function in the context of the provided this value, with a given sequence of arguments preceding any provided when the new function was called. 

**PARAMETERS**

```
object:		object that 'this' can refer in the new function.
function:	A function object.
```
This method **return** the function which will do the action on the object.

**EXAMPLE**

```
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


### 3.1.4 mix()
Copy from any number of objects and mix them all into a new object. The implementation is simple; just loop through arguments and copy every property of every object passed to the function. 

**PARAMETERS**

```
object:	 	arguments to mix them all into a new object.
object: 	arguments to mix them all into a new object.
```
This method **return** an object with the mix done.

**EXAMPLE**

```
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


### 3.1.5 isOwnProperty()
Every object descended from Object inherits the hasOwnProperty method. This method can be used to determine whether an object has the specified property as a direct property of that object. 

**PARAMETERS**

```
object: 	object to test for a property's existence inside itself.
string:		property the name of the property to test.
```
This method **return** boolean indicating if property exists.

**EXAMPLE**

```
var car = {wheels:4,doors:true};
Lungo.Core.isOwnProperty(car,"wheels");	//Result: true
Lungo.Core.isOwnProperty(car,"wings");		//Result: false
```


### 3.1.6 toType()
Determine the internal JavaScript [[Class]] of an object. 

**PARAMETERS**

```
object:		object to get the real type of itself.
```
This method **return** a string with the internal JavaScript [[Class]]

**EXAMPLE**

```
var name = "Lungo";
Lungo.Core.toType(name);	//Result: "string"
```


### 3.1.7 toArray()
Convert an array-like object into a true JavaScript array. 

**PARAMETERS**

```
object:		Any object to turn into a native Array.
```
This method **return** the object in a plain array.

**EXAMPLE**

```
var execute = function() {
	var args = lng.Core.toArray(arguments);
}
```


### 3.1.8 isMobile()
Determine if the current environment is a mobile environment. This method **return** An object with the mix done.

**EXAMPLE**

```
Lungo.Core.isMobile();
```


### 3.1.9 environment()
**Returns** information of execute environment.

**EXAMPLE**

```
Lungo.Core.environment();
```


### 3.1.10 orderByProperty()
Copy from any number of objects and mix them all into a new object. The implementation is simple; just loop through arguments and copy every property of every object passed to the function. 

**PARAMETERS**

```
list:		List of objects.
string:		Name of the property.
string: 	Type of order: asc or desc.
```
This method **return** an ordered list of objects by a property.

**EXAMPLE**

```
var list = [
    {name: 'Lungo', twitter: 'lungojs'},
    {name: 'Quojs', twitter: 'quojs'},
];

var ordered_list = lng.Core.orderByProperty(list, 'name', 'asc');
```


### 3.1.11 parseUrl()

**PARAMETERS**

```
string:		Url string.
```
This method **return**  a correct URL using hashtag character.

**EXAMPLE**

```
var url = Lungo.Core.parseUrl("http://tapquo.com/#folks");
//Result: "#folks"
```


### 3.1.12 findByProperty()
Copy from any number of objects and mix them all into a new object. The implementation is simple; just loop through arguments and copy every property of every object passed to the function. 

**PARAMETERS**

```
list:		The list with objects.
string:		Name of the property.
```
This method **return** An instance of the object found, null if not found.

**EXAMPLE**

```
var list = [
    {name: 'Lungo', twitter: 'lungojs'},
    {name: 'Quojs', twitter: 'quojs'},
];

var user = lng.Core.findByProperty(list, 'name', 'Lungo');
```
```