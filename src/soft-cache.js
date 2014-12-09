(function() {


    function SoftCache( _capacity, _timeout ) {

        var that = this;
            cache = {},
            keys = [],
            capacity = _capacity || 1000;
            timeout = _timeout || 3600000;

        function clear() {
            cache = {};
            keys = [];
            that.length = 0;
        }

        function getRemoveFromCacheFn( key ) {
            return function() {
                var i;

                clearTimeout( cache[key].timeoutId );

                delete cache[key];
                for(i = 0; i < keys.length; i++) {
                    if ( keys[i] === key ) {
                        keys.splice(i,1);
                        break;
                    }
                }
                that.length = keys.length;
            };
        }

        function removeOldestPair() {
            var key = keys.shift();
            getRemoveFromCacheFn(key)();
        }

        this.put = function( key, value, localTimeout ) {
            var currentTimeMillis = new Date().getTime(),
                timeoutId;

            if ( !cache[key] ) {
                keys.push( key );
            } else { // if the key already exists, clear previous timeout
                clearTimeout( cache[key].timeoutId );
            }

            that.length = keys.length;

            cache[key] = {
                added : currentTimeMillis,
                value : value
            };

            cache[key].timeoutId = setTimeout( getRemoveFromCacheFn(key), localTimeout || timeout );

            if ( keys.length > capacity ) {
                removeOldestPair();
            }
        };

        this.remove = function( key ) {
            getRemoveFromCacheFn(key)();
        };

        this.get = function( key ) {
            var value = cache[key];

            if ( value ) {
                return value.value;
            }
        };

        this.clear = function() {
            clear();
        };

        clear();
    }

    module.exports = SoftCache;
}());