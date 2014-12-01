(function() {
    "use strict";

    require('chai').should();

    let SoftCache = require("../src/soft-cache.js");

    describe('soft cache', function() {

        let cache;

        beforeEach(function() {
            cache = new SoftCache();
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
        });

    });
}());