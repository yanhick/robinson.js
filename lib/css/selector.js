var SimpleSelector = require('./simple-selector');

module.exports = {
    SimpleSelector: function (tagName, id, className) {
        return {
            type: 'simple',
            value: new SimpleSelector(tagName, id, className)
        };
    }
};
