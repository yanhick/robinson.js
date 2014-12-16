var SimpleSelector = require('./simple-selector');

module.exports = {
    SimpleSelector: function (simpleSelector) {
        return {
            type: 'simple',
            value: simpleSelector
        };
    }
};
