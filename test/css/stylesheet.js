
var expect = require('chai').expect;

var Stylesheet = require('../../lib/css/stylesheet');
var Rule = require('../../lib/css/rule');
var Selector = require('../../lib/css/selector');
var SimpleSelector = require('../../lib/css/simple-selector');
var Declaration = require('../../lib/css/declaration');

describe('stylesheet', function () {
    it('should initialize a stylesheet with rules', function () {
        var simpleSelector = new SimpleSelector('div', 'my-id', ['my-class']);
        var selectors = [Selector.SimpleSelector(simpleSelector)];
        var declarations = [new Declaration('foo', 'bar')];
        var rule = new Rule(selectors, declarations);
        var stylesheet = new Stylesheet([rule]);

        expect(stylesheet).to.eql({
            rules: [{
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
            }]
        });
    });
});
