
var expect = require('chai').expect;

var Stylesheet = require('../../lib/css/stylesheet');
var Rule = require('../../lib/css/rule');
var Selector = require('../../lib/css/selector');
var SimpleSelector = require('../../lib/css/simple-selector');
var Declaration = require('../../lib/css/declaration');

describe('stylesheet', function () {
    it('should initialize a stylesheet with rules', function () {
        var simpleSelector = new SimpleSelector('div', 'my-id', ['my-class']);
        var selectors = [new Selector().SimpleSelector(simpleSelector)];
        var declarations = [new Declaration('foo', 'bar')];
        var rule = new Rule(selectors, declarations);
        var stylesheet = new Stylesheet([rule]);

        expect(stylesheet.rules[0].selectors[0].type).to.eql('simple');
        expect(stylesheet.rules[0].selectors[0].value).to.eql({
            tagName: 'div',
            id: 'my-id',
            className: ['my-class']
        });

        expect(stylesheet.rules[0].declarations).to.eql([{
            name: 'foo',
            value: 'bar'
        }]);
    });
});
