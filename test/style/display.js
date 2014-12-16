
var expect = require('chai').expect;

var Display = require('../../lib/style/display');

describe('display', function () {
    it('should allow instantiating each display value', function () {

        expect(Display.Inline()).to.eql({
            type: 'display',
            value: 'inline'
        });

        expect(Display.Block()).to.eql({
            type: 'display',
            value: 'block'
        });

        expect(Display.None()).to.eql({
            type: 'display',
            value: 'none'
        });
    });
});
