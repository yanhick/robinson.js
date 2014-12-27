
var expect = require('chai').expect;
var HTMLParser = require('../../lib/html/parser');
var CSSParser = require('../../lib/css/parser');
var styleTree = require('../../lib/style/style-tree');

describe('style tree', function () {
    it('should style a dom node', function () {
        var rootElement = new HTMLParser().parse('<html class="my-class"></html>');
        var stylesheet = new CSSParser().parse('html {foo: bar;} .my-class {bar: foo;} .my-other-class {bar: baz;}');
        var styledTree = styleTree(rootElement, stylesheet);

        expect(styledTree.node.children).to.eql([]);
        expect(styledTree.node.attributes).to.eql({'class' : 'my-class'});
        expect(styledTree.node.nodeType).to.eql(1);
        expect(styledTree.node.tagName).to.eql('html');

        expect(styledTree.specifiedValues.foo.type).to.eql('keyword');
        expect(styledTree.specifiedValues.foo.value).to.eql('bar');

        expect(styledTree.specifiedValues.bar.type).to.eql('keyword');
        expect(styledTree.specifiedValues.bar.value).to.eql('foo');
    });

    it('should ignore node not matching a selector', function () {
        var rootElement = new HTMLParser().parse('<html></html>');
        var stylesheet = new CSSParser().parse('.not-matched {foo: bar;}');
        var styledTree = styleTree(rootElement, stylesheet);

        expect(styledTree.specifiedValues.foo).to.not.exists;
    });

    it('should style a dom tree');
    it('should match dom nodes with css rules');
    it('should take care of property specificity');
});
