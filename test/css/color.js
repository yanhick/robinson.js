
var expect = require('chai').expect;

var Color = require('../../lib/css/color');

describe('color', function () {
    it('should initialize an rgba color', function () {

        var color = new Color(0, 255, 127, 0.5);

        expect(color).to.eql({
            r: 0,
            g: 255,
            b: 127,
            a: 0.5
        });
    });
});
