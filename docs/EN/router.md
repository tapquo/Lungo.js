Lungo - *Cross-Device Framework*
================================

## 3.6 Notification
Lungo.Router provides the user with the neccesary functions to manage the navigation through javascript. The following functions allow developers to work with the navigation through sections, articles and also asides.


### 3.6.1 section()
This function allows the navigation from a section to another one. It is done to navigate forward to a section, if you want to go back to a previous one you have to use the back function which will be explained later. 

**PARAMETERS**

```
string:		The section's id.
```

**EXAMPLE**

```
Lungo.Router.section("features");
```


### 3.6.2 hide()
This function allows the navigation from an article to another one.

**PARAMETERS**

```
string:		The article's id.
```

**EXAMPLE**

```
Lungo.Router.article("list","list-indented");
```


### 3.6.3 aside()
Toggles the aside in a particular section. 

**PARAMETERS**

```
string:		The section's id.
string:		The aside's id.
```

**EXAMPLE**

```
Lungo.Router.aside('main', left_menu);
```


### 3.6.4 back()
Lungo uses the bread crumb pattern, so to return to a previous section you have to use the Lungo.Router.back function.

**EXAMPLE**

```
Lungo.Router.back();
```