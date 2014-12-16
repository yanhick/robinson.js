
var expect = require('chai').expect;

var Unit = require('../../lib/css/unit');

describe('unit', function () {
    it('should allow instantiating pixel unit', function () {
        var px = Unit.Px();

        expect(px).to.eql({
            type: 'px'
        });
    });
});
