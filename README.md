node-soft-cache
===============

This library is an utility for caching in node.js. It emerged from the need of having somehting more than just `var cache = {}` in JavaScript. This cache behaves as a key value pair, allowing to set an expire timeout in the key/values that are put into the cache.

## API

The caching constructor accepts two optional arguments:
- The size of the cache, representing how many elements are allowed in it. Default value is `1000` slots.
- The timeout value in milliseconds that will be used to expire the cache. Default value is `3600000` milliseconds (one hour).


### Setting up a new cache

To construct the caching you just need to instantiate a `new SoftCache()`.

```
var SoftCache = require("soft-cache"),
    softCache = new SoftCache(), // no arguments === default values
```


### Puting objects into the cache.

To insert objects you have the `.put(key, value)` function. This function receives an optional parameter if you want to force a different timeout in milliseconds `.put(key, value, timeout)`.

```
var someObject = { foo:bar, 1:2 },

cache.put( "key1", someObject );

var someArray = [ 1, 2, 3 ];
cache.put( "key2", someArray );

cache.put( "key3", anotherObject, 10000 );

```


### Getting objects from the cache

To get an objet you just need to call `.get( "someKey" )`. If the item exists it will return itself.

```
var objectFromCache = cache.get( "key1" );
```


### Removing an object from cache

To remove an object from cache you have available `.remove( "someKey" )`. This will remove the key value pair from the cache.
```
cache.remove( "key1" );
```

### Remove all objects from caching

If you need to clear the cache and reset it to an empty state, thus releasing all cached values you can use the `.clear()`.
```
cache.clear();
```

