Lungo - *Cross-Device Framework*
================================

## 3.2.1 Cache
Lungo implements its own cache type. This cache will store the value until the wepapp is closed


### 3.2.1.1 set()
Sets in the LungoJS cache system a new key/value pair. 

**PARAMETERS**

```
string:		Key for the new value.
string:		[OPTIONAL] Subkey in LungoJS Cache System.
object:		Value asigned to the key.
```

**EXAMPLE**

```
var framework = {name: "Lungo", twitter: "lungojs"};
Lungo.Data.Cache.set("lungoFramework", framework);
```


### 3.2.1.2 get()
Returns the cached value of a given key. 

**PARAMETERS**

```
strin:		Key in LungoJS Cache System.
string:		[OPTIONAL] Subkey in LungoJS Cache System.
```
This method **return** an object containing the value.

**EXAMPLE**

```
var cachedFramework = Lungo.Data.Cache.get("lungoFramework");
//Result: {name: "Lungo", twitter: "lungojs"}
```


### 3.2.1.3 remove()
Removes the instance of a given key in LungoJs Cache System. 

**PARAMETERS**

```
string:		Key in LungoJS Cache System.
string:		[OPTIONAL] Subkey in LungoJS Cache System.
```

**EXAMPLE**

```
Lungo.Data.Cache.remove("lungoFramework");
```


### 3.2.1.4 exists()
Checks if the given key is stored in the cache.

**PARAMETERS**

```
string Key in LungoJS Cache System.
```
This method **return** a boolean value which is true if the key is found

**EXAMPLE**

```
Lungo.Data.Cache.exists("lungoFramework");
```