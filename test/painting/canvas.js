
var expect = require('chai').expect;

var Canvas = require('../../lib/painting/canvas');
var Color = require('../../lib/css/color');
var Rect = require('../../lib/layout/rect');
var DisplayCommand = require('../../lib/painting/display-command');

describe('painting', function () {
    it('should instantiate a canvas', function () {
        var canvas = new Canvas(1, 1);

        expect(canvas.width).to.eql(1);
        expect(canvas.height).to.eql(1);
        expect(canvas.pixels).to.eql([{
            r: 255,
            g: 255,
            b: 255,
            a: 255
        }]);
    });

    it('should paint a display command', function () {
        var canvas = new Canvas(1, 1);

        canvas.paintItem(DisplayCommand.SolidColor(
            new Color(0, 0, 0, 0),
            new Rect(0, 0, 1, 1)
        ));

        expect(canvas.pixels).to.eql([{
            r: 0,
            g: 0,
            b: 0,
            a: 0
        }]);
    });
});
