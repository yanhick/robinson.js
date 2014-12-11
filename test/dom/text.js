
var expect = require('chai').expect;

var TextNode = require('../../lib/dom/text');

describe('text', function () {
    it('should create a new text node', function () {
        var textNode = new TextNode('data');
        expect(textNode).to.eql({
            children: [],
            text: 'data',
            nodeType: 3
        });
    });
});
