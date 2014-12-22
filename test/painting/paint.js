
var expect = require('chai').expect;
var HTMLParser = require('../../lib/html/parser');
var CSSParser = require('../../lib/css/parser');
var styleTree = require('../../lib/style/style-tree');
var layoutTree = require('../../lib/layout/layout-tree');
var Dimensions = require('../../lib/layout/dimensions');
var Rect = require('../../lib/layout/rect');
var EdgeSize = require('../../lib/layout/edge-size');
var paint = require('../../lib/painting/paint');

describe('paint', function () {
    it('should paint the layout tree onto a canvas', function () {

        var rootElement = new HTMLParser().parse('<html><body></body></html>');
        var stylesheet = new CSSParser().parse('{display: block;} body {background: #FF0000; width: 1px; height: 1px;}');
        var styledTree = styleTree(rootElement, stylesheet);

        laidoutTree = layoutTree(styledTree, new Dimensions(
            new Rect(0, 0, 1, 1),
            new EdgeSize(0, 0, 0, 0),
            new EdgeSize(0, 0, 0, 0),
            new EdgeSize(0, 0, 0, 0)
        ));

        var bounds = new Rect(0, 0, 1, 1);
        var canvas = paint(laidoutTree, bounds);

        expect(canvas.pixels).to.eql([{
            r: 255,
            g: 0,
            b: 0,
            a: 255
        }]);
    });

    it('should paint layout tree with borders onto a canvas', function () {

        var rootElement = new HTMLParser().parse('<html><body></body></html>');
        var stylesheet = new CSSParser().parse('{display: block;} body {border-color: #FF0000; border-left-width: 1px; width: 1px; height: 2px;}');
        var styledTree = styleTree(rootElement, stylesheet);

        laidoutTree = layoutTree(styledTree, new Dimensions(
            new Rect(0, 0, 2, 2),
            new EdgeSize(0, 0, 0, 0),
            new EdgeSize(0, 0, 0, 0),
            new EdgeSize(0, 0, 0, 0)
        ));

        var bounds = new Rect(0, 0, 2, 2);
        var canvas = paint(laidoutTree, bounds);

        expect(canvas.pixels).to.eql([{
            r: 255,
            g: 0,
            b: 0,
            a: 255
        }, {
            r: 255,
            g: 255,
            b: 255,
            a: 255
        }, {
            r: 255,
            g: 0,
            b: 0,
            a: 255
        }, {
            r: 255,
            g: 255,
            b: 255,
            a: 255
        }]);
    });
});
