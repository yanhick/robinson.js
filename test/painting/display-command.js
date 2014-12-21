
var expect = require('chai').expect;
var DisplayCommand = require('../../lib/painting/display-command');
var Rect = require('../../lib/layout/rect');
var Color = require('../../lib/css/color');

describe('display-command', function () {
    it('should create a display command', function () {

        var displayCommand = DisplayCommand.SolidColor(
            new Color(0, 123, 255, 50),
            new Rect(0, 0, 100, 100)
        );

        expect(displayCommand.type).eql('solid-color');
        expect(displayCommand.value.color).eql({
            r: 0,
            g: 123,
            b: 255,
            a: 50
        });

        expect(displayCommand.value.rect.x).eql(0);
        expect(displayCommand.value.rect.y).eql(0);
        expect(displayCommand.value.rect.width).eql(100);
        expect(displayCommand.value.rect.height).eql(100);
    });
});
