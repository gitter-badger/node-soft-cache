(function() {


    function SoftCache() {

        var cache = {},
            keys = [],
            CAPACITY = 1000;
            TIMEOUT = 3600000;


        function removeFromCache( key ) {
            return function() {
                cache[key] = undefined;
            }
        }

        this.put = function( key, value ) {
            var currentTimeMillis = new Date().getTime();

            keys.push( key );

            cache[key] = { 
                added : currentTimeMillis,
                value : value
            };

            setTimeout( removeFromCache(key), timeout );

            if ( keys.length > CAPACITY ) {
                removeOldestPair();
            }
        };

        this.get = function( key ) {
            var value = cache[key];

            if ( value ) {
                return value.value;
            }
        }
    }

    module.exports = SoftCache;
}());