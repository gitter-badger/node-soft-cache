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

        function getRemoveFromCacheFn( key, addedAt ) {
            addedAt = addedAt || cache[key].added;
            return function() {
                var i;

                if ( addedAt !== cache[key].added ) {
                    console.log("failed to remove", addedAt);
                    return;
                }
                console.log(addedAt, cache);
                cache[key] = undefined;
                for(i = 0; i < keys.length; i++) {
                    if ( keys[i] === key ) {
                        keys.splice(i,1);
                        break;
                    }
                }
                that.length = keys.length;
            }
        }

        function removeOldestPair() {
            var key = keys.shift();
            getRemoveFromCacheFn(key)();
        }

        this.put = function( key, value, localTimeout ) {
            var currentTimeMillis = new Date().getTime();

            keys.push( key );

            that.length = keys.length;

            cache[key] = {
                added : currentTimeMillis,
                value : value
            };

            setTimeout( getRemoveFromCacheFn(key), localTimeout || timeout );

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