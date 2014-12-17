
var expect = require('chai').expect;
var MatchedRule = require('../../lib/style/matched-rule');
var Rule = require('../../lib/css/rule');
var Selector = require('../../lib/css/selector');
var SimpleSelector = require('../../lib/css/simple-selector');
var Declaration = require('../../lib/css/declaration');
var Specificity = require('../../lib/css/specificity');

describe('matched rule', function () {
    it('should instantiate a matched rule', function () {
        var simpleSelector = new SimpleSelector('div', 'my-id', ['my-class']);
        var selectors = [new Selector().SimpleSelector(simpleSelector)];
        var declarations = [new Declaration('foo', 'bar')];
        var rule = new Rule(selectors, declarations);
        var matchedRule = new MatchedRule(new Specificity(1, 2, 3), rule);

        expect(matchedRule.specificity).to.eql({
            a: 1,
            b: 2,
            c: 3
        });

        expect(matchedRule.rule.selectors[0].type).to.eql('simple');
        expect(matchedRule.rule.selectors[0].value).to.eql({
            tagName: 'div',
            id: 'my-id',
            className: ['my-class']
        });
        expect(matchedRule.rule.declarations).to.eql([{
            name: 'foo',
            value: 'bar'
        }]);
    });
});
