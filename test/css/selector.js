
var expect = require('chai').expect;

var Selector = require('../../lib/css/selector');
var SimpleSelector = require('../../lib/css/simple-selector');

describe('selector', function () {
    it('should allow creating simple selectors', function () {

        var simpleSelector = new SimpleSelector('div', 'my-id', ['my-class']);
        var selector = new Selector().SimpleSelector(simpleSelector);

        expect(selector.type).to.eql('simple');
        expect(selector.value).to.eql({
            tagName: 'div',
            id: 'my-id',
            className: ['my-class']
        });
    });

    it('should allow retrieving the specificity of the selector', function () {
        var simpleSelector = new SimpleSelector('div', 'my-id', ['my-class']);
        var selector = new Selector().SimpleSelector(simpleSelector);

        expect(selector.specificity()).to.eql({
            a: 1,
            b: 1,
            c: 1
        });
    });
});
