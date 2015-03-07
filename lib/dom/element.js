var DOMNode = require('./node');

module.exports = function (name, attrs, children) {
    var elementNode = new DOMNode(children, 1),

        id = function () {
            return attrs.id ? attrs.id : null;
        },

        classes = function () {
            return attrs['class'] ? attrs['class'].split(' ') : [];
        };

    elementNode.tagName = name;
    elementNode.attributes = attrs;
    elementNode.id = id;
    elementNode.classes = classes;

    return elementNode;
};
