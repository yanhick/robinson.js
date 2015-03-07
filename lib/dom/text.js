var DOMNode = require('./node');

module.exports = function (data) {
    var textNode = new DOMNode([], 3);

    textNode.text = data;

    return textNode;
};
