(function() {


    function SoftCache( _capacity ) {

        var that = this;
            cache = {},
            keys = [],
            capacity = _capacity || 1000;
            timeout = 3600000;

        that.length = 0;

        function getRemoveFromCacheFn( key ) {
            return function() {
                var i;
                cache[key] = undefined;
                for(i = 0; i < keys.length; i++) {
                    if ( keys[i] === key ) {
                        keys.splice(0,i);
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

        this.put = function( key, value ) {
            var currentTimeMillis = new Date().getTime();

            keys.push( key );

            that.length = keys.length;

            cache[key] = {
                added : currentTimeMillis,
                value : value
            };

            setTimeout( getRemoveFromCacheFn(key), timeout );

            if ( keys.length > capacity ) {
                removeOldestPair();
            }
        };

        this.get = function( key ) {
            var value = cache[key];

            if ( value ) {
                return value.value;
            }
        };
    }

    module.exports = SoftCache;
}());