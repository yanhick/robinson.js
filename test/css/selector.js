
var expect = require('chai').expect;

var Selector = require('../../lib/css/selector');

describe('selector', function () {
    it('should allow creating simple selectors', function () {

        var selector = new Selector.SimpleSelector('div',
                                                   'my-id',
                                                   ['my-class']);

        expect(selector).to.eql({
            type: 'simple',
            value: {
                tagName: 'div',
                id: 'my-id',
                className: ['my-class']
            }
        });
    });
});
