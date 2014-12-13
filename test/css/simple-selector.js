
var expect = require('chai').expect;

var SimpleSelector = require('../../lib/css/simple-selector');

describe('simple selector', function () {
    it('should be initialised with the selector values', function () {
        expect(new SimpleSelector('div', 'my-id', ['my-class'])).to.eql({
            tagName: 'div',
            id: 'my-id',
            className: ['my-class']
        });
    });
});
