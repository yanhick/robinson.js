var expect = require('chai').expect;

var HTMLParser = require('../../lib/html/parser');

describe('html parser', function () {
    it('should parse <html> tags', function () {
        var nodes = HTMLParser().parse('<html></html>');
        expect(nodes).to.eql({
            children: [],
            tagName: 'html',
            attributes: {},
            nodeType: 1
        });
    });
    it('should parse nested tags', function () {
        var nodes = HTMLParser().parse('<html><body></body></html>');
        expect(nodes).to.eql({
            tagName: 'html',
            attributes: {},
            nodeType: 1,
            children: [{
                tagName: 'body',
                attributes: {},
                nodeType: 1,
                children: []
            }]
        });
    });
    it('should parse text nodes', function () {
        var nodes = HTMLParser().parse('<html>hello</html>');
        expect(nodes).to.eql({
            tagName: 'html',
            attributes: {},
            nodeType: 1,
            children: [{
                text: 'hello',
                nodeType: 3,
                children: []
            }]
        });
    });
    it('should parse attributes with quoted values', function () {
        var nodes = HTMLParser().parse('<html lang="us"></html>');
        expect(nodes).to.eql({
            tagName: 'html',
            attributes: {
                lang: 'us'
            },
            nodeType: 1,
            children: []
        });
    });
});
