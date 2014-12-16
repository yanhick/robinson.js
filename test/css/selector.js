
var expect = require('chai').expect;

var Selector = require('../../lib/css/selector');
var SimpleSelector = require('../../lib/css/simple-selector');

describe('selector', function () {
    it('should allow creating simple selectors', function () {

        var simpleSelector = new SimpleSelector('div', 'my-id', ['my-class']);
        var selector = new Selector.SimpleSelector(simpleSelector);

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
