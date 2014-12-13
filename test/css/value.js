
var expect = require('chai').expect;

var Value = require('../../lib/css/value');
var Unit = require('../../lib/css/unit');
var Color = require('../../lib/css/color');

describe('value', function () {

    it('should allow creating keyword value', function () {
        var keyword = new Value().Keyword('auto');

        expect(keyword).to.have.property('type', 'keyword');
        expect(keyword).to.have.property('value', 'auto');
        expect(keyword).to.have.property('toPx');
    });

    it('should allow creating length value', function () {
        var length = new Value().Length(1.2, Unit.Px());

        expect(length).to.have.property('type', 'length');
        expect(length.value).to.eql({
            unit: {
                type: 'px'
            },
            value: 1.2
        });
        expect(length).to.have.property('toPx');
    });

    it('should allow creating color value', function () {
        var color = new Value().ColorValue(new Color(0, 127, 255, 0.2));
        expect(color).to.have.property('type', 'color');
        expect(color.value).to.eql({
            r: 0,
            g: 127,
            b: 255,
            a: 0.2
        });
        expect(color).to.have.property('toPx');
    });

    describe('#toPx', function () {

        it('should return the size of a length in px', function () {
            var length = new Value().Length(1.0, Unit.Px());

            expect(length.toPx()).to.eql(1.0);
        });

        it('should return 0 for none length value', function () {
            var keyword = new Value().Keyword('auto');

            expect(keyword.toPx()).to.eql(0);
        });
    });
});
