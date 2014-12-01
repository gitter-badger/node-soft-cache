(function() {
    "use strict";

    require('chai').should();

    let SoftCache = require("../src/soft-cache.js");

    describe('soft cache', function() {

        let cache;

        beforeEach(function() {
            cache = new SoftCache(1);
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

            describe('and adding another element', function() {
                const KEY2 = "FOO2",
                    VALUE2 = "BAR2";

                beforeEach(function() {
                    cache.put(KEY2, VALUE2);
                });

                it('should expire the first element cached', function() {
                    'undefined'.should.equal(typeof(cache.get(KEY)));
                });

                it('should have length 1', function() {
                    cache.length.should.equal(1);
                });
            });
        });

    });
}());