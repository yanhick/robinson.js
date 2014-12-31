var LayoutBox = require('./layout-box');
var BoxType = require('./box-type');

// Transform a style tree into a layout tree.
module.exports = function (styledNode, containingBlock) {
    // The layout algorithm expects the container height to start at 0.
    containingBlock.content.height = 0.0;

    var rootBox = buildLayoutTree(styledNode);
    rootBox.layout(containingBlock);

    return rootBox;
};

// Build the tree of LayoutBoxes, but don't perform any layout calculations yet.
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

    // Create the root box.
    var root = new LayoutBox(boxType);

    // Create the descendant boxes.
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


