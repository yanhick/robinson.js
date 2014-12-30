
var expect = require('chai').expect;
var Dimensions = require('../../lib/layout/dimensions');
var Rect = require('../../lib/layout/rect');
var EdgeSize = require('../../lib/layout/edge-size');

describe('dimensions', function () {
    describe('#paddingBox', function () {
        it('should return the content area + padding box', function () {
            var rect = new Rect(0, 0, 0, 0);
            var edge = new EdgeSize(10, 10, 10, 10);
            var dimensions = new Dimensions(rect, edge, edge, edge);

            var paddingBoxRect = dimensions.paddingBox();

            expect(paddingBoxRect.x).to.eql(-10);
            expect(paddingBoxRect.y).to.eql(-10);
            expect(paddingBoxRect.width).to.eql(20);
            expect(paddingBoxRect.height).to.eql(20);
        });
    });

    describe('#borderBox', function () {
        it('should return the content area + padding and border box', function () {
            var rect = new Rect(0, 0, 0, 0);
            var edge = new EdgeSize(10, 10, 10, 10);
            var dimensions = new Dimensions(rect, edge, edge, edge);

            var borderBoxRect = dimensions.borderBox();

            expect(borderBoxRect.x).to.eql(-20);
            expect(borderBoxRect.y).to.eql(-20);
            expect(borderBoxRect.width).to.eql(40);
            expect(borderBoxRect.height).to.eql(40);
        });
    });

    describe('#marginBox', function () {
        it('should return the content area + padding, border and margin box', function () {
            var rect = new Rect(0, 0, 0, 0);
            var edge = new EdgeSize(10, 10, 10, 10);
            var dimensions = new Dimensions(rect, edge, edge, edge);

            var marginBoxRect = dimensions.marginBox();

            expect(marginBoxRect.x).to.eql(-30);
            expect(marginBoxRect.y).to.eql(-30);
            expect(marginBoxRect.width).to.eql(60);
            expect(marginBoxRect.height).to.eql(60);
        });
    });
});
