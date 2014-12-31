var DOMNode = require('./node');

module.exports = function (name, attrs, children) {
    var elementNode = new DOMNode(children),

        id = function () {
            return attrs.id ? attrs.id : null;
        },

        classes = function () {
            return attrs['class'] ? attrs['class'].split(' ') : [];
        };

    elementNode.tagName = name;
    elementNode.attributes = attrs;
    elementNode.nodeType = 1;
    elementNode.id = id;
    elementNode.classes = classes;

    return elementNode;
};
