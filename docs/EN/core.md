Lungo - *Cross-Device Framework*
================================

## 3.1 Core
Lungo has several functions that are used inside its engine. Here you have them if you need to include some of their funcitonality in your application.

### 3.1.1 log()
Console system to display messages when you are in debug mode.
##### Parameters
```json
number: 	Severity based in (1)Log, (2)Warn, (>2)Error
string: 	Message to show in the console
```
##### Example
```
Lungo.Core.log(1, "Launched event");
Lungo.Core.log(2, "Warning!!");
Lungo.Core.log(3, "Error!!!!");
```


### 3.1.2 execute()
Executes callbacks based on the parameters received. 
##### Parameters
```json
function:	callback to execute
```
##### Example
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
##### Parameters
```json
object:		object that 'this' can refer in the new function.
function:	A function object.
```
##### Return
```
Return:		The function which will do the action on the object.
```
##### Example
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
