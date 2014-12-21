
var expect = require('chai').expect;

var ElementNode = require('../../lib/dom/element');

describe('element', function () {
    it('should create a new element node', function () {
        var elementNode = new ElementNode('div',
                                          {foo: 'bar'},
                                         []);

        expect(elementNode.children).to.eql([]);
        expect(elementNode.attributes).to.eql({foo: 'bar'});
        expect(elementNode.nodeType).to.eql(1);
        expect(elementNode.tagName).to.eql('div');
    });

        });
    });
});
