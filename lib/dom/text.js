var DOMNode = require('./node');

module.exports = function (data) {
    var textNode = new DOMNode([]);

    textNode.text = data;
    textNode.nodeType = 3;

    return textNode;
};
