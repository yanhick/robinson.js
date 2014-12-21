var SimpleSelector = require('./simple-selector');
var Specificity = require('./specificity');

module.exports = function () {

    var specificity = function (simpleSelector) {
        return new Specificity(
            simpleSelector.id ? 1 : 0,
            simpleSelector.className.length,
            simpleSelector.tagName ? 1 : 0
        );
    };

    return {
        SimpleSelector: function (simpleSelector) {
            return {
                type: 'simple',
                value: simpleSelector,
                specificity: specificity.bind(null, simpleSelector)
            };
        }
    };
};