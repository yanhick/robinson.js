var DOMNode = require('./node');

module.exports = function (name, attrs, children) {
    var elementNode = DOMNode(children),

        id = function () {
            return attrs.id ? attrs.id : null;
        };

    elementNode.tagName = name;
    elementNode.attributes = attrs;
    elementNode.nodeType = 1;
    elementNode.id = id;

    return elementNode;
};
