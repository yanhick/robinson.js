
var expect = require('chai').expect;
var Specificity = require('../../lib/css/specificity');

describe('specificity', function () {
    it('should instantiate a selector specificity', function () {
        expect(new Specificity(1, 2, 3)).to.eql({
            a: 1,
            b: 2,
            c: 3
        });
    });
});

