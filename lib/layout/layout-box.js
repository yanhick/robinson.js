/**
 * Basic CSS block layout
 */

var _ = require('lodash');

var Value = require('../css/value');
var Unit = require('../css/unit');
var Dimensions = require('../layout/dimensions');
var Rect = require('../layout/rect');
var EdgeSize = require('../layout/edge-size');
var BoxType = require('./box-type');

module.exports = LayoutBox;

// A node in the layout tree
function LayoutBox (boxType, dimensions, children) {

    dimensions = dimensions || new Dimensions(
        new Rect(0, 0, 0, 0),
        new EdgeSize(0, 0, 0, 0),
        new EdgeSize(0, 0, 0, 0),
        new EdgeSize(0, 0, 0, 0)
    );

    children = children || [];

    var layoutBox = {
            dimensions: dimensions,
            boxType: boxType,
            children: children
        },

        getStyleNode = function () {
            switch (boxType.type) {
                case 'block':
                    return boxType.value;

                case 'inline':
                    return boxType.value;

                case 'anonymous':
                    throw 'anonymous block box has no style node';
            }
        },

        // Lay out a box and its descendants.
        layout = function (containingBlock) {
            switch (boxType.type) {
                case 'block':
                    layoutBlock(containingBlock);
                    break;

                default:
            }
        },

        // Lay out a block-level element and its descendants.
        layoutBlock = function (containingBlock) {

            // Child width can depend on parent width, so we
            // need to calculate this box's width before
            // laying out its children.
            calculateBlockWidth(containingBlock);

            // Determine where the box is located within its container.
            calculateBlockPosition(containingBlock);

            // Recursively lay out the children of this box.
            layoutBlockChildren();

            // Parent height can depend on child height, so
            // `calculateBlockHeight` must be called after the
            // children are laid out.
            calculateBlockHeight();
        },

        // Calculate the width of a block-level non-replaced element in normal flow.
        //
        // http://www.w3.org/TR/CSS2/visudet.html#blockwidth
        //
        // Sets the horizontal margin/padding/border dimensions, and the `width`.
        calculateBlockWidth = function (containingBlock) {

            var style = getStyleNode();

            // `width` has initial value `auto`.
            var width = style.value('width') || new Value().Keyword('auto');

            // margin, border, and padding have initial value 0.
            var zero = new Value().Length(0.0, new Unit().Px());

            var marginLeft = style.lookup('margin-left', 'margin', zero);
            var marginRight = style.lookup('margin-right', 'margin', zero);

            var borderLeft = style.lookup('border-left-width', 'border-width', zero);
            var borderRight = style.lookup('border-right-width', 'border-width', zero);

            var paddingLeft = style.lookup('padding-left-width', 'padding', zero);
            var paddingRight = style.lookup('padding-right-width', 'padding', zero);

            var total = [marginLeft, marginRight, borderLeft, borderRight,
                         paddingLeft, paddingRight, width].reduce(function (sum, value) {
                             return sum + value.toPx();
                         }, 0);

             // If width is not auto and the total is wider than the container,
             // treat auto margins as 0.
            if (!isAuto(width) && total > containingBlock.content.width) {
                if (isAuto(marginLeft)) {
                    marginLeft = new Value().Length(0.0, new Unit().Px());
                }
                if (isAuto(marginRight)) {
                    marginRight = new Value().Length(0.0, new Unit().Px());
                }
            }

            // Adjust used values so that the above sum equals `containing_block.width`.
            // Each arm of the `match` should increase the total width by exactly `underflow`,
            // and afterward all values should be absolute lengths in px.
            var underflow = containingBlock.content.width - total;

            var widthIsAuto = isAuto(width);
            var marginLeftIsAuto = isAuto(marginLeft);
            var marginRightIsAuto = isAuto(marginRight);

            if (!widthIsAuto && !marginLeftIsAuto && !marginRightIsAuto) {
                // If the values are overconstrained, calculate margin_right.
                marginRight = new Value().Length(marginRight.toPx() + underflow, new Unit().Px());
            }
            // If exactly one size is auto, its used value follows from the equality.
            else if (!widthIsAuto && !marginLeftIsAuto && marginRightIsAuto) {
                marginRight = new Value().Length(underflow, new Unit().Px());
            }
            else if (!widthIsAuto && marginLeftIsAuto && !marginRightIsAuto) {
                marginLeft = new Value().Length(underflow, new Unit().Px());
            }
            // If width is set to auto, any other auto values become 0.
            else if (widthIsAuto) {
                if (marginLeftIsAuto) {
                    marginLeft =  new Value().Length(0.0, new Unit().Px());
                }

                if (marginRightIsAuto) {
                    marginRight =  new Value().Length(0.0, new Unit().Px());
                }

                if (underflow >= 0.0) {
                    // Expand width to fill the underflow.
                    width = new Value().Length(underflow, new Unit().Px());
                }
                else {
                    // Width can't be negative. Adjust the right margin instead.
                    width = new Value().Length(0.0, new Unit().Px());
                    marginRight = new Value().Length(marginRight.toPx() + underflow, new Unit().Px());
                }
            }
            // If margin-left and margin-right are both auto, their used values are equal.
            else if (!widthIsAuto && marginLeftIsAuto && marginRightIsAuto) {
                marginLeft = new Value().Length(underflow / 2.0, new Unit().Px());
                marginRight = new Value().Length(underflow / 2.0, new Unit().Px());
            }

            dimensions.content.width = width.toPx();

            dimensions.padding.left = paddingLeft.toPx();
            dimensions.padding.right = paddingRight.toPx();

            dimensions.border.left = borderLeft.toPx();
            dimensions.border.right = borderRight.toPx();

            dimensions.margin.left = marginLeft.toPx();
            dimensions.margin.right = marginRight.toPx();
        },

        isAuto = function (value) {
            if (value.type !== 'keyword') {
                return false;
            }

            return value.value === 'auto';
        },

        // Finish calculating the block's edge sizes, and position it within its containing block.
        //
        // http://www.w3.org/TR/CSS2/visudet.html#normal-block
        //
        // Sets the vertical margin/padding/border dimensions, and the `x`, `y` values.
        calculateBlockPosition = function (containingBlock) {
            var style = getStyleNode();

            // margin, border, and padding have initial value 0.
            var zero = new Value().Length(0.0, new Unit().Px());

            // If margin-top or margin-bottom is `auto`, the used value is zero.
            dimensions.margin.top = style.lookup('margin-top', 'margin', zero).toPx();
            dimensions.margin.bottom = style.lookup('margin-bottom', 'margin', zero).toPx();

            dimensions.border.top = style.lookup('border-top', 'border-width', zero).toPx();
            dimensions.border.bottom = style.lookup('border-bottom', 'border-width', zero).toPx();

            dimensions.padding.top = style.lookup('padding-top', 'padding', zero).toPx();
            dimensions.padding.bottom = style.lookup('padding-bottom', 'padding', zero).toPx();

            // Position the box below all the previous boxes in the container.
            dimensions.content.x = containingBlock.content.x +
                                   dimensions.margin.left +
                                   dimensions.border.left +
                                   dimensions.padding.left;

            dimensions.content.y = containingBlock.content.y +
                                   containingBlock.content.height +
                                   dimensions.margin.top +
                                   dimensions.border.top +
                                   dimensions.padding.top;

        },

        // Lay out the block's children within its content area.
        //
        // Sets `self.dimensions.height` to the total content height.
        layoutBlockChildren = function () {
            children.forEach(function (child) {
                child.layout(dimensions);
                // Increment the height so each child is laid out below the previous one.
                dimensions.content.height = dimensions.content.height +
                                            child.dimensions.marginBox().height;
            });
        },

        // Height of a block-level non-replaced element in normal flow with overflow visible.
        calculateBlockHeight = function () {
            var styleNode = getStyleNode();
            // If the height is set to an explicit length, use that exact length.
            // Otherwise, just keep the value set by `layout_block_children`.
            var height = styleNode.value('height');

            if (height === null) {
                return;
            }

            if (height.type === 'length') {
                dimensions.content.height = height.toPx();
            }
        },

        // Where a new inline child should go.
        getInlineContainer = function () {
            switch (boxType.type) {
                case 'inline':
                    return layoutBox;

                case 'anonymous':
                    return layoutBox;

                case 'block':
                    // If we've just generated an anonymous block box, keep using it.
                    // Otherwise, create a new one.
                    if (children.length === 0 || _.last(children).boxType.type !== 'anonymous') {
                        children.push(new LayoutBox(new BoxType().Anonymous()));
                    }
                    return _.last(children);
            }
        };

    layoutBox.getStyleNode = getStyleNode;
    layoutBox.calculateBlockHeight = calculateBlockHeight;
    layoutBox.calculateBlockPosition = calculateBlockPosition;
    layoutBox.calculateBlockWidth = calculateBlockWidth;
    layoutBox.layoutBlockChildren = layoutBlockChildren;
    layoutBox.getInlineContainer = getInlineContainer;
    layoutBox.layout = layout;

    return layoutBox;
}
