
var expect = require('chai').expect;
var BoxType = require('../../lib/layout/box-type');

describe('box type', function () {
    it('should allow for creating block node', function () {
        expect(BoxType.Block('foo')).to.eql({
            type: 'block',
            value: 'foo'
        });
    });

    it('should allow for creating inline node', function () {
        expect(BoxType.Inline('foo')).to.eql({
            type: 'inline',
            value: 'foo'
        });
    });

    it('should allow for creating anonymous block', function () {
        expect(BoxType.Anonymous()).to.eql({
            type: 'anonymous'
        });
    });

});
