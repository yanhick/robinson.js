
var expect = require('chai').expect;

var ElementNode = require('../../lib/dom/element');

describe('element', function () {
    it('should create a new element node', function () {
        var elementNode = new ElementNode('div',
                                          {foo: 'bar'},
                                         []);
        expect(elementNode).to.eql({
            children: [],
            attributes: {foo: 'bar'},
            nodeType: 1,
            tagName: 'div'
        });
    });
});
