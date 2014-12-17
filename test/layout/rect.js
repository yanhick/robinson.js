
var expect = require('chai').expect;

var Rect = require('../../lib/layout/rect');
var EdgeSize = require('../../lib/layout/edge-size');

describe('rect', function () {
    it('should instantiate a rectangle', function () {
        var rect = new Rect(10, 20, 30, 40);
        expect(rect.x).to.eql(10);
        expect(rect.y).to.eql(20);
        expect(rect.width).to.eql(30);
        expect(rect.height).to.eql(40);
    });

    describe('#expandedBy', function () {
        it('should be expanded by edges', function () {
            var rect = new Rect(0, 0, 100, 100);
            var expandedRect = rect.expandedBy(new EdgeSize(10, 20, 30, 40));

            expect(expandedRect.x).to.eql(-10);
            expect(expandedRect.y).to.eql(-30);
            expect(expandedRect.width).to.eql(130);
            expect(expandedRect.height).to.eql(170);
        });
    });
});
