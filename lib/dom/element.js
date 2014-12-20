var DOMNode = require('./node');

module.exports = function (name, attrs, children) {
    var elementNode = DOMNode(children);

    elementNode.tagName = name;
    elementNode.attributes = attrs;
    elementNode.nodeType = 1;

    return elementNode;
};
