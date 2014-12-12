var expect = require('chai').expect;

var HTMLParser = require('../../lib/html/parser');

describe('html parser', function () {
    it('should parse <html> tags', function () {
        var nodes = HTMLParser().parse('<html></html>');
        expect(nodes).to.eql({
            children: [],
            nodeName: 'html',
            attributes: [],
            nodeType: 1
        });
    });
    it('should parse nested tags');
    it('should parse text nodes');
    it('should parse attributes with quoted values');
});
