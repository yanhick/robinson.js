
var expect = require('chai').expect;

var Rule = require('../../lib/css/rule');
var Selector = require('../../lib/css/selector');
var Declaration = require('../../lib/css/declaration');

describe('rule', function () {
    it('should be initialised with the rules selectors and declarations', function () {
        var selectors = [Selector.SimpleSelector('div', 'my-id', ['my-class'])];
        var declarations = [new Declaration('foo', 'bar')];
        var rule = new Rule(selectors, declarations);

        expect(rule).to.eql({
            selectors: [{
                type: 'simple',
                value: {
                    tagName: 'div',
                    id: 'my-id',
                    className: ['my-class']
                }
            }],
            declarations: [{
                name: 'foo',
                value: 'bar'
            }]
        });
    });
});
