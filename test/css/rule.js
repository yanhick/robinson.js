
var expect = require('chai').expect;

var Rule = require('../../lib/css/rule');
var Selector = require('../../lib/css/selector');
var SimpleSelector = require('../../lib/css/simple-selector');
var Declaration = require('../../lib/css/declaration');

describe('rule', function () {
    it('should be initialised with the rules selectors and declarations', function () {
        var simpleSelector = new SimpleSelector('div', 'my-id', ['my-class']);
        var selectors = [new Selector().SimpleSelector(simpleSelector)];
        var declarations = [new Declaration('foo', 'bar')];
        var rule = new Rule(selectors, declarations);

        expect(rule.selectors[0].type).to.eql('simple');
        expect(rule.selectors[0].value).to.eql({
            tagName: 'div',
            id: 'my-id',
            className: ['my-class']
        });

        expect(rule.declarations).to.eql([{
            name: 'foo',
            value: 'bar'
        }]);
    });
});
