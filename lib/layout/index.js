var LayoutBox = require('./layout-box');
var BoxType = require('./box-type');

module.exports = function (styledNode, containingBlock) {
    containingBlock.content.height = 0.0;

    var rootBox = buildLayoutTree(styledNode);
    rootBox.layout(containingBlock);

    return rootBox;
};

function buildLayoutTree (styledNode) {

    var boxType = (function () {
        switch (styledNode.display().value) {
            case 'block':
                return new BoxType().Block(styledNode);

            case 'inline':
                return new BoxType().Inline(styledNode);

            case 'none':
                throw 'Root node has display: none';
        }
    }());

    var root = new LayoutBox(boxType);

    styledNode.children.forEach(function (child) {
        switch (child.display().value) {
            case 'block':
                root.children.push(buildLayoutTree(child));
                break;

            case 'inline':
                root.getInlineContainer().children.push(buildLayoutTree(child));
                break;

            case 'none':
                break;
        }
    });

    return root;
}


