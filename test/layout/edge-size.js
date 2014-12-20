
var expect = require('chai').expect;
var EdgeSize = require('../../lib/layout/edge-size');

describe('edge size', function () {
    it('should create edge size', function () {
        expect(new EdgeSize(10, 20, 30, 40)).to.eql({
            left: 10,
            right: 20,
            top: 30,
            bottom: 40
        });
    });
});
