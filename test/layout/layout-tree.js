
var expect = require('chai').expect;
var HTMLParser = require('../../lib/html/parser');
var CSSParser = require('../../lib/css/parser');
var styleTree = require('../../lib/style/style-tree');
var layoutTree = require('../../lib/layout/layout-tree');
var Dimensions = require('../../lib/layout/dimensions');
var Rect = require('../../lib/layout/rect');
var EdgeSize = require('../../lib/layout/edge-size');

var util = require('util');
describe('layout tree', function () {
    it('should create a layout tree from a styled node', function () {

        var rootElement = new HTMLParser().parse('<html><body></body></html>');
        var stylesheet = new CSSParser().parse('{display: block;} body {width: 100px; height: 50px;}');
        var styledTree = styleTree(rootElement, stylesheet);

        laidoutTree = layoutTree(styledTree, new Dimensions(
            new Rect(0, 0, 200, 100),
            new EdgeSize(0, 0, 0, 0),
            new EdgeSize(0, 0, 0, 0),
            new EdgeSize(0, 0, 0, 0)
        ));

        expect(laidoutTree.dimensions.content.width).to.eql(200);
        expect(laidoutTree.dimensions.content.height).to.eql(50);

        expect(laidoutTree.children[0].dimensions.content.width).to.eql(100);
        expect(laidoutTree.children[0].dimensions.content.height).to.eql(50);
    });

    it('should create a layout tree from a styled node with borders', function () {
        var rootElement = new HTMLParser().parse('<html><body></body></html>');
        var stylesheet = new CSSParser().parse('{display: block;} body {width: 100px; height: 50px; border-width:10px;}');
        var styledTree = styleTree(rootElement, stylesheet);

        laidoutTree = layoutTree(styledTree, new Dimensions(
            new Rect(0, 0, 200, 100),
            new EdgeSize(0, 0, 0, 0),
            new EdgeSize(0, 0, 0, 0),
            new EdgeSize(0, 0, 0, 0)
        ));

        expect(laidoutTree.dimensions.content.width).to.eql(200);
        expect(laidoutTree.dimensions.content.height).to.eql(70);

        expect(laidoutTree.children[0].dimensions.content.x).to.eql(10);
        expect(laidoutTree.children[0].dimensions.content.y).to.eql(10);
        expect(laidoutTree.children[0].dimensions.content.width).to.eql(100);
        expect(laidoutTree.children[0].dimensions.content.height).to.eql(50);
        expect(laidoutTree.children[0].dimensions.border.top).to.eql(10);
        expect(laidoutTree.children[0].dimensions.border.bottom).to.eql(10);
        expect(laidoutTree.children[0].dimensions.border.left).to.eql(10);
        expect(laidoutTree.children[0].dimensions.border.right).to.eql(10);
    });
});
