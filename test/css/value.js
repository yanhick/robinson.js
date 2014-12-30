
var expect = require('chai').expect;

var Value = require('../../lib/css/value');
var Unit = require('../../lib/css/unit');
var Color = require('../../lib/css/color');

describe('value', function () {
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
