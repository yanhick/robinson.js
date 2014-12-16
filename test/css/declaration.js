
var expect = require('chai').expect;

var Declaration = require('../../lib/css/declaration');

describe('declaration', function () {
    it('should be initialised with a property name and value', function () {
        expect(new Declaration('foo', 'bar')).to.eql({
            name: 'foo',
            value: 'bar'
        });
    });
});
