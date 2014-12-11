
var expect = require('chai').expect;

var DOMNode = require('../../lib/dom/node');

describe('node', function () {
    it('should create a new dom node', function () {
        var node = new DOMNode([]);
        expect(node).to.eql({
            children: []
        });
    });
});
