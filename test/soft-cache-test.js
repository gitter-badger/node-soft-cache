(function() {
    "use strict";

    require('chai').should();

    let SoftCache = require("../src/soft-cache.js");

    describe('soft cache', function() {
        const TIMEOUT = 1000;
        let cache;

        beforeEach(function() {
            cache = new SoftCache(1, TIMEOUT);
        });

        describe('after adding an element', function() {
            const KEY = "FOO",
                VALUE = "BAR";

            beforeEach(function() {
                cache.put(KEY, VALUE);
            });

            it('should be retrievable', function() {
                cache.get(KEY).should.equal(VALUE);
            });

            it('should have length 1', function() {
                cache.length.should.equal(1);
            });

            it('should expire after 1000ms', function( done ) {
                setTimeout(function() {
                    (typeof(cache.get(KEY))).should.equal('undefined');
                    done();
                }, TIMEOUT + 1000);
            });

            it('should be able to clear the cache', function() {
                cache.clear();
                cache.length.should.equal(0);
            });

            describe('removing the element', function() {

                beforeEach( function() {
                    cache.remove( KEY );
                });

                it('should disapear from cache', function() {
                    cache.length.should.equal(0);
                });

                it('should invalidate the timeout', function( done ) {
                    cache.put(KEY, VALUE, 100000);
                    setTimeout( function() {
                        cache.get(KEY).should.be.ok;
                        done();
                    }, TIMEOUT + 1000);
                });
            });


            describe('and adding another element', function() {
                const KEY2 = "FOO2",
                    VALUE2 = "BAR2";

                beforeEach(function() {
                    cache.put(KEY2, VALUE2);
                });

                it('should expire the first element cached', function() {
                    (typeof(cache.get(KEY))).should.equal('undefined');
                });

                it('should have length 1', function() {
                    cache.length.should.equal(1);
                });
            });
        });

    });
}());