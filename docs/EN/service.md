Lungo - *Cross-Device Framework*
================================

## 3.7 Service
Lungo can also make ajax requests to web services.


### 3.7.1 Settings
Object containing the ajax configuration.

**EXAMPLE**

```
Lungo.Service.Settings.async = true;
Lungo.Service.Settings.error = function(type, xhr){
    //Do something
};
Lungo.Service.Settings.headers["Content-Type"] = "application/json";
Lungo.Service.Settings.crossDomain = false;
Lungo.Service.Settings.timeout = 10;
```


### 3.7.2 get()
Load data from the server using a HTTP GET request. 

**PARAMETERS**

```
string:		The URL to which the request is sent.
object:		A map or string to to the server.
function:	[OPTIONAL] Callback function. (Asynchronous)
string:		[OPTIONAL] Mime-Type: json, xml, html, or text.
```

**EXAMPLE**

```
var url = "http://localhost:8080/myService";
var data = {id: 25, length: 50};
var parseResponse = function(result){
    //Do something
};

Lungo.Service.get(url, data, parseResponse, "json");

//Another example
var result = Lungo.Service.get(url, "id=25&len=50", null, "json");
```


### 3.7.3 post()
Load data from the server using a HTTP POST request. 

**PARAMETERS**

```
string:		The URL to which the request is sent.
object:		A map or string to send to the server.
function:	[OPTIONAL] Callback function. (Asynchronous)
string:		[OPTIONAL] Mime-Type: json, xml, html, or text.
```

**EXAMPLE**

```
var url = "http://localhost:8080/myService";
var data = {id: 25, length: 50};
var parseResponse = function(result){
    //Do something
};

Lungo.Service.post(url, data, parseResponse, "json");

//Another example
var result = Lungo.Service.post(url, "id=25&len=50", null, "json");
```


### 3.7.4 json()
Load data from the server using a HTTP GET request and mime-type JSON. 

**PARAMETERS**

```
string:		The URL to which the request is sent.
object:		A map or string to send to the server.
function:	[OPTIONAL] Callback function. (Asynchronous)
```

**EXAMPLE**

```
var url = "http://localhost:8080/myService";
var data = {id: 25, length: 50};
var parseResponse = function(result){
    //Do something
};

Lungo.Service.json(url, data, parseResponse);

//Another example
var result = Lungo.Service.json(url, "id=25&len=50");
```


### 3.7.5 cache()
Auto-caching system with date pattern for HTTP GET requests. 

**PARAMETERS**

```
string:		The URL to which the request is sent.
object:		A map or string to send to the server.
string:		Date pattern (example: 15 minutes, 1 hour, 3 days).
function:	[OPTIONAL] Callback function. (Asynchronous)
string:		[OPTIONAL] Mime-Type: json, xml, html, or text.
```

**EXAMPLE**

```
var url = "http://localhost:8080/myService";
var data = {id: 25, length: 50};
var parseResponse = function(result){
    //Do something
};

Lungo.Service.cache(url, data, "2 hours", parseResponse, "json");

//Another example
var result = Lungo.Service.cache(
    url,
    "id=25&len=50",
    "2 hours",
    null,
    "json"
);
```