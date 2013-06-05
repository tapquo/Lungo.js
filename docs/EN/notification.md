Lungo - *Cross-Device Framework*
================================

## 3.5 Notification
To display notifications, many times people tend to use the javascript alert() function. The notification it shows looks different depending on the browser. Lungo has a notification system that shows pretty and responsive notifications styled in the same way in all the browsers, making your app look the same no matter the browser you use.


### 3.5.1 show()
Shows a customized notification. 

**PARAMETERS**

```
string:		The icon, null for no icon.
string:		Notification's title.
number:		The time to show the notification, 0 for unlimited.
function:		A function to execute when hiding the notification.
```
If you call to the show function without parameters it will show a loading screen

**EXAMPLE**

```
var afterNotification = function(){
    //Do something
};

Lungo.Notification.show(
    "check",                //Icon
    "Success",              //Title
    3,						//Seconds
    afterNotification       //Callback function
);

//Show loading screen
Lungo.Notification.show();
```


### 3.5.2 hide()
Hides the current notification.

**EXAMPLE**

```
Lungo.Notification.hide();
```


### 3.5.3 success()
Shows success notification. 

**PARAMETERS**

```
string:		Notification's title.
string:		Notification's description.
string:		The icon, null for no icon.
number:		The time to show the notification, 0 for unlimited.
function:	A function to execute when hiding the notification.
```

**EXAMPLE**

```
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


### 3.5.4 error()
Shows an error notification. 

**PARAMETERS**

```
string:		Notification's title.
string:		Notification's description.
string:		The icon, null for no icon.
number:		The time to show the notification, 0 for unlimited.
function:	A function to execute when hiding the notification.
```

**EXAMPLE**

```
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


### 3.5.5 confirm()
Shows a confirmation notification. 

**PARAMETERS**

```
object:		An object with the notification's config.
```

**EXAMPLE**

```
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


### 3.5.6 html()
Creates a notification using your own html code. 

**PARAMETERS**

```
string:		The html code for the notification.
boolean:	The closing button text.
```

**EXAMPLE**

```
Lungo.Notification.html('<h1>Hello World</h1>', "Close");
```