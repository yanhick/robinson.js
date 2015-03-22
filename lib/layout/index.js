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
}


