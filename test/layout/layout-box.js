
var expect = require('chai').expect;
var BoxType = require('../../lib/layout/box-type');
var Dimensions = require('../../lib/layout/dimensions');
var Rect = require('../../lib/layout/rect');
var EdgeSize = require('../../lib/layout/edge-size');
var LayoutBox = require('../../lib/layout/layout-box');

describe('layout box', function () {
    it('should instantiate a layout box', function () {
        var boxType = BoxType.Anonymous();
        var rect = new Rect(0, 0, 0, 0);
        var edge = new EdgeSize(10, 10, 10, 10);
        var dimensions = new Dimensions(rect, edge, edge, edge);

        var layoutBox = new LayoutBox(dimensions, boxType, []);
        expect(layoutBox.dimensions).to.eql(dimensions);
        expect(layoutBox.boxType).to.eql(boxType);
        expect(layoutBox.children).to.eql([]);
    });

    describe('#getStyleNode', function () {
        it('should allow to retrieve the styled node', function () {
            var boxType = BoxType.Block('foo');
            var rect = new Rect(0, 0, 0, 0);
            var edge = new EdgeSize(10, 10, 10, 10);
            var dimensions = new Dimensions(rect, edge, edge, edge);

            var layoutBox = new LayoutBox(dimensions, boxType, []);

            expect(layoutBox.getStyleNode()).to.eql('foo');
        });
    });
});
